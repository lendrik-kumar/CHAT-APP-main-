import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppStore } from '../../store/index.js'

const Chat = () => {
  const { userInfo } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      toast("Setup profile first")
      navigate("/profile")
    }
  }, [userInfo, navigate])

  
  return (
    <div>Chat</div>
  )
}

export default Chat
