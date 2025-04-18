import { Router } from "express"
import verifyToken from "../middlewares/authMiddleware.js"
import { createChannel } from '../controllers/channelController.js'

const channelRoutes = Router()

channelRoutes.post('/create-channel', verifyToken, createChannel)

export default channelRoutes