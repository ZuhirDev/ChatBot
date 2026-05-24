import { supabase } from "#database/service/databaseService.js";
import { getEmbeddingProvider } from "#chat/services/embedding/embeddingFactory.js";
import { callLLM } from "#chat/services/chatService.js";

const CONTEXT_PROMPT = `
    Eres un asistente experto y profesional encargado de responder preguntas basándote EXCLUSIVAMENTE en la información del contexto proporcionado.

    REGLAS ESTRICTAS:
    1. IDIOMA: Responde siempre en español fluido y natural.
    2. PRECISIÓN: Construye tu respuesta usando únicamente los datos del contexto. Bajo ninguna circunstancia inventes información, nombres, enlaces o datos que no estén explícitamente allí.
    3. FUERA DE CONTEXTO: Si la pregunta del usuario no tiene relación con el contexto, o si el contexto no contiene los datos suficientes para una respuesta precisa, aborta y responde EXACTAMENTE con esta frase: "No tengo información suficiente para responder esa consulta." No añadas disculpas ni texto adicional.
    4. ESTILO DIRECTO: Ve directo al grano. Prohibido usar frases introductorias como "Según el contexto proporcionado...", "En el texto dice que...", o "Basado en la información...". Responde con la autoridad de quien conoce la respuesta.
    5. FORMATO: Mantén tus respuestas concisas, claras y fáciles de leer. Usa párrafos cortos.
`;

export const ChatBot = async (req, res) => {

    try {
        const { message } = req.body;

        if (!message || message.trim() === "")
            return res.status(400).json({ error: "El mensaje no puede estar vacío." });

        const embeddingProvider = getEmbeddingProvider();
        const [queryEmbedding] = await embeddingProvider.embed(message);


        const { data, error } = await supabase.rpc('match_documents', {
            query_embedding: queryEmbedding,
            match_threshold: 0.6,
            match_count: 5
        });         

        if (error) {
            console.error("❌ Error en match_documents de Supabase:", error.message);
            return res.status(500).json({ error: 'Error al buscar información relevante.' });
        }
        
        if (!data || data.length === 0)
            return res.json({ reply: "No tengo información suficiente para responder esa consulta." });
        
        const context = data.map(doc => doc.body).join('\n---\n');
        
        const reply = await callLLM(CONTEXT_PROMPT, context, message);

        return res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud.' });
    }

}
