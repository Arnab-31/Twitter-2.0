import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'

export default function Home() {
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
