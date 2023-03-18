import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
  } from "@heroicons/react/outline";
import { FC } from "react";
  import Moment from "react-moment";
  

  interface CommentProps {
      comment: any,
      id: any
  }
  
  const Comment:FC<CommentProps> = ({ comment, id }) =>{
    return (
      <div className="p-3 flex cursor-pointer border-b border-gray-700">
        <img
          src={comment?.userImg}
          alt=""
          className="h-14 w-14 rounded-full mr-4"
        />
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex justify-between">
            <div className="text-[#6e767d]">
              <div className="inline-block group">
                <h4 className="font-bold text-[#d9d9d9] sm:text-base inline-block group-hover:underline xl:text-lg">
                  {comment?.username}
                </h4>
                <span className="ml-1.5 text-sm sm:text-[15px] xl:text-[12px]">
                  @{comment?.tag}{" "}
                </span>
              </div>{" "}
              ·{" "}
              <span className="hover:underline text-sm xl:text-[12px] ">
                <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
              </span>
              <p className="text-[#d9d9d9] mt-0.5 max-w-lg overflow-scroll overflow-y-auto overflow-x-auto text-[25px] sm:text-base">
                {comment?.comment}
              </p>
            </div>
            <div className="icon group flex-shrink-0">
              <DotsHorizontalIcon className="h7 text-[#6e767d] group-hover:text-[#1d9bf0]" />
            </div>
          </div>
  
          <div className="text-[#6e767d] flex justify-between w-10/12">
            <div className="icon group">
              <ChatIcon className="h7 group-hover:text-[#1d9bf0]" />
            </div>
  
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-pink-600/10">
                <HeartIcon className="h7 group-hover:text-pink-600" />
              </div>
              <span className="group-hover:text-pink-600 text-sm"></span>
            </div>
  
            <div className="icon group">
              <ShareIcon className="h7 group-hover:text-[#1d9bf0]" />
            </div>
            <div className="icon group">
              <ChartBarIcon className="h7 group-hover:text-[#1d9bf0]" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Comment;