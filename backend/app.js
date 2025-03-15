const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Gemini AI
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Generate travel itinerary using Gemini AI
async function generateTravelItinerary(tripData) {
  try {
    // Format trip data for prompt
    const destinations = tripData.destinations.map(d => d.value).filter(Boolean).join(', ');
    const dateInfo = tripData.dateType === 'exact' 
      ? `from ${tripData.startDate} to ${tripData.endDate}` 
      : `for approximately ${tripData.duration} days`;
    const travelers = tripData.isSolo 
      ? 'a solo traveler' 
      : `${tripData.adults} adults and ${tripData.children} children`;
    const budget = `${tripData.currency} ${tripData.budget} (${tripData.budgetCategory} category)`;
    const priorities = Object.keys(tripData.priorities)
      .filter(key => tripData.priorities[key])
      .join(', ');

    // Create prompt for Gemini
    const prompt = `
      Create a detailed travel itinerary for a trip to ${destinations} ${dateInfo}.
      
      Trip name: ${tripData.tripName}
      Travelers: ${travelers}
      Budget: ${budget}
      Priorities: ${priorities || 'No specific priorities'}
      
      Generate a comprehensive day-by-day itinerary with the following information:
      1. A summary of the trip
      2. Detailed daily plans for each day, including:
         - Morning, afternoon, and evening activities with approximate times
         - Recommended accommodations for each night
         - Transportation options between locations
         - Estimated costs for activities, accommodations, and transportation
      3. Budget breakdown across categories (accommodation, food, activities, transportation)
      4. Travel recommendations and money-saving tips
      
      Format the response as a structured JSON object following EXACTLY this schema without any additional text before or after the JSON:
      {
        "summary": "Brief description of the trip",
        "dailyPlans": [
          {
            "day": 1,
            "activities": [
              {"time": "09:00", "activity": "Description", "cost": "$X"}
            ],
            "accommodation": {"name": "Hotel name", "cost": "$X"},
            "transportation": {"type": "Transportation type", "cost": "$X"},
            "totalDailyCost": "$X"
          }
        ],
        "budgetBreakdown": {
          "accommodation": 0,
          "food": 0,
          "activities": 0,
          "transportation": 0
        },
        "recommendations": [
          "Recommendation 1"
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    console.log('Raw AI response:', responseText);
    
    // More robust JSON extraction
    try {
      // First attempt: Try to parse the entire response as JSON
      return JSON.parse(responseText);
    } catch (err) {
      console.log('Direct JSON parsing failed, trying to extract JSON from text');
      
      // Second attempt: Extract JSON using regex pattern matching
      const jsonRegex = /{[\s\S]*}/g;
      const jsonMatch = responseText.match(jsonRegex);
      
      if (jsonMatch && jsonMatch[0]) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (innerErr) {
          console.log('Regex JSON extraction failed, trying manual extraction');
          
          // Third attempt: Manual extraction between first { and last }
          const jsonStart = responseText.indexOf('{');
          const jsonEnd = responseText.lastIndexOf('}') + 1;
          
          if (jsonStart >= 0 && jsonEnd > jsonStart) {
            const jsonString = responseText.substring(jsonStart, jsonEnd);
            
            // Attempt to fix common JSON formatting issues
            const cleanedJson = jsonString
              .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
              .replace(/\]\s*,\s*"/g, '],"') // Fix array closing brackets followed by commas
              .replace(/"\s*,\s*}/g, '"}') // Fix trailing commas in objects
              .replace(/"\s*:\s*'/g, '":"') // Replace single quotes with double quotes for keys
              .replace(/'\s*:/g, '":') // Replace single quotes with double quotes for keys
              .replace(/:\s*'([^']*)'/g, ':"$1"'); // Replace single quotes with double quotes for values
              
            return JSON.parse(cleanedJson);
          }
        }
      }
      
      // If all attempts fail, throw a more descriptive error
      throw new Error('Could not extract valid JSON from AI response: ' + err.message);
    }
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate itinerary');
  }
}

// API endpoint to generate itinerary
app.post('/api/generateItinerary', async (req, res) => {
  try {
    const tripData = req.body;
    console.log('Received trip data:', tripData);
    
    // Validate required fields
    if (!tripData.tripName || !tripData.destinations || tripData.destinations.length === 0) {
      return res.status(400).json({ error: 'Missing required trip information' });
    }

    // Generate itinerary using Gemini AI
    const generatedItinerary = await generateTravelItinerary(tripData);
    
    // Create response object
    const itineraryData = {
      id: 'trip-' + Date.now(),
      name: tripData.tripName,
      destinations: tripData.destinations.map(d => d.value).filter(Boolean),
      dates: {
        start: tripData.startDate || 'Flexible',
        end: tripData.endDate || 'Flexible',
        duration: tripData.duration
      },
      travelers: tripData.isSolo ? 'Solo' : `${tripData.adults} adults, ${tripData.children} children`,
      budget: {
        amount: tripData.budget,
        currency: tripData.currency,
        category: tripData.budgetCategory
      },
      priorities: Object.keys(tripData.priorities).filter(key => tripData.priorities[key]),
      generatedItinerary: generatedItinerary
    };
    
    res.json(itineraryData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});