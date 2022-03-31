import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-3 border-4 border-solid border-sky-500 bg-gradient-to-br from-cyan-800 to-rose-500 py-2 lg:items-center lg:justify-center lg:space-y-6">
      <Head>
        <title>Luka's NFT DROP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="p-10 text-center text-2xl font-bold text-white lg:mb-20 lg:text-4xl">
        WELCOME TO LUKA'S NFT DROP CHALLENGE MADE THROUGH #PAPACHALLENGE
      </h1>

      <Image src="/nft.svg" alt="nft" width={400} height={200} />

      <h5 className="p-10 text-center font-bold text-white lg:pt-20">
        PLEASE CHOOSE WHAT WOULD YOU LIKE TO DO ON THIS SITE:
      </h5>

      <div className="flex p-5 lg:p-0">
        <a
          href="/whatsnft"
          className="to-white-500 mr-2 rounded-full bg-gradient-to-br from-purple-800 to-red-800 py-4 px-2 font-bold text-white hover:animate-pulse"
        >
          Learn more about NFT
        </a>
        <a
          href="/nft/luka"
          className="text-purple ml-2 rounded-full bg-gradient-to-br from-purple-800 to-red-800 py-4 px-2 font-bold text-white hover:animate-pulse"
        >
          GRAB SOME NFT :)
        </a>
      </div>
    </div>
  )
}

export default Home
