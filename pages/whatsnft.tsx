import React from 'react'
import Image from 'next/image'

function Whatsnft() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-3 border-4 border-solid border-sky-500 bg-gradient-to-br from-cyan-800 to-rose-500 py-8 lg:items-center lg:justify-center lg:space-y-6">
      <Image
        src="/whatsnft.jpg"
        alt="nft"
        width={400}
        height={200}
        className="rounded-2xl shadow-md"
      />
      <h3 className="p-10 text-center text-2xl font-bold text-white lg:mb-20 lg:text-4xl">
        NFT - Non Fungible Token
      </h3>

      <p className="p-10 pt-0 text-center text-base text-white lg:mb-20 lg:pr-56 lg:pl-56 lg:text-xl">
        A non-fungible token (NFT) is a non-interchangeable unit of data stored
        on a blockchain, a form of digital ledger, that can be sold and traded.
        Types of NFT data units may be associated with digital files such as
        photos, videos, and audio. Because each token is uniquely identifiable,
        NFTs differ from blockchain cryptocurrencies, such as Bitcoin.
      </p>

      <p className="p-10 pt-0 text-center text-base text-white lg:mb-20 lg:pr-56 lg:pl-56 lg:text-xl">
        NFT ledgers claim to provide a public certificate of authenticity or
        proof of ownership, but the legal rights conveyed by an NFT can be
        uncertain. NFTs do not restrict the sharing or copying of the underlying
        digital files, do not necessarily convey the copyright of the digital
        files, and do not prevent the creation of NFTs with identical associated
        files.
      </p>
      <a
        href="/nft/luka"
        className="text-purple ml-2 rounded-full border-2 border-slate-400 bg-gradient-to-br from-purple-800 to-red-800 py-4 px-2 font-bold text-white hover:animate-pulse"
      >
        GO AND GRAB SOME FOR YOURSELF :)
      </a>
    </div>
  )
}

export default Whatsnft
