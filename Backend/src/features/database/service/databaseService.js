import CONFIG from "#config/config.js";
import { createClient } from "@supabase/supabase-js";
import { getEmbeddingProvider } from "#chat/services/embedding/embeddingFactory.js";

export const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

export const insertDocument = async (chunks, title) => {
  try {
    if (!chunks || chunks.length === 0) return;

    const embeddingProvider = getEmbeddingProvider();
    
    const embeddings = await embeddingProvider.embed(chunks);

    const recordsToInsert = chunks.map((chunk, index) => ({
      title: title,
      body: chunk,
      embedding: embeddings[index],
    }));

    const { data , error} = await supabase
      .from('documents')
      .insert(recordsToInsert)
      .select();
      
    if (error) {
      console.error("❌ Error al insertar el lote en Supabase:", error.message);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("❌ Error en el proceso de inserción:", err.message);
  }
};