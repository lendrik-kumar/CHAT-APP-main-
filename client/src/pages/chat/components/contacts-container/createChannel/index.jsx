import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from '../../../../../components/ui/tooltip.jsx';
import { FaPlus } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog.jsx";
import { Input } from '../../../../../components/ui/input.jsx';
import { useState, useEffect } from 'react'
import { apiClient } from '../../../../../lib/api-client.js';
import { GET_ALL_CONTACTS, HOST, SEARCH_CONTACT_ROUTE } from '../../../../../utils/constants.js'
import { useAppStore } from '../../../../../store/index.js';
import { Button } from '../../../../../components/ui/button.jsx';
import MultipleSelector from '../../../../../components/ui/multipleselect.jsx'

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [newChannelModel, setNewChannelModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [channelName, setChannelName] = useState("")

  useEffect (() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS, {withCredentials: true})
      setAllContacts(response.data.contacts)
    }
    getData()
  }, [])

  const CreateChannel = async () => {

  }

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
          const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm },
          { withCredentials: true }
        )

        if (response.status === 200 && Array.isArray(response.data.contacts)) {
          setSearchedContacts(response.data.contacts)
        } else {
          setSearchedContacts([])
        }
      } else {
        setSearchedContacts([])
      }
    } catch (error) {
      console.error("Error in searchContacts:", error);
      setSearchedContacts([]);
    }
  }

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className='text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300'
              onClick={() => setNewChannelModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className='bg-[#1c1b1e] border-none mb-2 p-3 text-white'>
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
        <DialogContent className="bg-[#181920] border-none text-white h-[400px] w-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Search new contacts</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className='rounded-lg p-6 bg-[#2c2e3b] border-none'
              onChange={(e) => setChannelName(e.target.value)}
              value = {channelName}
            />
            <div>
              <MultipleSelector 
                className = "rounded-lg bg-[#2c2e3b] border-none py-2 text-white mt-3" 
                defaultOptions = {allContacts} 
                placeholder = "Search Contacts" 
                value = {selectedContacts} 
                onChange ={setSelectedContacts} 
                emptyIndicator = { 
                  <p className=' text-center text-lg leading-10 text-gray-600' >
                    No Results Found
                  </p> 
                }/>
            </div>
            <div>
              <Button className = 'w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 mt-3' >
                create Channel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateChannel;

