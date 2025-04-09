import { useAppStore } from '../../../../../store/index.js'
import { Avatar, AvatarImage } from '../../../../../components/ui/avatar'
import { HOST, LOG_OUT } from '../../../../../utils/constants'
import { getColor } from '../../../../../lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../../../components/ui/tooltip.jsx'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { IoPowerSharp } from "react-icons/io5"
import { apiClient } from '../../../../../lib/api-client.js'

const ProfileInfo = () => {

    const {userInfo, setUserInfo} = useAppStore()
    const navigate = useNavigate()
    

    const logOut = async () => {
        console.log(userInfo)
        try {
            const response = await apiClient.post(LOG_OUT, {}, {withCredentials: true})
            
            if(response.status === 200) {
                localStorage.removeItem('app-storage')
                await setUserInfo(null)
                navigate("/auth")   
            }
        } catch (error) {
            console.log(error)
        }

    } 

    return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]'>
        <div className="flex gap-3 items-center justify-center">
            <div className=' w-12 h-12 relative' >
            <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                {userInfo.image ? (
                <AvatarImage
                  src={`${HOST}/${userInfo.image}`}
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
            <div>
                {
                    userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
                }
            </div>
        </div> 
        <div className="flex gap-5">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                          <FaEdit  className=' text-purple-500 text-xl font-medium' onClick={() => navigate('/profile')} />
                    </ TooltipTrigger>
                    <TooltipContent className="bg-black/50 border-none text-white" >
                        <p>Edit Profile</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                          <IoPowerSharp className=' text-red-500 text-xl font-medium' onClick ={logOut} />
                    </ TooltipTrigger>
                    <TooltipContent className=" bg-black/50 border-none text-white" >
                        <p>LogOut</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>


        </div>
    </div>
  )
}

export default ProfileInfo

/*
code to delete cookie
var options = {
    maxAge: ALMOST_ONE_HOUR_MS,
    domain: '.test.com',
    expires: new Date(Date.now() + ALMOST_ONE_HOUR_MS)
};
var value = userInfo.token;
cookies.set("testtoken", value, options); */
