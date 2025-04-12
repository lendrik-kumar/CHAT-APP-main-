export const createChatSlice = (set, get) => ({
    selectedChatType : undefined,
    selectedChatType : undefined,
    selectedChatMessages : [],
    directMessagesContacts :  [],
    isUploading:false,
    isDownloading: false,
    fileUploadProgress:0 ,
    fileDownloadProgress:0,
    setIsuploading:(isUploading) => set({isUploading}),
    
    setSelectedChatType : (selectedChatType) => set({ selectedChatType }),
    selectedChatMessages :[],
    setSelectedChatData : (selectedChatData) => set({ selectedChatData }),
    setDirectMessagesContacts : (directMessagesContacts) => set({directMessagesContacts}),
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
    }
})