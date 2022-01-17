import { useRef, useState } from "react";
import {
    CalendarIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    PhotographIcon,
    XIcon,
  } from "@heroicons/react/outline";

const Input = () => {

    const [input, setInput] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedFile,  setSelectedFile] = useState(null);
    const filePickerRef: any = useRef(null);

    const addImageToPost = ( ) =>{

    }
    return (
    <div className="border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll">
        
        <img  className="h-11 w-11 rounded-full cursor-pointer"
         src = "https://i.pinimg.com/474x/27/6f/46/276f46d26122f515a4362993e0bfd141.jpg"></img>


        <div className="w-full divide-y divide-gray-700">
            <div className={``}>
                <textarea
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                    rows={2}
                    placeholder="What's happening?"
                    className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                />

                
                {selectedFile && (
                <div className="relative">
                    <div
                        className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                        onClick={() => setSelectedFile(null)}
                    >
                        <XIcon className="text-white h-5" />
                    </div>

                    <img
                        src={selectedFile}
                        alt=""
                        className="rounded-2xl max-h-80 object-contain"
                    />
                </div>
                )}
            </div>

            <div className="flex items-center justify-between pt-2.5">
                <div  className="flex items-center">
                    <div className="icon" onClick={() => filePickerRef.current.click()}>
                        <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                        <input 
                            type="file"
                            hidden
                            ref= {filePickerRef}
                            onChange={addImageToPost} />
                    </div>

                    <div className="icon rotate-90">
                        <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                    </div>

                    <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                        <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                    </div>

                    <div className="icon">
                        <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Input;