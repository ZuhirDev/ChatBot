import { getLLMProvider } from "./llm/llmFactory.js";

export const callLLM = async (systemPrompt, context, message) => {
  try {
    const provider = getLLMProvider();

    const reply = await provider.chat({
      systemPrompt,
      context,
      message,
    });

    return reply || "No tengo información suficiente para responder esa consulta.";
  } catch (error) {
    console.error("❌ Error LLM:", error.message);
    return "Error al conectar con el modelo de IA";
  }
};