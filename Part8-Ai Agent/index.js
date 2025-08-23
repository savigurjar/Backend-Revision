const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const readlineSync = require("readline-sync");
// Alternatively:
const { GoogleAuth } = require("google-auth-library");

const ai = new GoogleGenAI({ apikey: process.env.API_KEY });
const History = [];

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: History,
  });
  return response.text;
}

async function chatting() {
  async function getWeather(location) {
    const weatherInfo = [];
    for (const { city, date } of location) {
      if (date.toLowerCase() == "today") {
        const apiKey = process.env.WEATHER_API_KEY; // safely load from .env
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );
        const data = await response.json();
        weatherInfo.push(data);
      } else {
        const response = await fetch(
          `http://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${city}&dt=${date}`
        );
        const data = await response.json();
        weatherInfo.push(data);
      }
    }
    return weatherInfo;
  }

  const userQues = readlineSync.question("How can i help you---->  ");
  //   const prompt = `You are an AI agent. Always respond strictly in JSON format only.

  // 🎯 Task:
  // Analyze the user query to extract **movie name** and **release year** for movie-related questions.

  // 📌 Rules:
  // 1. Release year format must be "yyyy" (e.g., 2015).
  // 2. If the query is about the latest movie, set year as "latest".
  // 3. If no movie is mentioned, set movie as an empty string "".
  // 4. If no year is mentioned, assume "latest".
  // 5. Never return anything except valid JSON.

  // ⚡ Response Structures:

  // 👉 If movie details are needed:
  // {
  //   "movie_details_needed": true,
  //   "movies": [
  //     {"title": "<movie_name>", "year": "<year>"}
  //   ]
  // }

  // 👉 Once movie details are available (fetched externally), respond:
  // {
  //   "movie_details_needed": false,
  //   "movie_report": "<casual Hinglish style report, e.g. 'Bhai Inception ek dhamakedar sci-fi movie hai, 2010 me aayi thi, dimag ghooma degi.'>"
  // }

  // ❌ Do not output explanations, text, or code blocks. Only valid JSON.

  // User question: ${userQues}
  // Return the result in JSON only.`;

  const prompt = `You are an AI agent. Always respond strictly in JSON format only.

🎯 Task:
Analyze the user query to extract **city** and **date** for weather-related questions.

📌 Rules:
1. Date format must be "yyyy-mm-dd" for specific dates (future or past).
2. If the query is about today's weather, set date as "today".
3. If no city is mentioned, set city as an empty string "".
4. If no date is mentioned, assume "today".
5. Never return anything except valid JSON.

⚡ Response Structures:

👉 If weather details are needed:
{
  "weather_details_needed": true,
  "location": [
    {"city": "<city_name>", "date": "<date>"}
  ]
}

👉 Once weather details are available (fetched externally), respond:
{
  "weather_details_needed": false,
  "weather_report": "<casual Hinglish weather report, e.g. 'Bhai delhi ka mousam bdhiya h, 18 degree hai, ghr pe pakode bna lo.'>"
}

❌ Do not output explanations, text, or code blocks. Only valid JSON.

📖 Examples:

User: "Aaj Mumbai ka weather kaisa hai?"
Output:
{
  "weather_details_needed": true,
  "location": [{"city": "mumbai", "date": "today"}]
}

User: "Kal Delhi ka mousam?"
Output:
{
  "weather_details_needed": true,
  "location": [{"city": "delhi", "date": "2025-08-21"}]
}

User: "Weather?"
Output:
{
  "weather_details_needed": true,
  "location": [{"city": "", "date": "today"}]
}

User question: ${userQues}
Return the result in JSON only.`;

  History.push({
    role: "user",
    parts: [{ text: prompt }],
  });

  while (true) {
    let response = await main();
    History.push({
      role: "model",
      parts: [{ text: response }],
    });
    response = response.trim();
    response = response.replace(/^```json\s*|```$/g, "").trim();
    const data = await JSON.parse(response);

    if (data.weather_details_needed == false) {
      console.log(data.weather_report);
      break;
    }

    const weatherInformation = await getWeather(data.location);

    const weatherIn = JSON.stringify(weatherInformation);

    History.push({
      role: "user",
      parts: [{ text: `this is weather report : ${weatherIn}` }],
    });
  }
}
chatting();
