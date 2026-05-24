import { contentFile, splitText } from "#upload/service/uploadService.js";
import { callLLM } from "#chat/services/chatService.js";
import { insertDocument } from "#database/service/databaseService.js";

export const embedding = async (req, res) => {
    try {
        const contents = await contentFile(req.files);
    
        for(const content of contents){
            if (!content || content.trim() === '') continue;
        
            let chunks = content.length > 400 ? await splitText(content) : [content];
            const microContext = content.substring(0, 400);

            const prompt = `
                Eres un experto en clasificación y síntesis de documentos.
                Tu objetivo es leer un fragmento de texto y generar un título que describa su contenido.

                REGLAS ESTRICTAS:
                1. LONGITUD: El título debe ser extremadamente breve, máximo de 2 a 4 palabras (ej: "Manual de Usuario", "Recibo de Luz", "Contrato Laboral").
                2. FORMATO PURO: Devuelve ÚNICA Y EXCLUSIVAMENTE el título generado. Prohibido usar comillas, puntos finales, introducciones como "El título es..." o cualquier otra explicación.
                3. CONTINGENCIA: Si el texto está vacío, es código incomprensible o no logras deducir de qué trata, devuelve exactamente la palabra: "Documento General".
            `;

            const title = await callLLM(prompt, microContext, "Haz un titulo para el contenido recibido");

            await insertDocument(chunks, title);
        }
        
        return res.status(200).json({ message: "Documentos insertados" });       
    } catch (error) {
        console.error("❌ Error en el controlador de embeddings:", error);
        return res.status(500).json({ error: "Error procesando los documentos" });
    }
}