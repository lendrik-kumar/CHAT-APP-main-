import {RiCloseFill} from 'react-icons/ri'
import { Button } from '../../../../../../components/ui/button.jsx'
import { useAppStore } from '../../../../../../store/index.js'
import { Avatar, AvatarImage } from '../../../../../../components/ui/avatar.jsx'
import { HOST } from '../../../../../../utils/constants.js'
import { getColor } from '../../../../../../lib/utils.js'

const ChatHeader = () => {

  const { closeChat, selectedChatData, selectedChatType } = useAppStore()

  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20'>
        <div className="flex gap-5 items-center w-full justify-between">
            <div className="flex gap-3 items-center justify-center ">
              <div className=' w-12 h-12 relative' >
                {
                  selectedChatType === "contact" ? (<Avatar className="h-12 w-12 rounded-full overflow-hidden">
                  {selectedChatData.image ? (
                  <AvatarImage
                      src={`${HOST}/${selectedChatData.image}`}
                      alt="profile"
                      className="object-cover w-full h-full bg-black"
                  />
                  ) : (
                  <div
                      className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                      selectedChatData.color
                      )}`}
                  >
                      {selectedChatData.firstName && selectedChatType === "contact"
                      ? selectedChatData.firstName.charAt(0).toUpperCase()
                      : selectedChatData.email.charAt(0).toUpperCase()}
                  </div>
                  )}
              </Avatar>) :
              (<div className="flex bg-[#ffffff22] h-10 w-10 items-center justify-center rounded-full">#</div>)
                }
                
                </div>
                <div>
                  {
                    selectedChatType === "channel" && selectedChatData.name
                  }
                  {
                    selectedChatType === "contact" && selectedChatData.firstName ? `${selectedChatData.firstName} ${selectedChatData.lastName}` : selectedChatData.email
                  }
                </div>
              </div>
                <div className=' flex items-center justify-center gap-5' >
                <Button className = " text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                onClick = {closeChat} >
                    <RiCloseFill className=' text-3xl' />
                </Button>
                </div>
        </div>
    </div>
  )
}

export default ChatHeader