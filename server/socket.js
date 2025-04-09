import { Server } from 'socket.io'
import Message from './models/MessagesModel.js'
import User from './models/userModel.js'

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
        }
    })

    const userSocketMap = new Map()

    const disconnect = (socket) => {
        console.log(`Client disconnected: ${socket.id}`)
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId)
                console.log(`User ${userId} disconnected`)
                break
            }
        }
    }

    const sendMessage = async (socket, message) => {
        console.log("Message Received on Server:", message)

        const senderSocketId = userSocketMap.get(message.sender)
        const recipientSocketId = userSocketMap.get(message.recipient)

        console.log("Sender Socket ID:", senderSocketId)
        console.log("Recipient Socket ID:", recipientSocketId)

        const createdMessage = await Message.create(message)

        const messageData = await Message.findById(createdMessage._id)
            .populate("sender", "id email firstName lastName image color")
            .populate("recipient", "id email firstName lastName image color")

        if (recipientSocketId) {
            io.to(recipientSocketId).emit("receiveMessage", messageData)
        }
        if (senderSocketId) {
            io.to(senderSocketId).emit("receiveMessage", messageData)
        }
    }

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId

        if (userId) {
            userSocketMap.set(userId, socket.id)
            console.log(`Socket connected: ${userId} with ID: ${socket.id}`)
        } else {
            console.log("User ID is not provided")
        }

        socket.on("sendMessage", (message) => sendMessage(socket, message))
        socket.on("disconnect", () => disconnect(socket))
    })
}

export default setupSocket