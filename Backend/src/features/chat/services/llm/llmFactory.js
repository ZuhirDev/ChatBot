import CONFIG from "#config/config.js";
import { GroqProvider } from "./groqProvider.js";

/**
 * Registro de proveedores LLM disponibles.
 * Para añadir un nuevo proveedor, simplemente agrega una nueva entrada aquí.
 */
const LLM_PROVIDERS = {
  groq: GroqProvider,
};

/** @type {import('./llmProvider.js').LLMProvider | null} */
let cachedProvider = null;

/**
 * Devuelve la instancia del proveedor LLM configurado.
 * La instancia se cachea para reutilizarla entre llamadas.
 * 
 * @returns {import('./llmProvider.js').LLMProvider}
 */
export const getLLMProvider = () => {
  if (cachedProvider) return cachedProvider;

  const providerName = CONFIG.LLM_PROVIDER?.toLowerCase();

  if (!providerName) {
    throw new Error(
      `❌ LLM_PROVIDER no está definido en el .env. Opciones: ${Object.keys(LLM_PROVIDERS).join(", ")}`
    );
  }

  const ProviderClass = LLM_PROVIDERS[providerName];

  if (!ProviderClass) {
    throw new Error(
      `❌ Proveedor LLM "${providerName}" no soportado. Opciones: ${Object.keys(LLM_PROVIDERS).join(", ")}`
    );
  }

  cachedProvider = new ProviderClass();
  console.log(`✅ Proveedor LLM activo: ${cachedProvider.name}`);
  return cachedProvider;
};
