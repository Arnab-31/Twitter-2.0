import { FC, useState, useEffect } from "react";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {useRouter} from "next/router"
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
} from "@firebase/firestore";
import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
    SwitchHorizontalIcon,
    TrashIcon,
  } from "@heroicons/react/outline";
import {
HeartIcon as HeartIconFilled,
ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { modalState, postIdState, communityIdState } from "../atoms/modalAtom";
import { db } from "../firebase";


interface PostProps {
    id: any,
    post: any,
    postPage: any,
    comId: any
}

const Post:FC<PostProps> = ({id,post, postPage = false, comId=null}) => {


    const { data: session }:any = useSession();

    const [isOpen, setIsOpen] = useRecoilState(modalState);

    const [postId,setPostId] = useRecoilState(postIdState);
    const [communityId, setCommunityId] = useRecoilState(communityIdState);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const router = useRouter();


    useEffect(
        () =>
          onSnapshot(
            query(
              collection(db, "posts", id, "comments"),
              orderBy("timestamp", "desc")
            ),
            (snapshot:any) => setComments(snapshot.docs)
          ),
        [db, id]
    );

    useEffect(
        () =>
          onSnapshot(collection(db, "posts", id, "likes"), (snapshot:any) =>
            setLikes(snapshot.docs)
          ),
        [db, id]
    );
    
    useEffect(
        () =>
          setLiked(
            likes.findIndex((like:any) => like.id === session?.user?.uid) !== -1
          ),
        [likes]
    );

    const likePost = async () => {
        if(liked){
            await deleteDoc(doc(db , "posts", id, "likes" , session?.user?.uid))
        } else {
            await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
                username: session?.user?.name,
            });
            console.log("liked")
        }

        console.log(liked)
        console.log(likes)
    }
    return (
        <div className="p-3 flex cursor-pointer border-b border-gray-700"  onClick={() => {if(comId)setCommunityId(comId);else setCommunityId(null); router.push(`/${id}`)}}>
            {!postPage && (
                <img
                src={post?.userImg}
                alt=""
                className="h-14 w-14 rounded-full mr-4"
              />
            )}

            <div className="flex flex-col space-y-2 w-full">
                <div className={`flex ${!postPage && "justify-between"}`}>
                    {postPage && (
                        <img
                        src={post?.userImg}
                        alt="Profile Pic"
                        className="h-14 w-14 rounded-full mr-4"
                        />
                    )}

                    <div className="text-[#6e767d]">
                        <div className="inline-block group">
                            <h4
                                className={`font-bold xl:text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                                !postPage && "inline-block"
                                }`}
                            >
                                {post?.username}
                            </h4>
                            <span
                                className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
                            >
                                @{post?.tag}
                            </span>
                        </div>
                        ·{" "}
                        <span className="hover:underline text-sm sm:text-[15px]">
                            <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                        {!postPage && (
                        <p className="text-[#d9d9d9] xl:text-[20px] sm:text-base mt-2 mb-1">
                           {post?.text}
                        </p>
                        )}
                    </div>
                    <div className="icon group flex-shrink-0 ml-auto">
                        <DotsHorizontalIcon className="h7 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
                {postPage && (
                    <p className="text-[#d9d9d9] mt-0.5 text-2xl">{post?.text}</p>
                )}
                <img
                    src={post?.image}
                    alt=""
                    className="rounded-2xl max-h-[700px] object-cover mr-2"
                />
                <div
                className={`text-[#6e767d] flex justify-between w-10/12 ${
                    postPage && "mx-auto"
                }`}>
                    <div
                        className="flex items-center space-x-1 group"
                        onClick={(e) => {
                            console.log("Clicked")
                        e.stopPropagation();
                        setIsOpen(true);
                        setPostId(id);
                        setTimeout(() => console.log(isOpen), 500)
                    }}>
                        <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                            <ChatIcon className="h7 group-hover:text-[#1d9bf0]" />
                        </div>
                        {comments.length > 0 && (
                        <span className="group-hover:text-[#1d9bf0] text-sm">
                            {comments.length}
                        </span>
                        )}
                    </div>

                    {session?.user?.uid === post?.id ? (
                    <div
                    className="flex items-center space-x-1 group"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteDoc(doc(db, "posts", id));
                        //router.push("/");
                    }}
                    >
                        <div className="icon group-hover:bg-red-600/10">
                            <TrashIcon className="h7 group-hover:text-red-600" />
                        </div>
                    </div>
                    ) : (
                    <div className="flex items-center space-x-1 group">
                        <div className="icon group-hover:bg-green-500/10">
                            <SwitchHorizontalIcon className="h7 group-hover:text-green-500" />
                        </div>
                    </div>
                    )}

                    <div
                        className="flex items-center space-x-1 group"
                        onClick={(e) => {
                        e.stopPropagation();
                        likePost();
                        }}
                    >
                        <div className="icon group-hover:bg-pink-600/10">
                        {liked ? (
                            <HeartIconFilled className="h7 text-red-600" />
                        ) : (
                            <HeartIcon className="h7 group-hover:text-red-600" />
                        )}  
                            </div>
                                {likes.length > 0 && (
                                <span
                                    className={`group-hover:text-pink-600 text-sm ${
                                    liked && "text-pink-600"
                                    }`}
                                >
                                    {likes.length}
                                </span>
                                )}
                            </div>

                            <div className="icon group">
                                <ShareIcon className="h-7 group-hover:text-[#1d9bf0]" />
                            </div>
                            <div className="icon group">
                                <ChartBarIcon className="h-7 group-hover:text-[#1d9bf0]" />
                            </div>
                         </div>
                     </div> 
                </div>
    ) 
}

export default Post;