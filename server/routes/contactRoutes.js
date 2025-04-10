import { Router } from "express"
import verifyToken from "../middlewares/authMiddleware.js"
import { searchContacts, getContactsForDMList } from "../controllers/contactsController.js"

const contactsRoutes = Router()

contactsRoutes.post("/search",  searchContacts)
contactsRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDMList)

export default contactsRoutes