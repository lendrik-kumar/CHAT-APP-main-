import React, { useState } from 'react'
import Victory from '../../assets/victory.svg'
import { TabsList, TabsTrigger, TabsContent, Tabs } from '../../components/ui/tabs'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { SIGNUP_ROUTE, LOGIN_ROUTE } from '../../utils/constants.js'
import { apiClient } from '../../lib/api-client.js'
import Background from '../../assets/login2.png'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/index.js'
import { FaGithub } from "react-icons/fa";

const Auth = () => {
    const navigate = useNavigate()
    const { setUserInfo } = useAppStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const validateLogin = () => {
        if (!email.length) {
            toast.error('Email is required')
            return false
        }
        if (!password.length) {
            toast.error('Password is required')
            return false
        }
        return true
    }

    const validateSignup = () => {
        if (!email.length) {
            toast.error('Email is required')
            return false
        }
        if (!password.length) {
            toast.error('Password is required')
            return false
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return false
        }
        return true
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (validateSignup()) {
            try {
                const response = await apiClient.post(SIGNUP_ROUTE,
                    { email, password },
                    { withCredentials: true })
                if (response.status === 201) {
                    toast.success('Signup successful')
                    navigate('/profile')
                    setUserInfo(response.data.user)
                } else {
                    toast.error('Signup failed')
                }
            } catch (error) {
                toast.error('Signup failed: ' + error.message)
            }
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (validateLogin()) {
            try {
                const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true })
                if (response.data.user.id) {
                    setUserInfo(response.data.user)
                    if (response.data.user.profileSetup) navigate('/chat')
                    else navigate('/profile')
                } else {
                    toast.error('Check credentials')
                }
            } catch (error) {
                toast.error('Login failed: ' + error.message)
            }
        }
    }

    return (
        <div className='h-[100vh] w-[100vw] flex items-center justify-center relative'>
            {/* GitHub Link */}
            <a
                href="https://github.com/lendrik-kumar/CHAT-APP-main-.git"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-5 right-5 flex items-center gap-2 text-black font-bold text-lg hover:text-purple-700 transition-all duration-300"
            >
                <FaGithub className="text-2xl" />
                Source code of this project
            </a>

            <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
                <div className='flex flex-col gap-10 items-center justify-center'>
                    <div className='flex items-center justify-center flex-col'>
                        <div className='flex items-center justify-center'>
                            <h1 className='text-5xl md:text-6xl font-bold'>Welcome</h1>
                            <img src={Victory} alt="victory emoji" className='h-[100px]' />
                        </div>
                        <p className='font-medium text-center'>Fill in the details to get started!!</p>
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <Tabs className='w-3/4' defaultValue='login' >
                            <TabsList className='bg-transparent flex rounded-none w-full'>
                                <TabsTrigger
                                    className='data-[state=active]:bg-transparent text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'
                                    value="signup">Sign Up
                                </TabsTrigger>
                                <TabsTrigger
                                    className='data-[state=active]:bg-transparent text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'
                                    value="login">Login
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent className='flex flex-col gap-5 mt-10' value='signup'>
                                <form onSubmit={handleSignUp} className='flex flex-col gap-5'>
                                    <Input
                                        placeholder='Email'
                                        type='email'
                                        className='rounded-full p-6'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete='email'
                                    />
                                    <Input
                                        placeholder='Password'
                                        type='password'
                                        className='rounded-full p-6'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete='new-password'
                                    />
                                    <Input
                                        placeholder='Confirm Password'
                                        type='password'
                                        className='rounded-full p-6'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        autoComplete='new-password'
                                    />
                                    <Button type='submit' className='rounded-full p-6'>Sign Up</Button>
                                </form>
                            </TabsContent>
                            <TabsContent className='flex flex-col gap-5 mt-10' value='login'>
                                <form onSubmit={handleLogin} className='flex flex-col gap-5'>
                                    <Input
                                        placeholder='Email'
                                        type='email'
                                        className='rounded-full p-6'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete='email'
                                    />
                                    <Input
                                        placeholder='Password'
                                        type='password'
                                        className='rounded-full p-6'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete='current-password'
                                    />
                                    <Button type='submit' className='rounded-full p-6'>Login</Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className='hidden xl:flex justify-center items-center'>
                    <img src={Background} alt="background login" className='h-[700px]' />
                </div>
            </div>
        </div>
    )
}

export default Auth
