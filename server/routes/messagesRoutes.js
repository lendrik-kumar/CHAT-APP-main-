import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware";
import { getMessages } from "../controllers/messagesController";


const messagesRoutes = Router()

messagesRoutes.post("/get-messages", verifyToken, getMessages)

export default messagesRoutes