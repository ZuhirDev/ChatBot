import { getEmbeddings, supabase } from "#database/service/databaseService.js";
import { callLLM } from "#chat/services/chatService.js";

const CONTEXT_PROMPT = `
    Eres un asistente útil que responde siempre en español.
    Responde únicamente con la información proporcionada en la pregunta y en el contexto.
    La pregunta siempre tiene que estar relacion con el contexto.
    No inventes ni añadas información que no esté en el contexto.
    Si no tienes información en el contexto para responder, responde solo con el mensaje: Lo siento, no tengo información sobre ese tema en este momento.
    No respondas preguntas fuera del contexto, ni hables sobre temas no relacionados.
    Mantén las respuestas breves, claras y profesionales.
`;

export const ChatBot = async (req, res) => {

    const { message } = req.body;
    const [queryEmbedding] = await getEmbeddings(message);

    try {
        const { data, error } = await supabase.rpc('match_documents', {
            query_embedding: queryEmbedding,
            match_threshold: 0.6,
            match_count: 5
        });         

        if(error) return res.status(500).json({ error: 'Chatbot error: ', error });

        const context = data.map(doc => doc.body).join('\n---\n');

        if (!data || data.length === 0) return res.json({ reply: "Lo siento, no tengo información sobre ese tema en este momento." });
        
        const reply = await callLLM(CONTEXT_PROMPT, context, message);

        return res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Error al contactar al modelo' });
    }

}

