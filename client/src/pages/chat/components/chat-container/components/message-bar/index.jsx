import { apiClient } from '../../../../../../lib/api-client'
import { useSocket } from '../../../../../../context/SocketContext'
import { useAppStore } from '../../../../../../store'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { IoSearch, IoSend } from 'react-icons/io5'
import { RiEmojiStickerLine } from 'react-icons/ri'
import { UPLOAD_FILE_ROUTE } from '../../../../../../utils/constants'

const MessageBar = () => {
    const emojiRef = useRef()
    const fileInputRef = useRef()
    const {selectedChatType, selectedChatData, userInfo, setIsUploding, setFileUploadProgress} = useAppStore()
    const socket = useSocket()
    const [message, setMessage] = useState("")
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
   
    useEffect(() =>{
        function handleClickOutside(event) {
            if(emojiRef.current && !emojiRef.current.contains(event.target)){
                setEmojiPickerOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [emojiRef])

    const handleAddEmoji = (emoji) => {
        setMessage((message) => message + emoji.emoji)
    }

    const handleSendMessage = async () => {
        if(selectedChatType === "contact" && selectedChatData) {
            await socket.emit("sendMessage", {
                sender: userInfo.id,
                content: message,
                recipient: selectedChatData._id,
                messageType: "text",
                fileUrl: undefined
            })
            setMessage("")
        }
    }

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleAttachmentChange = async (event) => {
        try {
            const file = event.target.files[0]
            if (file) {
                const formData = new FormData()
                
                console.log(file)
                
                formData.append("file", file)
                setIsUploding(true)

                console.log(formData)
                const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {withCredentials:tru, onUploadProgress: (data) => {
                    setFileUploadProgress(Math.round((100 * data.loaded) / data.total))
                }})
        
            if (response.status === 200 && response.data) {
                setIsUploding(false)
                if(selectedChatType){
                await socket.emit("sendMessage", {
                    sender: userInfo.id,
                    content: message,
                    recipient: selectedChatData._id,
                    messageType: "file",
                    fileUrl: response.data.filePath
                })}
            }
        }
        } catch (error) {
            setIsUploding(false)
            console.log(error)
        }
    }

    return (
    <div className='h-[10vh] bg-[#1c1d25] flex items-center justify-center px-10 mb-6 gap-6'>
        <div className="flex flex-1 bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
            <input 
                type="text"
                className=' flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none'
                placeholder='Enter Message'
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button className = " text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={handleClick}  >
                <GrAttachment className=' text-2xl'/>
            </button>
                    <input type="file" className='hidden' ref={fileInputRef} onChange={handleAttachmentChange} />
            <div className="relative">
                <button className = " text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={() =>{ setEmojiPickerOpen(true)}} >
                    <RiEmojiStickerLine className=' text-2xl' />
                </button>
                <div className=' absolute bottom-16 right-0' ref={emojiRef} >
                    <EmojiPicker 
                        theme='dark' 
                        open = {emojiPickerOpen}
                        onEmojiClick={handleAddEmoji}
                        autoFocusSearch={false} />
                </div>
            </div>
        </div>
        <button className = " bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={handleSendMessage} >
            <IoSend className=' text-2xl' />
        </button>
    </div>
    )}

export default MessageBar