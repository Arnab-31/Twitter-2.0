import Image from "next/image";
import SidebarLink from "./SidebarLInk";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut,useSession } from "next-auth/react";
import Link from "next/link";

function Sidebar (){
    
    const { data: session }:any = useSession(); 

    return (
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
            
            <div className="flex items-center justify-center w-14 h-14
            hoverAnimation p-0 xl:ml-24">
              <Link href="/">
                <Image src="https://icon-library.com/images/twitter-icon-svg/twitter-icon-svg-28.jpg" width={30} height={30}/>
              </Link>
            </div>

            <div className = "space-y-4 mt-4 mb-2.5 xl:ml-24">
                <SidebarLink text="Home" Icon={HomeIcon} active />
                <SidebarLink text="Explore" Icon={HashtagIcon} />
                <SidebarLink text="Notifications" Icon={BellIcon}  />
                <SidebarLink text="Messages" Icon={InboxIcon}  />
                <SidebarLink text="Bookmarks" Icon={BookmarkIcon}  />
                <SidebarLink text="Lists" Icon={ ClipboardListIcon}  />
                <SidebarLink text="Profile" Icon={UserIcon}  />
                <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
                
            </div>

            {/* <button className="hidden xl:inline ml-24 bg-[#1d9bf0] text-white rounded-full w-56 h-[45px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
                Tweet
            </button> */}

            <div  className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-24 xl:-mr-5" onClick={() => signOut()}>
                <img 
                    src={String(session?.user?.image)} 
                    className = "h-10 w-10 rounded-full xl:mr-2.5"
                />

                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">{session?.user?.name}</h4>
                    <p className="text-[#6e767d]">@A{session?.user?.tag}</p>
                </div>

                <DotsHorizontalIcon className="h7 hidden xl:inline ml-10"/>
            </div> 
        </div> 
    )
}

export default Sidebar;