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
import { useState, useEffect } from 'react';
import { getColor } from '../../../../../lib/utils.js';
import { apiClient } from '../../../../../lib/api-client.js';
import { GET_ALL_CONTACTS, HOST } from '../../../../../utils/constants.js';
import { ScrollArea } from '../../../../../components/ui/scroll-area.jsx';
import { Avatar, AvatarImage } from '../../../../../components/ui/avatar.jsx';
import { Button } from '../../../../../components/ui/button.jsx';

const CreateChannel = () => {
  const [newChannelModel, setNewChannelModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiClient.get(GET_ALL_CONTACTS, { withCredentials: true });
        if (response.data.contacts) {
          setAllContacts(response.data.contacts);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getData();
  }, []);

  const createChannel = async () => {
    try {
      if (!channelName || selectedContacts.length === 0) {
        console.error("Channel name and at least one contact are required.");
        return;
      }

      const response = await apiClient.post(
        `${HOST}/api/channels/create`,
        { name: channelName, members: selectedContacts },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Channel created successfully:", response.data);
        setNewChannelModel(false);
        setChannelName("");
        setSelectedContacts([]);
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  const toggleContactSelection = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewChannelModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
        <DialogContent className="bg-[#181920] border-none text-white h-[400px] w-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Create a New Channel</DialogTitle>
            <DialogDescription>Enter a name and select members for the channel.</DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <div>
            <Button>Create Channel</Button>
          </div>
          <ScrollArea className="h-[150px]">
            <div className="flex flex-col gap-5">
              {allContacts.map((contact) => (
                <div
                  key={contact._id}
                  className={`flex gap-3 items-center cursor-pointer ${
                    selectedContacts.includes(contact._id) ? "bg-[#8417ff]/10" : ""
                  }`}
                  onClick={() => toggleContactSelection(contact._id)}
                >
                  <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                      {contact.image ? (
                        <AvatarImage
                          src={`${HOST}/${contact.image}`}
                          alt="profile"
                          className="rounded-full object-cover w-full h-full bg-black"
                        />
                      ) : (
                        <div
                          className={`uppercase h-12 w-12 text-sm border-[1px] flex items-center justify-center rounded-full ${getColor(
                            contact.color
                          )}`}
                        >
                          {contact.firstName
                            ? contact.firstName.charAt(0).toUpperCase() || ""
                            : contact.email.charAt(0).toUpperCase() || ""}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : contact.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-[#8417ff] text-white px-4 py-2 rounded-md hover:bg-[#741bda] transition-all duration-300"
              onClick={createChannel}
            >
              Create Channel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateChannel;
