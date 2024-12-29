import {
     GoogleGenerativeAI,
     HarmCategory,
     HarmBlockThreshold,
   } from "@google/generative-ai";
   
   const apiKey = "AIzaSyCAGhD1qT61pVHgONFjhwIdTg0zQq16dlk";
   const genAI = new GoogleGenerativeAI(apiKey);
   
   const model = genAI.getGenerativeModel({
     model: "gemini-2.0-flash-exp",
   });
   
   const generationConfig = {
     temperature: 1,
     topP: 0.95,
     topK: 40,
     maxOutputTokens: 8192,
     responseMimeType: "text/plain",
   };
   
   export async function run (prompt) {
     const chatSession = model.startChat({
       generationConfig,
       history: [
       ],
     });
     try {
          const result = await chatSession.sendMessage(prompt);
          console.log(result.response.text());
          return result.response.text();
     } catch (error) {
          console.error("Error in AI Response : ",error);
          throw error;
     }
   
   }
   
