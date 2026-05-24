import { getLLMProvider } from "./llm/llmFactory.js";

export const callLLM = async (systemPrompt, context, message) => {
  try {
    const provider = getLLMProvider();

    const reply = await provider.chat({
      systemPrompt,
      context,
      message,
    });

    return reply || "Lo siento, no tengo información sobre ese tema en este momento.";
  } catch (error) {
    console.error("❌ Error LLM:", error.message);
    return "Error al conectar con el modelo de IA";
  }
};