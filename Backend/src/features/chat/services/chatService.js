import axios from "axios";

export const callLLM = async (context_promt, context, message) => {
    try {
        const response = await axios.post('http://localhost:12434/engines/llama.cpp/v1/chat/completions', {
            model: "ai/llama3.2:latest",
            messages: [
                { role: "system", content:  `${context_promt}` },
                { role: "user", content: `Contexto: ${context}\n\nPregunta: ${message}` },
            ]
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        return response.data?.choices?.[0]?.message?.content || "Sin respuesta.";
        
    } catch (error) {
        console.log("Error", error)
        return { error: 'Error al conectar con el modelo' };
    }
}