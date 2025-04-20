import { Contact } from "lucide-react"

export const createChatSlice = (set, get) => ({
    selectedChatType : undefined,
    selectedChatType : undefined,
    selectedChatMessages : [],
    directMessagesContacts :  [],
    isUploading:false,
    isDownloading: false,
    fileUploadProgress:0 ,
    fileDownloadProgress:0,
    channels :[],
    setChannels : (channels) => set({ channels }), 
    setIsuploading:(isUploading) => set({isUploading}),
    setIsDownloading:(isDownloading) => set({isDownloading}),
    setFileUploadProgress:(fileUploadProgress) => set({fileUploadProgress}),
    setFileDownloadProgress:(fileDownloadProgress) => set({fileDownloadProgress}),
    setSelectedChatType : (selectedChatType) => set({ selectedChatType }),
    selectedChatMessages :[],
    setSelectedChatData : (selectedChatData) => set({ selectedChatData }),
    setDirectMessagesContacts : (directMessagesContacts) => set({directMessagesContacts}),
    addChannel : (channel) => {
        const channels = get().channels
        set({ channels : [channel, ...channels]})
    },
    closeChat : () => set({
        selectedChatData:undefined,
        selectedChatMessages:[],
        selectedChatType:undefined
    }),
    addMessage:(message) => {
        const selectedChatMessages = get().selectedChatMessages
        const selectedChatType = get().selectedChatType

        set({
            selectedChatMessages : [
                ...selectedChatMessages,
                {
                    ...message,
                    recipient : 
                        selectedChatType === "channel"
                        ? message.recipient
                        : message.recipient._id,
                    sender : 
                        selectedChatType === "channel"
                        ? message.recipient
                        : message.recipient._id,
                }
            ]
        })
    },
    addChannelInChannelList : (message) => {
        const channels = get().channels
        const data = channels.find((channel) => channel._id === message.channelId)
        const index = channels.findIndex(
            (channel) => channel._id === message.channelId
        )
        if(index !== -1 && index !== undefined){
            channels.splice(index, 1)
            channels.unshift(data)
        }
    },
    addContactsInContctList : (message) => {
        const userId = get().userInfo.id
        const formId = 
            message.sender._id === userId
            ? message.recipient._id
            : message.sender._id
        const formData = 
            message.sender._id === userId ? message.recipient : message.sender
        const dmContacts = get().directMessagesContacts
        const data = dmContacts.find((contact) => contact._id === formId)
        const index = dmContacts.findIndex(
            (contact) => contact._id === message.channelId
        )
        if(index !== -1 && index !== undefined){
            dmContacts.splice(index, 1)
            dmContacts.unshift(data)
        } else{
            dmContacts.unshift(formData)
        }
        set({ directMessagesContacts: dmContacts })
    }
})