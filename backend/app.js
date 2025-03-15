const https = require('https');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace with your Gemini AI API key
const apiKey = process.env.API_KEY;
const API_KEY = apiKey;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//File Reading
const fs = require('fs');

// Read JSON file asynchronously
fs.readFile('./cve.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  
  try {
    const data = JSON.parse(jsonString);
    // console.log(data);
  } catch (err) {
    console.log('Error parsing JSON:', err);
  }
});

const raw_json = require('./cve.json');
const data = JSON.stringify(raw_json).slice(0, 1000);

const prompt = `${data} is a stringified JSON object containing list of vulnerabilites. Articulate each vulnerability based on their product and output articles for each `;


const generateContent = async (prompt) => {
    const result = await model.generateContent(prompt);
    return result.response.text();
}
generateContent(prompt).then(console.log);