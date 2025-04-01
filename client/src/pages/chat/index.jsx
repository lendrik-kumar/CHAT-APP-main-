import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppStore } from '../../store/index.js'
import ContactsContainer from './components/contacts-container/index.jsx'
import ChatContainer from './components/chat-container/index.jsx'
import EmptyChatContainer from './components/empty-chat-container/index.jsx'

const Chat = () => {
  const { userInfo, selectedChatType } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      toast("Setup profile first")
      navigate("/profile")
    }
  }, [userInfo, navigate])

  
  return (
    <div className=' flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />
      {
        selectedChatType === undefined ? 
          (<EmptyChatContainer />
        ) : ( 
          <ChatContainer/>
          )
      }
    </div>
  )

}

export default Chat
