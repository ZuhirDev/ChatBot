import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import multer from "multer";
import RemoveMarkdown from "remove-markdown";
import path from 'path';
import fs from 'fs/promises';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
    separators: ["\n\n", "\n", " ", "", "."],
});

export const splitText = async (text) => {
    return await splitter.splitText(text);
}

export const contentFile = async (files) => {

    const allContent = [];

    for (const file of files){

        const ext = path.extname(file.originalname).toLowerCase();

        if(ext === '.pdf'){
            allContent.push(await extractTextFromPdf(file.path));
        }else if(['.md', '.txt', '.html'].includes(ext)){
            allContent.push(await extractFromFiles(file.path, ext));
        }else{
            allContent.push('');
        }
    }

    return allContent;
}

export const extractTextFromPdf = async (filePath) => {
  try {
    const data = new Uint8Array(await fs.readFile(filePath));
    const loadingTask = getDocument({ data });
    const pdf = await loadingTask.promise;
    let texto = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      texto += pageText + '\n';
    }

    return texto;
  } catch (error) {
    console.error('Error leyendo PDF:', error);
    throw error;
  }
}

export const extractFromFiles = async (filePath) => {
    try {
        const ext = path.extname(filePath).toLowerCase();
        const content = await fs.readFile(filePath, 'utf-8');

        if(ext === '.md') {
            return RemoveMarkdown(content).trim();
        }

        return content;
    } catch (error) {
        console.log("Error", error);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/documents');
    },
    filename: (req, file, cb) => {
        const name = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname);
        const safeName = name.replace(/[^a-z0-9_\-]/gi, '_');
        cb(null, `${safeName}_${Date.now()}${ext}`);
    }
});

export const upload = multer({ storage });