import { useRef, useState } from "react";
import {
    CalendarIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    PhotographIcon,
    XIcon,
  } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import {
    addDoc,
    collection,
    doc,
    DocumentReference,
    serverTimestamp,
    updateDoc,
  } from "@firebase/firestore";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useSession } from "next-auth/react";
import { DocumentRemoveIcon } from "@heroicons/react/outline";
import { Session } from "inspector";


const Input = ({comId  = null} : any) => {

    
    const [input, setInput] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedFile,  setSelectedFile] = useState(null);
    const filePickerRef: any = useRef(null);
    const [loading, setLoading] = useState(false);
    
   

    const { data: session }:any= useSession();
    
    interface TweetType {
        id: any,
        username: any
        userImg: any,
        tag: any,
        text: any,
        timestamp:  any
    }

    const sendCommunityPost = async () => {
        if(loading) return; 
        setLoading(true);

        const docRef: DocumentReference = await addDoc(collection(db, "community", comId, "posts"), {
            id: session?.user?.uid,
            username: session?.user?.name,
            userImg: session?.user?.image,
            tag: session?.user?.tag,
            text: input,
            timestamp: serverTimestamp(), 
        });

        
        const imageRef = ref(storage, `community/${comId}/posts/${docRef.id}/image`);
        

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
              const downloadURL = await getDownloadURL(imageRef);
              await updateDoc(doc(db, "community", comId, "posts",docRef.id), {
                image: downloadURL,
              });
            });
        }
    

        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
    }
    
    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef: DocumentReference = await addDoc(collection(db, "posts"), {
            id: session?.user?.uid,
            username: session?.user?.name,
            userImg: session?.user?.image,
            tag: session?.user?.tag,
            text: input,
            timestamp: serverTimestamp(), 
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
              const downloadURL = await getDownloadURL(imageRef);
              await updateDoc(doc(db, "posts", docRef.id), {
                image: downloadURL,
              });
            });
          }
    
        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
      
    }

    const addImageToPost = (e: any) =>{
        const reader = new FileReader();
        if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent : any) => {
            setSelectedFile(readerEvent.target.result);
        };
    }
 
    
    const addEmoji = (e: any) => {
        let sym = e.unified.split("-");
        let codesArray: any[]= [];
        sym.forEach((el:String) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };
    return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-auto overflow-x-auto ${loading && "opacity-60"} `}>
        
        <img  className="h-14 w-14 rounded-full cursor-pointer"
         src = {String(session?.user?.image)}></img>


        <div className="w-full divide-y divide-gray-700">
            <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                <textarea
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                    rows={2} 
                    placeholder="What's happening?"
                    className="bg-transparent outline-none text-[#d9d9d9] text-xl placeholder-gray-500 tracking-wide w-full min-h-[50px] overflow-y-auto overflow-x-auto"
                />

                
                {selectedFile && (
                <div className="relative">
                    <div
                        className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                        onClick={() => setSelectedFile(null)}
                    >
                        <XIcon className="text-white h7" />
                    </div>

                    <img
                        src={selectedFile}
                        alt=""
                        className="rounded-2xl max-h-80 object-contain"
                    />
                </div>
                )}
            </div>
            
            {!loading &&
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
{/* 
                        <div className="icon rotate-90">
                            <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div> */}

                        <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                            <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>

                        {/* <div className="icon">
                            <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div> */}

                        {showEmojis && (
                        <Picker
                        onSelect={addEmoji}
                        style={{
                            position: "absolute",
                            marginTop: "465px",
                            marginLeft: -40,
                            maxWidth: "320px",
                            borderRadius: "20px",
                        }}
                        theme="dark"
                        />
                        )}
                    </div>
                    <button
                        className="bg-[#1d9bf0] text-white text-xl rounded-full px-4 py-2 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                        disabled={!input.trim() && !selectedFile}
                        // onClick={sendPost}
                        onClick={comId ? sendCommunityPost : sendPost} 
                    >
                        Tweet
                    </button>
                </div>
            }
        </div>
    </div>
    )
}

export default Input;