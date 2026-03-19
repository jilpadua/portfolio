import imageUrlBuilder from '@sanity/image-url';
import client from '@/src/lib/sanityClient';

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source);
