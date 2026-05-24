import Groq from "groq-sdk";
import CONFIG from "#config/config.js";
import { LLMProvider } from "./llmProvider.js";

export class GroqProvider extends LLMProvider {

  constructor() {
    super("groq");

    if (!CONFIG.GROQ.API_KEY) {
      throw new Error("❌ GROQ_API_KEY no está definida en el .env");
    }

    this.client = new Groq({ apiKey: CONFIG.GROQ.API_KEY });
    this.model = CONFIG.GROQ.MODEL;
  }

  async chat({ systemPrompt, context, message }) {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Contexto:\n${context}\n\nPregunta:\n${message}`,
        },
      ],
      temperature: 0.6,
      max_completion_tokens: 4096,
    });

    return completion.choices[0]?.message?.content;
  }
}
