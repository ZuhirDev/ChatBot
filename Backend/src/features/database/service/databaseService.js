import CONFIG from "#config/config.js";
import { createClient } from "@supabase/supabase-js";
import { getEmbeddingProvider } from "#chat/services/embedding/embeddingFactory.js";

export const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

export const insertDocument = async (message, title) => {
  try {    
    const embeddingProvider = getEmbeddingProvider();
    
    const [embeddings] = await embeddingProvider.embed(message);

    const { data , error} = await supabase
      .from('documents')
      .insert([
        {
          title: title,
          body: message,
          embedding: embeddings,
        },
      ]).select();
      
    if (error) {
      console.error("❌ Error al insertar el lote en Supabase:", error.message);
      throw error;
    }
  } catch (err) {
    console.error("❌ Error en el proceso de inserción:", err.message);
  }
};