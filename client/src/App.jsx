import { Routes, Route, Navigate } from "react-router-dom";
import Auth from '../src/pages/auth/index.jsx'
import Chat from "./pages/chat/index.jsx";
import Profile from "./pages/profile/index.jsx";
import { useAppStore } from "./store/index.js";
import { useState, useEffect } from "react";
import { apiClient } from "./lib/api-client.js";
import { GET_USER_INFO } from "./utils/constants.js";
import { BlinkBlur } from "react-loading-indicators";

const PrivateRoute = ({ children, loading }) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo

  if (loading) {
    return null
  }

  return isAuthenticated ? children : <Navigate to="/auth" />
}

const AuthRoute = ({ children, loading }) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo

  if (loading) {
    return null
  }

  return isAuthenticated ? <Navigate to="/chat" /> : children
}

const App = () => {
  const { userInfo, setUserInfo } = useAppStore()
  const [loading, setLoading] = useState(true)

  const getUserInfo = async () => {
    try {
      const response = await apiClient.get(GET_USER_INFO, {
        withCredentials: true
      })
      if (response.status === 200 && response.data.user) {
        setUserInfo(response.data.user)
        localStorage.setItem("userInfo", JSON.stringify(response.data.user)) 
      } else {
        setUserInfo(undefined)
        localStorage.removeItem("userInfo")
      }
    } catch (error) {
      setUserInfo(undefined)
      localStorage.removeItem("userInfo") 
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const initializeUserInfo = async () => {
      const storedUserInfo = localStorage.getItem("userInfo")
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo))
        setLoading(false)
      } else {
        await getUserInfo() 
      }
    }

    initializeUserInfo()
  }, [setUserInfo])

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-[#1a1b1f]">
      <BlinkBlur color="#8417FF" size="medium" text="" textColor="" />
    </div>
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthRoute loading={loading}><Auth /></AuthRoute>} />
      <Route path="/chat" element={<PrivateRoute loading={loading}><Chat /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute loading={loading}><Profile /></PrivateRoute>} />
      <Route path="*" element={<Navigate to='/auth' />} />
    </Routes>
  )
}

export default App
