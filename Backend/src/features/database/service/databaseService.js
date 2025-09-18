import CONFIG from "#config/config.js";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

export const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

export const getEmbeddings = async (inputText) => {
  if (!inputText || (Array.isArray(inputText) && inputText.length === 0)) {
    throw new Error('Input text no puede estar vacío');
  }

  const body = {
    input: Array.isArray(inputText) ? inputText : [inputText],
    model: 'ai/mxbai-embed-large',
  };

  const response = await axios.post('http://localhost:12434/engines/llama.cpp/v1/embeddings', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.data.map((item) => item.embedding);
}


export const insertDocument = async (message, title) => {
  try {
    const [embedding] = await getEmbeddings(message);

    const { data , error} = await supabase
      .from('document')
      .insert([
        {
          title: title,
          body: message,
          embedding: embedding,
        },
      ]).select();
      
    if (error) {
      console.error("❌ Error al insertar en Supabase:", error.message);
    } 
    
  } catch (err) {
    console.error("❌ Error en el proceso:", err.message);
    return res.status(500).json({ error: 'Error insertando documentos' });
  }
};