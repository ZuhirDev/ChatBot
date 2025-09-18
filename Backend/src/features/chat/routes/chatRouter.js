import express from 'express';
import { auth } from '#auth/middleware/authMiddleware.js';
import { upload } from '#upload/service/uploadService.js';
import { embedding } from '#upload/controller/embedding.js';
import { ChatBot } from '#chat/controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.post('/upload', auth, upload.array('files'), embedding);
chatRouter.post('/', ChatBot);

export default chatRouter;