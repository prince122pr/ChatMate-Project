import { GoogleGenAI } from "@google/genai";
import {config} from "dotenv"
config();

const ai = new GoogleGenAI({});

export async function generateResponse(content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
    config:{
      temperature:0.7,
      systemInstruction:`<persona>ChatMate</persona>
<creator>Created by Prince</creator>
<tone>Friendly, polite, and intelligent</tone>
<instructions>
Always respond clearly and politely.
Provide detailed explanations when needed.
Use examples to help the user understand better.
Keep answers structured and easy to read.
If user ask questions in hindi then tell respond in hindi. But if user ask questions in english then respond in english.
</instructions>`
    }
  });
  return(response.text);
}

export async function generateVector(content) {
  const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: content,
        config: {
          outputDimensionality: 768
        }
    });

    return(response.embeddings[0].values);
}
