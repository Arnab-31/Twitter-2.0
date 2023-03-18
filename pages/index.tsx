import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import { getProviders, getSession, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react"
import { FC, useState } from 'react';
import Login from "../components/Login";
import Modal from "../components/Modal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Widgets from '../components/Widgets';

export const trendingData = [
  {
    heading: "T20 World Cup 2021 · LIVE",
    description: "NZvAUS: New Zealand and Australia clash in the T20 World Cup final",
    img: "https://rb.gy/d9yjtu",
    tags: [
    "#T20WorldCupFinal, ",
    "Kane Williamson"
    ]
  },
  {
    heading: "Trending in United Arab Emirates",
    description: "#earthquake",
    img: "https://rb.gy/jvuy4v",
    tags: [
    "#DubaiAirshow, ",
    "#gessdubai"
    ]
  },
  {
    heading: "Trending in Digital Creators",
    description: "tubbo and quackity",
    img: "",
    tags: [
    "QUACKITY AND TUBBO,"
    ]
  }
]

interface HomeProps {
  trendingResults: any,
  followResults: any,
  providers: any
}

const Home:FC<HomeProps> = ({ trendingResults, followResults, providers })  => {
  // <SessionProvider>
  //   {useSession() ? <Login />: null}
  // </SessionProvider>
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  

  if (!session) return <Login  providers={providers}/>;

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-black min-h-screen flex">
          <Sidebar/>
          <Feed modalOpen={setOpen}/> 
          <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
          />
           
          {open && <Modal  /> }
      </main> 
    </div>
  )
}

export async function getServerSideProps(context: any) {
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

export default Home;