import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
  } from "@firebase/firestore";
  import { getProviders, getSession, useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { FC, useEffect, useState } from "react";
  import { useRecoilState } from "recoil";
  import { communityIdState, modalState } from "../atoms/modalAtom";
  import Modal from "../components/Modal";
  import Sidebar from "../components/Sidebar";
  import Post from "../components/Post";
  import { db } from "../firebase";
  import { ArrowLeftIcon } from "@heroicons/react/solid";
  import Head from "next/head";
  import Comment from "../components/Comment";
import Widgets from "../components/Widgets";
import { trendingData } from ".";




interface PostPageProps {
trendingResults: any,
followResults: any,
providers: any
}
  
const PostPage:FC<PostPageProps> = ({ trendingResults, followResults, providers }) => {

    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [communityId, setCommunityId] = useRecoilState(communityIdState);
    const [post, setPost] = useState<any>();
    const [comments, setComments] = useState<any[]>([]);
    const router = useRouter();
    const { id }:any = router.query;

    useEffect(
        () => {
          if(communityId){
            console.log("id page", communityId)
            onSnapshot(doc(db,"community", communityId, "posts", id), (snapshot:any) => {
              setPost(snapshot.data());
            })
          }
          else{
          onSnapshot(doc(db , "posts", id), (snapshot:any) => {
            setPost(snapshot.data());
          })
        }},
        [db]
    );

        
    useEffect(
        () => {
          if(communityId){
            onSnapshot(
              query(
              collection(db,"community", communityId, "posts", id, "comments"),
              orderBy("timestamp", "desc")
              ),
              (snapshot:any) => setComments(snapshot.docs)
            )
          }else{
            onSnapshot(
                query(
                collection(db, "posts", id, "comments"),
                orderBy("timestamp", "desc")
                ),
                (snapshot:any) => setComments(snapshot.docs)
            )}
          },[db, id]
    );
    console.log("Post id", id);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Head>
            <title>
              {post?.username} on Twitter: "{post?.text}"
            </title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="bg-black min-h-screen flex mx-auto">
            <Sidebar />
            <div className="flex-grow border-l border-r border-gray-700 max-w-4xl sm:ml-[73px] xl:ml-[370px]">
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => router.push("/")}
                >
                  <ArrowLeftIcon className="h7 text-white" />
                </div>
                Tweet
              </div>
    
              <Post id={id} post={post} postPage comId={null}/>
              {comments.length > 0 && (
                <div className="pb-72">
                  {comments.map((comment) => (
                    <Comment
                      key={comment?.id}
                      id={comment?.id}
                      comment={comment?.data()}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <Widgets
                trendingResults={trendingResults}
                followResults={followResults}
            />
    
            {isOpen && <Modal community={communityId}/>}
          </main>
        </div>
    );
}

export default PostPage;


export async function getServerSideProps(context:any) {
    const trendingResults = trendingData;
    const followResults = [
      {
      userImg: "https://www.careersinmusic.com/wp-content/uploads/2016/01/get-more-fans-of-your-music.jpg",
      username: "Musicans",
      tag: "@musicX",
      id: "dcdscs"
      },
      {
      userImg: "https://i.pinimg.com/originals/d9/7f/1d/d97f1d658ed51fd2b3bca996cacfb2dc.jpg",
      username: "Basketball",
      tag: "@basketBall",
      id: "ycnnhx",
      },
      {
      userImg: "https://images.moneycontrol.com/static-mcnews/2022/09/Cryptocurrency-5.png?impolicy=website&width=1600&height=900",
      username: "Crypto",
      tag: "@cryptoCom",
      id: "sbjcnr"
      },
      {
      userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRprWSRwkimw8lkZwEjnwhfj3vxi-b4sRV8gA&usqp=CAU",
      username: "Football",
      tag: "@ballFC",
      id: "bjcbda"
      },
      {
      userImg: "https://images.squarespace-cdn.com/content/v1/5a6ba105f14aa1d81bd5b971/ebe3ca7d-1edc-4b4f-ac24-a60d9408fd76/The_Fabricant_Digital_Fashion",
      username: "Fashion Enthusiasts",
      tag: "@fashionX",
      id: "bsjdbc"
      },
      {
      userImg: "https://cd.blokt.com/wp-content/uploads/2018/03/virtonomics-2-e1520119458484.jpg",
      username: "Tech Geeks",
      tag: "@techies",
      id:"nhdbdj"
      }
    ]
    const providers = await getProviders();
    const session = await getSession(context);
  
    return {
      props: {
        trendingResults,
        followResults,
        providers,
        session,
      },
    };
  }