import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import CommunityFeed from "../../components/CommunityFeed";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { FC } from 'react';
import { modalState } from "../../atoms/modalAtom";
import Modal from "../../components/Modal";


interface HomeProps {
    trendingResults: any,
    followResults: any,
    providers: any
}

const Community:FC<HomeProps>  = ({ trendingResults, followResults, providers })  => {
  const router = useRouter();  
  const { Id } = router.query;
  const [isOpen, setIsOpen] = useRecoilState(modalState); 

    return (
        <div className="bg-black min-h-screen flex min-w-full max-w-[1500px]">
            <Sidebar />
            <CommunityFeed />
            <Widgets
                trendingResults={trendingResults}
                followResults={followResults}
            />
            {isOpen && <Modal community={Id} />}
        </div>

        
    )
    
}




export async function getServerSideProps(context: any) {
    const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
      (res) => res.json()
    );
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
      userImg: "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2022/05/08/3215361-102240079.jpg?itok=XUhIltdc",
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

  export default Community;