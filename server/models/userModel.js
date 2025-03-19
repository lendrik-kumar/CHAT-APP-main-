import { genSalt } from "bcrypt"
import mongoose from "mongoose"
import { hash } from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: (true, 'email is required'),
        unique: true,
    },
    password: {
        type: String,
        required: (true, 'password is required'),
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    image: {
        type: String,
        required: false
    },
    color: {
        type: Number,
        default: false
    },
    profileSetup: {
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function(next){
    const salt = await genSalt()
    this.password = await hash(this.password, salt)
    next()
})

const User = mongoose.model('User', userSchema)

export default User