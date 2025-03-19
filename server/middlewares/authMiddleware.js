import jwt from "jsonwebtoken"

const verifyToken = (request, response, next) => {
    const token = request.cookies.jwt
    if(!token) return response.status(401).send("not authenticated")
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if(err) return response.status(403).send("token not valid")
        request.userId = payload.userId
        next()
    })
}

export default verifyToken