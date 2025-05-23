import { HOST } from "../utils/constants.js"
import { useAppStore } from "../store/index.js"
import { createContext, useContext, useEffect, useRef } from "react"
import { io } from "socket.io-client"

const SocketContext = createContext(null) 

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {
    const socket = useRef()
    const { userInfo } = useAppStore()

    useEffect (() => {
        if(userInfo) {
            socket.current = io(HOST,{
                withCredentials: true,
                query : { userId : userInfo.id } 
            })
            socket.current.on("connect", () => {
                console.log("connected to socket server")
            })

            const handleRecieveMessage = (message) => {
                const {selectedChatData, selectedChatType, addMessage, addContactsInContctList} = useAppStore.getState()

                if(selectedChatType !== undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)) {
                    console.log(message)
                    addMessage(message)
                }
                addContactsInContctList(message)
            }

            const handleRecieveChannelMessage = async (message) => {
                const { selectedChatData, selectedChatType, addMessage, addChannelInChannelList } = useAppStore.getState()

                if(selectedChatType !== undefined && selectedChatData._id === message.channelId) {
                    addMessage(message)
                }
                addChannelInChannelList(message)
            } 

            socket.current.on("receiveMessage", handleRecieveMessage)
            socket.current.on("recieve-channel-messages", handleRecieveChannelMessage)

            return () => {
                socket.current.disconnect()
            }
        }
    }, [userInfo])

    return (
        <SocketContext.Provider value={socket.current ?? null} >
            {children}
        </SocketContext.Provider>
    )
}