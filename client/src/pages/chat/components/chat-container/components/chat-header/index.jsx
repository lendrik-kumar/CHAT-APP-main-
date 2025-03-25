import {RiCloseFill} from 'react-icons/ri'
import { Button } from '../../../../../../components/ui/button.jsx'

const ChatHeader = () => {
  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-center'>
        <div className="flex gap-5 items-center">
            <div className="flex gap-3 items-center justify-center">
                <Button className = " text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" >
                    <RiCloseFill className=' text-3xl' />
                </Button>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader