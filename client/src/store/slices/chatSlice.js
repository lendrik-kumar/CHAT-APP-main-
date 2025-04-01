export const createChatSlice = (set, get) => ({
    selectedChatType : undefined,
    selectedChatData : undefined,
    selectedChatMessages : [],
    setSelectedChatType : (selectedChatType) => set({ selectedChatType }),
    selectedChatMessages :[],
    setSelectedChatData : (selectedChatData) => set({ selectedChatData }),
    closeChat : () => set({
        selectedChatData:undefined,
        selectedChatMessages:[],
        selectedChatType:undefined
    })
})