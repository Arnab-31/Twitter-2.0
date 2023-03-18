
import { IdentificationIcon, SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Post from "./Post";
import { url } from "inspector";
const CommunityFeed = () => {

  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState();
  const [memberCount, setMemberCount] = useState();
  const [about, setAbout] = useState();
  const [bgImage, setBgImage] = useState();
  const router = useRouter();
  
  const { Id } = router.query

  let ComId = Id?.toString();
  // MESSY
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //     (snapshot) => {
  //       setPosts(snapshot.docs);
  //     }
  //   );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [db]);

  // CLEAN
  useEffect(
    () => {
      onSnapshot(
        query(collection(db, "community", ComId, "posts"), orderBy("timestamp", "desc")),
        (snapshot:any) => {
          setPosts(snapshot.docs);
          console.log(snapshot.docs);
        }
      )
    },[db, ComId]
  );

  useEffect(() =>{
    const fetchData = async () => {
      const docRef = doc(db, "community", ComId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setName(data?.name);
      setAbout(data?.about);
      setMemberCount(data?.memberCount);
      setBgImage(data?.bgImage);
    }

    fetchData();
  })
    
    return (
        <div className="flex-grow border-l border-r border-gray-700 max-w-4xl sm:ml-[73px] xl:ml-[370px]">
          <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700 xl:text-4xl">
            <h2 className="text-lg sm:text-xl font-bold">Community</h2>
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
              <SparklesIcon className="h7 text-white" />
            </div>
          </div>
       
            <div className=""> 
              <div>
                <img src={bgImage} width="100%"></img>
              </div>
              <div className="text-white bg-sky-500 py-6 px-6 mb-8">
                <h2 className="font-bold text-3xl pb-3" >{name}</h2>
                <p className="text-lg">{about}</p>
              </div>
            </div>
          <Input comId = {Id}/>

          <div className="pb-72">
            {posts.map((post:any) => (
              <Post key={post.id} id={post.id} post={post.data()} postPage={false} comId={Id}></Post>
            ))

            }
          </div>

        </div>
    )
}

export default CommunityFeed;