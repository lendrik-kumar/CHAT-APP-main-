import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from '../../../../../components/ui/tooltip.jsx'
import { FaPlus } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../../../../components/ui/dialog.jsx"
import { Input } from '../../../../../components/ui/input.jsx'
import Lottie from "react-lottie"
import { useState } from 'react'
import { animationDefaultOptions, getColor } from '../../../../../lib/utils.js'
import { apiClient } from '../../../../../lib/api-client.js'
import { SEARCH_CONTACT_ROUTE } from '../../../../../utils/constants.js'
import { ScrollArea }from '../../../../../components/ui/scroll-area.jsx'
import { Avatar, AvatarImage } from '../../../../../components/ui/avatar.jsx'
import { useAppStore } from '../../../../../store/index.js'

const NewDm = () => {
    const {setSelectedChatType, setSelectedChatData} = useAppStore()
    const [openNewContactModel,setOpenNewContactModel] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])

    const searchContacts = async (searchTerm) => {
        try {
            if(searchTerm.length > 0){
                const response = await apiClient.post(
                    SEARCH_CONTACT_ROUTE,
                    {searchTerm},
                    {withCredentials : true}
                )
            }
            else{
                setSearchedContacts([])
            }

            if(response.status === 200 && response.data.contacts){
                setSearchedContacts(response.data.contacts)
            }

        } catch (error) {
            console.log(error);
            
        }

    }

    const selectNewContact = async () => {
        setOpenNewContactModel(false)
        setSearchedContacts([])
        setSelectedChatData(contact)
        setSelectedChatType("contact")
    }

  return (
    <div>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus  
                    className=' text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300'
                    onClick={() => setOpenNewContactModel(true)}
                    />
                </TooltipTrigger>
                <TooltipContent className = 'bg-[#1c1b1e] border-none mb-2 p-3 text-white' >
                    Select New Contact
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <Dialog open = {openNewContactModel} onOpenChange={setOpenNewContactModel}>
            <DialogContent className = " bg-[#181920] border-none text-white h-[400px] w-[400px] flex flex-col" >
                <DialogHeader>
                    <DialogTitle>Search a new contact</DialogTitle>
                    <DialogDescription>
                        
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input 
                        placeholder = "search contacts" 
                        className = 'rounded-lg p-6 bg-[#2c2e3b] border-none'
                        onChange = {(e) => searchContacts(e.target.value)}
                    />
                </div>

                {searchedContacts > 0 && (
                <ScrollArea className = " h-[150px]" >
                    <div className=' flex flex-col gap-5'>
                        {searchedContacts.map((contact) => {
                            <div key={contact._id} className=' flex gap-3 items-center cursor-pointer' onClick={selectNewContact} > 
                                <div className=' w-12 h-12 relative' >
                                <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                                    {contact.image ? (
                                    <AvatarImage
                                        src={`${HOST}/${contact.image}`}
                                        alt="profile"
                                        className="object-cover w-full h-full bg-black"
                                    />
                                    ) : (
                                    <div
                                        className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                                        userInfo.color
                                        )}`}
                                    >
                                        {userInfo.firstName
                                        ? userInfo.firstName.charAt(0).toUpperCase()
                                        : userInfo.email.charAt(0).toUpperCase()}
                                    </div>
                                    )}
                                </Avatar>
                                </div>
                                <div className=' flex flex-col' >
                                    <span>
                                    {
                                        contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : ""
                                    }
                                    </span>
                                    <span className=' text-xs' >
                                        {contact.email}
                                    </span>
                                </div>
                            </div>
                        })}
                    </div> 
                </ScrollArea>
                )}
                {
                    searchedContacts.length <= 0 && (
                    <div className=" flex-1 md:flex flex-col justify-center items-center duration-100 transition-all md:mt-0 mt-5">
                        <Lottie isClickToPauseDisabled = {true}
                        height={100}
                        width={100}
                        options={animationDefaultOptions}
                        />
                        <div className=" text-opacity-80 text-white flex flex-col gap-5 items-center lg:text-2xl text-xl transition-all duration-300 text-center mt-5" >
                            <h3 className="poppins-medium" >
                                Hi 
                            <span className="text-purple-500">!</span> search new
                            <span className="text-purple-500"> Contact</span> here
                            <span className="text-purple-500">.</span>
                            </h3>
                        </div>
                    </div>
                    )
                }
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default NewDm
