import CONFIG from "#config/config.js";
import { GoogleEmbeddingProvider } from "./googleEmbeddingProvider.js";

/**
 * Registro de proveedores de embedding disponibles.
 * Para añadir un nuevo proveedor, simplemente agrega una nueva entrada aquí.
 */
const EMBEDDING_PROVIDERS = {
  google: GoogleEmbeddingProvider,
};

/** @type {import('./embeddingProvider.js').EmbeddingProvider | null} */
let cachedProvider = null;

/**
 * Devuelve la instancia del proveedor de embedding configurado.
 * La instancia se cachea para reutilizarla entre llamadas.
 * 
 * @returns {import('./embeddingProvider.js').EmbeddingProvider}
 */
export const getEmbeddingProvider = () => {
  if (cachedProvider) return cachedProvider;

  const providerName = CONFIG.EMBEDDING_PROVIDER?.toLowerCase();

  const ProviderClass = EMBEDDING_PROVIDERS[providerName];

  if (!ProviderClass) {
    throw new Error(
      `❌ Proveedor de embedding "${providerName}" no soportado. Opciones: ${Object.keys(EMBEDDING_PROVIDERS).join(", ")}`
    );
  }

  cachedProvider = new ProviderClass();
  console.log(`✅ Proveedor de embedding activo: ${cachedProvider.name}`);
  return cachedProvider;
};
