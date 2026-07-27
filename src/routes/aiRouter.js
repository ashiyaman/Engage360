// const { GoogleGenAI } = require("@google/genai")
require("dotenv").config();
const express = require("express");
const aiRouter = express.Router();

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// console.log(process.env.GEMINI_API_KEY);

// // const interaction = await ai.interactions.create({
// //   model: "gemini-3.5-flash",
// //   input: "Explain how AI works in a few words",
// // });
// // console.log(interaction.output_text);

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

aiRouter.post("/ai/summary", async (req, res) => {
  try {
    console.log("we are getting ai summary........", req.body);
    const { lead } = req.body;

    const prompt = `You are an expert CRM assistant.

Analyze the following lead.

Name: ${lead.name}
Source: ${lead.source}
Status: ${lead.status}
Priority: ${lead.priority}
Sales Agent: ${lead.salesAgent?.name || "Not Assigned"}
Tags: ${lead.tags.join(", ")}
Time to Close: ${lead.timeToClose} days

Return ONLY valid JSON in this format:

{
  "summary": "",
  "insights": [],
  "recommendedAction": "",
  "followUpMessage": ""
}
`

    const response = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: "You are an expert CRM assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log(response.choices[0].message.content);

    const text = JSON.parse(response.choices[0].message.content)

    if(!text){
            res.status(404).json({message: 'Unable to get AI summary'})
        }
        res.status(200).json({message: 'AI summary fetched successfully', data: text})
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = { aiRouter };
