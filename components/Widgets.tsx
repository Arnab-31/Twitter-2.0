import { SearchIcon } from "@heroicons/react/outline";
import Trending from "./Trending";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

interface WidgetsProps {
    trendingResults : any,
    followResults:any
}

const Widgets:FC<WidgetsProps>  = ({ trendingResults, followResults }) => {
  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5 sticky">
      <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
        {/* <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <SearchIcon className="text-gray-500 h7 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
            placeholder="Search Twitter"
          />
        </div> */}
      </div>


      <div className="text-[#d9d9d9] space-y-7 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">Communities to follow</h4>
        {followResults?.map((result:any, index:any) => (
          <Link href={`/community/${result.id}`}>
          <div
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-4 cursor-pointer transition duration-200 ease-out flex items-center"
            key={index}
          >
            <img
              src={result.userImg}
              alt="Profile Pic"
              className="h-14 w-14 rounded-full mr-4"
              />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline text-[15px] mb-2">
                {result.username}
              </h4>
              <h5 className="text-gray-500 text-[15px]">{result.tag}</h5>
            </div>
            <button className="ml-auto bg-white text-black rounded-full font-bold text-lg py-1.5 px-3.5">
              Follow
            </button>
          </div>
          </Link>
        ))}
        {/* <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button> */}
      </div>

      
      <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-2xl px-4">What's happening</h4>
        {trendingResults?.map((result:any, index:any) => (
          <Trending key={index} result={result} />
        ))}
        {/* <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button> */}
      </div>
    </div>
  );
}

export default Widgets;