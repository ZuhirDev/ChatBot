import { contentFile, splitText } from "#upload/service/uploadService.js";
import { callLLM } from "#chat/services/chatService.js";
import { insertDocument } from "#database/service/databaseService.js";

export const embedding = async (req, res) => {
    try {
        const contents = await contentFile(req.files);
    
        for(const content of contents){
            if (!content || content.trim() === '') continue;
        
            let chunks = content.length > 400 ? await splitText(content) : [content];

            const prompt = `
                Eres un experto en generar títulos breves, claros y precisos.
                Por favor, genera un título de máximo 15 caracteres que resuma el siguiente texto. 
            `;
            
            for(const chunk of chunks){
                const title = await callLLM(prompt, chunk, "Haz un titulo para el contenido recibido");
                await insertDocument(chunk, title);
            }
        }
        
        return res.status(200).json({ message: "Documentos insertados" });       
    } catch (error) {
        console.error("❌ Error en el controlador de embeddings:", error);
        return res.status(500).json({ error: "Error procesando los documentos" });
    }
}