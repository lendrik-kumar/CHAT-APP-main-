import mongoose from "mongoose"
import User from "./userModel.js"

const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true
    },
    recipient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : false
    },
    messageType : {
        type : String,
        required : function () {
            return this.messageType === "text"
        }
    },
    content : {
        type : String,
        required : function () {
            return this.messageType === "file"   
        }
    },
    fileUrl : {
        type : String,
        required : function () {
            return this.messageType === "file"
        }
    },
    timeStamp : {
        type : Date,
        default : Date.now
    }
})

const Message = mongoose.model("Messages", messageSchema)

export default Message