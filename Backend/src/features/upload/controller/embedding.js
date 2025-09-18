import { contentFile, splitText } from "#upload/service/uploadService.js";
import { callLLM } from "#chat/services/chatService.js";
import { insertDocument } from "#database/service/databaseService.js";

export const embedding = async (req, res) => {

    const contents = await contentFile(req.files);

    for(const content of contents){
        let chunks = [];
    
        if(content.length > 400){
            chunks = await splitText(content);
        }else{
            chunks = [content]
        }
            
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
}