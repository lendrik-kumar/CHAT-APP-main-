import User from "../models/userModel.js"


export const searchContacts = async (req, res) => {
    try {
        const {searchTerm} = req.body
       
        if(searchTerm === undefined || searchTerm === null){
            return res.status(400).send("search term is required")
        }

        const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\][\\]/g,"\\$&")

        const regex = new RegExp(sanitizedSearchTerm, "i")

        const contacts = await User.find({
            $and: [
                { _id : {$ne : req.userId}},
                {
                    $or : [{firstName : regex}, {lastName : regex}, {email : regex}]
                }
            ]
        })

        return res.status(200).json({contacts})

    } catch (error) {
        console.error("Error Logging Out", error)
        return res.status(500).send("Internal server error")
    }
}