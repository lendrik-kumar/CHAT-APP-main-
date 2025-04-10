export const createChatSlice = (set, get) => ({
    selectedChatType : undefined,
    selectedChatData : undefined,
    selectedChatMessages : [],
    directMessagesContacts :  [],
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