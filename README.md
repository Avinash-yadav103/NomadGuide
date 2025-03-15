# NomadGuide - Travel Itinerary Planner with Gemini AI

NomadGuide is a travel itinerary planner that uses Google's Gemini AI to generate personalized travel plans based on your preferences, budget, and destinations.

## Features

- Create detailed travel itineraries for any destination
- Specify exact or flexible travel dates
- Set budget preferences and priorities
- Get AI-generated day-by-day plans with activities and costs
- View budget breakdowns and travel recommendations
- Mobile-responsive design with dark mode support
- Print-friendly itinerary view

## Tech Stack

- **Frontend**: React + Vite with TailwindCSS
- **Backend**: Node.js + Express
- **AI**: Google Gemini 1.5 Flash

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the example:
   ```
   # Add your actual Gemini API key
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Server port
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd vite-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Click on "Plan Your Trip" to open the planner modal
2. Follow the 5-step process to create your itinerary:
   - Enter trip name
   - Add destinations
   - Select travel dates
   - Enter traveler information
   - Set budget and priorities
3. Click "Generate Itinerary" to create your travel plan
4. View your personalized itinerary with daily plans, budget breakdown, and recommendations
5. Print or share your itinerary

## Additional Resources

- [Google Gemini AI Platform](https://ai.google.dev/gemini-api)
- [Getting a Gemini API Key](https://ai.google.dev/gemini-api/docs/api-key)

## License

MIT 