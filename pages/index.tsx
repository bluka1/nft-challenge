import type { GetServerSideProps, NextPage } from 'next'
import { sanityClient, urlFor } from '../sanity'
import Head from 'next/head'
import { Collection } from '../typings'
import Link from 'next/link'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="min-w-screen min-h-screen bg-zinc-800 py-10">
      <div className="min-h-90 mx-auto flex max-w-7xl flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-sky-500 to-yellow-400 py-20 px-10 lg:bg-gradient-to-r 2xl:px-0">
        <Head>
          <title>Luka's NFT DROP</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className="mb-10 text-4xl font-extralight">
          <span className="font-extrabold underline decoration-pink-600/50">
            Luka's
          </span>{' '}
          NFT Market Place
        </h1>

        <main className="bg-gradient-to-b from-sky-500 to-yellow-400 p-10 lg:bg-gradient-to-r ">
          <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {collections.map((collection) => (
              <Link href={`/nft/${collection.slug.current}`}>
                <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105">
                  <img
                    className="h-96 w-60 rounded-2xl object-cover"
                    src={urlFor(collection.mainImage).url()}
                    alt=""
                  />
                  <div className="p-5">
                    <h2 className="text-3xl">{collection.title}</h2>
                    <p className="mt-2 text-sm text-gray-400">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
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

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
