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
    }
})