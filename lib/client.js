import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "und3zkof",
  dataset: "production",
  apiVersion: "2002-04-23",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const bulder = imageUrlBuilder(client);
export const urlFor = (source) => bulder.image(source);
