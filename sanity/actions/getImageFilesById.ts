import  createClient  from '@sanity/client';
import ClientConfig from "../config/client-config"
import { groq } from "next-sanity"
import { ImageFile } from '../Types/ImageFile';

const client = createClient(ClientConfig);

export async function getImageFilesById(ids: string[]): Promise<ImageFile[]> {


  const query = groq`*[_type == "imageFile" && _id in $ids] {
  _id,
    image {
      "url": asset->url,
      "aspectRatio": asset->metadata.dimensions.aspectRatio,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      alt,
    }
  }`;
  
  const params = { ids };
  
  const imageFiles = await client.fetch(query, params);

  return imageFiles;
}
