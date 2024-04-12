// import { createClient} from "@sanity/client"
 import { createClient, groq} from "next-sanity"
import { Project } from "../Types/Project"
import { Ad } from "../Types/Ad"
import { Category } from "../Types/Category";
import ClientConfig from "../config/client-config"


export const getProjects = async(): Promise<Project[]> => { // Promise<Project[]> means getProjects return a promise with an array of Project types

    const projects = await createClient(ClientConfig).fetch(
        groq`*[_type == "project"] {
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "image": image.asset->url,
            url,
            content

        }`
    )       

    return projects

}   

export async function fetchAds(): Promise<Ad[]> {
  
    const ads = await createClient(ClientConfig).fetch(groq`*[_type == "ad"]{
      ...,
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "suburb": location->location.suburb,
      "city": location->city,
      images[]{
        _key,
        "url": asset->url,
        "aspectRation": metadata.dimensions.aspectRatio,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height,
        asset->{
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
        alt
      },
      postedOn,
    }`
   
    );
 
    return ads
    
    ;
  }

  export const fetchAd = async (slug: string): Promise<Ad> => {
 
    const ad = await createClient(ClientConfig).fetch(groq`*[_type == "ad" && slug.current == $slug][0]{
      ...,
      "slug": slug.current,
      "suburb": location -> location.suburb,
      "city": location -> city,
      images[]{
        _key,
        "url": asset->url,
        "aspectRatio": asset->metadata.dimensions.aspectRatio,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        alt,
        postedOn,
      }
    }`, {slug}) // {slug: slug}

    return ad
  }
  // export const fetchAd = async (slug: string): Promise<Ad> => {
 
  //   const ad = await createClient(ClientConfig).fetch(groq`*[_type == "ad" && slug.current == $slug][0]{
  //     ...,
  //     "slug": slug.current,
  //     "suburb": location -> location.suburb,
  //     "city": location -> city,
  //     images[]{
  //       asset->{
  //         url,
  //         metadata {
  //           dimensions {
  //             width,
  //             height,
  //             aspectRatio
  //           }
  //         }
  //       },
  //       alt
  //     }
  //   }`, {slug}) // {slug: slug}

  //   return ad
  // }



// To fetch top categories
  export const getTopCategories = async (fetch: string): Promise<Category> => {
    const category = await createClient(ClientConfig).fetch(
     groq`${fetch}`
    );
   
    return category;
  };

  // To fetch all categories of where order is 1 or 2
  export const getCategories = async (): Promise<Category> => {
    const categories = await createClient(ClientConfig).fetch(
     groq`*[_type == "category" && (order == 1 || order == 2)] {
      _id,
      title,
      "image": image.asset->url,
      "slug": slug.current,
      "subcategories": childrenCategories[]->title,
      "parentCategory": parentCategory->,
     }[0..9]`
    );

    return categories;
  };

  // To fetch product condition options
  export const getConditionOptions = async (): Promise<string[]> => {
    const conditions = await createClient(ClientConfig).fetch(
     groq `*[_type == "ad"] {
        "conditionOptions": condition[] {
          title,
        }
      }`
    );

    return conditions
  }


  