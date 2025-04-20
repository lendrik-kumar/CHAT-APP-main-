import { Router } from "express"
import verifyToken from "../middlewares/authMiddleware.js"
import { createChannel, getChannelMessages, getUserChannels } from '../controllers/channelController.js'

const channelRoutes = Router()

channelRoutes.post('/create-channel', verifyToken, createChannel)
channelRoutes.get('/get-user-channels', verifyToken, getUserChannels)
channelRoutes.get('/get-channel-message', verifyToken, getChannelMessages)

export default channelRoutes