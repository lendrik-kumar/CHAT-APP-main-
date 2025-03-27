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

const NewDm = () => {

    const [openNewContactModel,setOpenNewContactModel] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])

    const searchContacts = async (searchTerm) => {

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
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input 
                        placeholder = "search contacts" 
                        className = 'rounded-lg p-6 bg-[#2c2e3b] border-none'
                        onChange = {(e) => searchContacts(e.target.value)}
                    />
                </div>
                {
                    searchContacts.length <= 0 && (
                    <div className=" flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-100 transition-all mt-5">
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
