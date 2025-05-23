import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from "fs";
import contactsRoutes from './routes/contactRoutes.js'
import setupSocket from './socket.js'
import http from 'http'
import messagesRoutes from './routes/messagesRoutes.js'
import { channel } from 'diagnostics_channel'
import channelRoutes from './routes/channelRoutes.js'


dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const dataBaseUri = process.env.MONGO_URI
const server = http.createServer(app)

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadDir = path.join(__dirname, "uploads/profiles/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads/profiles", express.static(path.join(__dirname, "uploads/profiles")))
app.use("/uploads/files", express.static("uploads/files"))

app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactsRoutes)
app.use('/api/messages', messagesRoutes)
app.use('/api/channel', channelRoutes)

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

await mongoose
    .connect(dataBaseUri)
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.log(err))

setupSocket(server)