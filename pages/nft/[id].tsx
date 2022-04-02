import React, { useEffect, useRef, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { BigNumber } from 'ethers'

interface Props {
  collection: Collection
}
function NFTDropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [priceInEth, setPriceInEth] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)
  const nftDrop = useNFTDrop(collection.address)
  const [qty, setQty] = useState(1)

  //AUTH
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  const quantityPlusHandler = () => {
    setQty((prevState) => prevState + 1)
  }

  const quantityMinusHandler = () => {
    if (qty === 1) {
      return
    }
    setQty((prevState) => prevState - 1)
  }

  useEffect(() => {
    if (!nftDrop) return

    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll()

      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
    }

    fetchPrice()
  }, [nftDrop])

  useEffect(() => {
    if (!nftDrop) {
      return
    }

    const fetchNFTDropData = async () => {
      setLoading(true)
      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()

      console.log(claimed, total)

      setClaimedSupply(claimed.length)
      setTotalSupply(total)
      setLoading(false)
    }

    fetchNFTDropData()
  }, [nftDrop])

  const mintNFT = () => {
    if (!nftDrop || !address) return

    setLoading(true)

    const notification = toast.loading('Minting...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    })

    nftDrop
      ?.claimTo(address, qty)
      .then((transactionData) => {
        const receipt = transactionData[0].receipt
        const claimedTokenId = transactionData[0].id
        const claimedNFT = transactionData[0].data().then((result) => {
          alert(
            `Receipt from: ${receipt.from}, receipt to: ${receipt.to}, tokenId: ${claimedTokenId}, NFT: ${claimedNFT}`
          )
        })

        toast('HOORAY... You successfully minted an NFT!', {
          duration: 8000,
          style: {
            background: 'green',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '15px',
            padding: '20px',
          },
        })
      })
      .catch((err) => {
        console.log(err)
        toast('Whoops... Something went wrong...', {
          duration: 8000,
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '15px',
            textAlign: 'center',
            padding: '20px 40px',
          },
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      <Toaster position="top-center" />
      {/* LEFT */}

      <div className="bg-gradient-to-b from-zinc-600 to-zinc-900 lg:col-span-4 lg:bg-gradient-to-r">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen ">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src={urlFor(collection.previewImage).url()}
              alt="monkey"
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300 ">{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 flex-col bg-white p-12 lg:col-span-6 ">
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <Link href={'/'}>
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              <span className="font-extrabold underline decoration-pink-600/50">
                Luka's
              </span>{' '}
              NFT Market Place
            </h1>
          </Link>
          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? 'Sign Out' : 'Sign In'}
          </button>
        </header>

        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-rose-400 ">
            You're logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}

        {/* CONTENT */}

        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src={urlFor(collection.mainImage).url()}
            alt="nfts"
          />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          {loading ? (
            <p className="animate-pulse pt-2 text-xl text-indigo-700">
              Loading supply count...
            </p>
          ) : (
            <p className="pt-2 text-xl text-green-500 lg:py-10">
              {claimedSupply} / {totalSupply?.toString()} NFT's claimed
            </p>
          )}

          {loading && (
            <img
              className="h-20 w-20 rounded-full bg-transparent object-contain"
              src="/eth.gif"
              alt="loader"
            />
          )}
        </div>

        {/* BUTTON */}
        <div className="mx-auto my-5 text-center">
          <p className="my-5 text-green-500">
            Number of NFTs you would like to Mint:
          </p>
          <div className="flex items-center justify-center">
            <button
              className="mr-2 rounded-full bg-rose-400/40 py-3 px-5"
              onClick={quantityMinusHandler}
            >
              -
            </button>
            <p className="rounded-2xl bg-gray-400/40 py-3 px-5">{qty}</p>
            <button
              className="ml-2 rounded-full bg-green-400/40 py-3 px-5"
              onClick={quantityPlusHandler}
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={mintNFT}
          disabled={
            loading || claimedSupply === totalSupply?.toNumber() || !address
          }
          className="mt-10 h-16 w-full rounded-full bg-red-600 font-bold text-white disabled:bg-gray-400"
        >
          {loading ? (
            <>Loading</>
          ) : claimedSupply === totalSupply?.toNumber() ? (
            <>SOLD OUT</>
          ) : !address ? (
            <>Sign in to MINT</>
          ) : (
            <span>MINT NFT ({priceInEth} ETH)</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator -> {
      _id,
      name,
      address,
      slug {
        current
      }
    }
  }`

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}
