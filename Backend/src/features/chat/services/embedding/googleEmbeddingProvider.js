import { GoogleGenAI } from "@google/genai";
import CONFIG from "#config/config.js";
import { EmbeddingProvider } from "./embeddingProvider.js";

export class GoogleEmbeddingProvider extends EmbeddingProvider {

  constructor() {
    super("google");

    if (!CONFIG.GOOGLE.API_KEY) {
      throw new Error("❌ GOOGLE_API_KEY no está definida en el .env");
    }

    // Usa la clave desde la configuración (no hardcodear)
    const apiKey = CONFIG.GOOGLE.API_KEY;
    this.client = new GoogleGenAI({ apiKey });

    // Permitir configurar el modelo desde .env o config, con fallback
    this.model = CONFIG.GOOGLE.EMBEDDING_MODEL;
  }

  async embed(inputText) {

    if (!inputText || (Array.isArray(inputText) && inputText.length === 0)) {
      throw new Error("❌ El texto de entrada no puede estar vacío");
    }

    const inputs = Array.isArray(inputText)
      ? inputText
      : [inputText];

    try {
      const response = await this.client.models.embedContent({
        model: this.model,
        contents: inputs.length === 1 ? inputs[0] : inputs,
        config: {
          outputDimensionality: 1536,
        }
      });

      // Normalizar distintos formatos de respuesta que puede devolver la SDK/API
      const parseEmbeddings = (res) => {
        if (!res) return null;

        // Caso: { embeddings: [...] }
        if (Array.isArray(res.embeddings)) {
          return res.embeddings.map(item => {
            if (Array.isArray(item)) return item;
            return item.embedding ?? item.values ?? item.vector ?? null;
          }).filter(Boolean);
        }

        // Caso: { data: [...] } (forma similar a otras APIs)
        if (Array.isArray(res.data)) {
          return res.data.map(d => d.embedding ?? d.values ?? null).filter(Boolean);
        }

        // Si la SDK devuelve directamente un array
        if (Array.isArray(res)) {
          return res.map(item => {
            if (Array.isArray(item)) return item;
            return item.embedding ?? item.values ?? null;
          }).filter(Boolean);
        }

        return null;
      };

      const embeddings = parseEmbeddings(response);
      if (!embeddings || embeddings.length === 0) {
        throw new Error("Formato inesperado de embeddings");
      }

      return embeddings;

    } catch (error) {
      console.error("❌ Error generando embeddings:", error?.message ?? error);
      throw error;
    }
  }
}
