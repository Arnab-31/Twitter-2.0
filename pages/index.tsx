import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import { getProviders, getSession, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react"
import { FC } from 'react';
import Login from "../components/Login";

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

  if (!session) return <Login  providers={providers}/>;

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-black min-h-screen flex min-w-full max-w-[1500px]">
          <Sidebar/>
          <Feed /> 
      </main> 
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
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