import Message from "../models/MessagesModel.js"
import {mkdirSync, renameSync} from 'fs'

export const getMessages = async (req, res) => {
    try {
        const user1 = req.userId
        const user2 = req.body.id

        if(!user1 || !user2){
            return res.status(400).send("search term is required")
        }
        
        const messages = await Message.find({
            $or: [
                {sender : user1, recipient : user2},
                {sender : user2, recipient : user1}
            ]
        }).sort({timestamp : 1})

        return res.status(200).json({messages})

    } catch (error) {
        return res.status(500).send("error")
    }
}

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            console.error("No file uploaded. req.file is undefined.");
            return res.status(400).send("File is required");
        }

        console.log("Uploaded File:", req.file);

        const sanitizedFileName = req.file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
        const filePath = `uploads/files/${sanitizedFileName}`;

        // Move the file to the correct directory
        renameSync(req.file.path, filePath);

        const fileUrl = `${process.env.HOST || "http://localhost:8000"}/${filePath}`;

        return res.status(200).json({ filePath: fileUrl });
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).send("Internal server error while uploading file.");
    }
};