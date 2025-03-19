import { Router } from "express"
import { 
    signUp, 
    login, 
    getUserInfo, 
    updateProfile, 
    addProfileImage,
    removeProfileImage 
} from "../controllers/authController.js"
import verifyToken from "../middlewares/authMiddleware.js"
import multer from "multer"
import upload from "../middlewares/multer_middleware.js"

const uploadFile = upload.single("profile-image")

const authRoutes = Router()

authRoutes.post('/signup', signUp)
authRoutes.post('/login', login)
authRoutes.get('/userinfo',verifyToken, getUserInfo)
authRoutes.post('/update-profile', verifyToken, updateProfile)
authRoutes.post('/add-profile-image', verifyToken,uploadFile, addProfileImage)
authRoutes.delete('/remove-profile-image', verifyToken, removeProfileImage)

export default authRoutes