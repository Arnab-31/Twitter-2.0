
import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";
const Feed = (props):any => {

  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

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
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot:any) => {
          setPosts(snapshot.docs);
          console.log(snapshot.docs);
        }
      ),
    [db]
  );

    return (
        <div className="flex-grow border-l border-r border-gray-700 max-w-4xl sm:ml-[73px] xl:ml-[370px]">
          <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700 xl:text-4xl">
            <h2 className="text-lg sm:text-xl font-bold">Home</h2>
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
              <SparklesIcon className="h7 text-white" />
            </div>
          </div>
          <Input />

          <div className="pb-72">
            {posts.map((post:any) => (
              <Post key={post.id} id={post.id} post={post.data()} postPage={false}></Post>
            ))

            }
          </div>

        </div>
    )
}

export default Feed;