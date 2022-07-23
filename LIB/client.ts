import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'z3lfupp1',
    dataset: 'production',
    apiVersion: '2022-07-23',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder: any = imageUrlBuilder(client);

export const urlFor = (source : any) => builder.image(source)