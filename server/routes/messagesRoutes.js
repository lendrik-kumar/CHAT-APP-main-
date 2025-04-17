import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import { getMessages, uploadFile } from "../controllers/messagesController.js";
import upload from "../middlewares/multer_middleware.js";

const messagesRoutes = Router();

messagesRoutes.post("/get-messages", verifyToken, getMessages);
messagesRoutes.post("/upload-file", verifyToken, upload.single("file"), uploadFile);

export default messagesRoutes;