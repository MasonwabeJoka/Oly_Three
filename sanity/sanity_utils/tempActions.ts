"use server"
import 'server-only'
import { client} from '../../lib/client';
import { categoriesArray  } from "../../utils/categoriesArray";
import { Category } from '../../sanity/Types/Category';
import { PortableTextBlock } from "sanity";

type PhotoSrc = {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
};

type Photo = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PhotoSrc;
  liked: boolean;
  alt: string;
};


export const fetchListings = async  (): Promise<Photo[]>=> {
    const perPage = 16;
    const currentPage = 1;
    const apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    const apiKey = process.env.PEXELS_API_KEY;
  
    if (!apiKey) {
      console.error("API key is undefined");
      return []; // Return an empty array or handle the error as needed
    }
  
    try {
      const response = await fetch(apiURL, {
        headers: { Authorization: apiKey },
      });
      const data = await response.json();
      return data.photos || [];
    } catch (error) {
      console.error("Error fetching listings:", error);
      return []; // Return an empty array or handle the error as needed
    }
  };
  




/////////////////////////////////////////////////////////////////////////////////

// Assuming the 'client' variable is of a specific type, adjust as needed
interface SanityClient {
  assets: {
    upload(type: string, blob: Blob, options: { filename: string }): Promise<Asset>;
  };
  create(document: any): Promise<void>;
}



// Asset type for the response from client.assets.upload
interface Asset {
  _id: string;
}

interface ImageReference {
  _type: 'image';
  asset: {
    _type: 'reference';
    _ref: string;
  };
  alt: string;
}

const uploadImageToSanity = async (
  imageUrl: string,
  altText: string,
  fileName: string
): Promise<ImageReference> => {
  try {
    // Fetch the image from the URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from ${imageUrl}`);
    }

    // Convert the response to a blob
    const blob = await response.blob();
    if (!blob) {
      throw new Error('Failed to convert response to blob');
    }

    // Upload the blob to Sanity
    const asset = await client.assets.upload('image', blob, {
      filename: fileName,
    });

    // Check if asset is returned correctly
    if (!asset || !asset._id) {
      throw new Error(`Failed to upload image to Sanity, asset or asset._id missing`);
    }

    console.log(`Image uploaded successfully, asset ID: ${asset._id}`);

    // Return the image reference
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    };
  } catch (error) {
    console.error(`Error in uploadImageToSanity: ${error.message}`);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


export const addAdsDataToSanity = async (data: Photo[]) => {
  try {
    await Promise.all(data.map(async (photo, index) => {
      const imageUploadPromise = uploadImageToSanity(photo.src.large, photo.alt, `photo-${photo.alt}`);

      const imageObject = await imageUploadPromise;

         // Add a unique _key to each imageObject
      const imageWithKey = {
        ...imageObject,
        _key: `image-${index}` // Unique key for each image
      };

      await client.create({
        _type: 'ad',
        images: [imageWithKey],  
        title: "Lorem ipsum dolor sit amet...",
        description: "Lorem ipsum dolor sit amet...",
        price: 98550,
        // ...other data
      });

  
    }));

    console.log('All documents added');
  } catch (error) {
    console.error('Error adding documents', error);
  }
};

const fetchAndAddListings = async () => {
  const listings: Photo[] = await fetchListings();
  const addedListings = await addAdsDataToSanity(listings);
};

// fetchAndAddListings();
////////////////////////////////////////////////////////////////////////////////////


interface CategoryData {
  category: string;
  parentCategory?: string | undefined;  // Allow for undefined
  childrenCategories: string[];
  order: number;
  nickName: string;
  mainCategory: string;
  breadCrumbs: string[];
  seoTitle: PortableTextBlock[];``
  seoDescription: PortableTextBlock[];
}

interface CreatedCategory {
  categoryName: string;
  id: string;
}



/**
 * Finds the category ID by name from an array of created categories.
 *
 * categories - The array of created categories.
 *  name - The name of the category to search for.
 * @return {string | ""} The ID of the category if found, otherwise an empty string.
 */
const findCategoryIdByName = (categories: CreatedCategory[], name: string | undefined): string | "" => {
  if (!name) return "";
  const category = categories.find(cat => cat.categoryName === name);
  return category ? category.id : "";
};
// Function to create a category in Sanity
async function createCategory(categoryData: CategoryData): Promise<CreatedCategory> {
  const newCategory = {
    _type: 'category',
    slug: {
      _type: 'slug',
      current: generateSlug(categoryData.category),
  },
    title: categoryData.category,
    parentCategory: categoryData.parentCategory,
    childrenCategories: categoryData.childrenCategories,
    order: categoryData.order,
    nickName: categoryData.nickName,
    mainCategory: categoryData.mainCategory,
    breadCrumbs: categoryData.breadCrumbs,
    seoTitle: categoryData.seoTitle,
    seoDescription: categoryData.seoDescription,
  };

  const created = await client.create(newCategory);
  return { categoryName: created.title, id: created._id };
}

// Function to iterate over the categories array and create each category
const createInitialCategories = async (categories: CategoryData[]): Promise<CreatedCategory[]> => {
  const createdCategories: CreatedCategory[] = [];

  for (const categoryData of categories) {
    try {
      const createdCategory = await createCategory(categoryData);
      createdCategories.push({ categoryName: categoryData.category, id: createdCategory.id });
    } catch (error) {
      console.error(`Failed to create category: ${categoryData.category}`, error);
    }
  }

  return createdCategories;
};

// Function to find a category ID by its name
const updateCategoryReferences = async (categoriesArray: CategoryData[], createdCategories: CreatedCategory[]): Promise<void> => {
  for (const categoryData of categoriesArray) {
    // Find the ID of the parent category only if it exists
    const parentCategoryId = categoryData.parentCategory ? findCategoryIdByName(createdCategories, categoryData.parentCategory) : undefined;

    // Convert the children categories from names to references
    const childrenCategoryRefs = categoryData.childrenCategories
      .map(name => findCategoryIdByName(createdCategories, name))
      .filter(id => id !== "")
      .map(id => ({ _type: 'reference', _ref: id, _key: `childCat-${id}` }));

    const slug = generateSlug(categoryData.category, categoryData.parentCategory);

    const updates: any = {
      slug: { _type: 'slug', current: slug },
      nickName: categoryData.nickName,
      mainCategory: categoryData.mainCategory,
      breadCrumbs: categoryData.breadCrumbs,
      childrenCategories: childrenCategoryRefs,
    };

    // Only add parentCategory if it exists and has a valid ID
    if (parentCategoryId) {
      updates.parentCategory = { _type: 'reference', _ref: parentCategoryId };
    }

    try {
      const categoryId = findCategoryIdByName(createdCategories, categoryData.category);
      if (categoryId) {
        await client.patch(categoryId).set(updates).commit();
      }
    } catch (error) {
      console.error(`Update category failed: ${categoryData.category}`, error);
    }
  }
};



// Function to generate a slug
function generateSlug(categoryName: string, parentCategoryName?: string): string {
  const formattedCategoryName = categoryName
    .toLowerCase()
    .replace(/\s+/g, '-')      
    .replace(/[^a-z0-9\-]/g, '')
    .slice(0, 200);

  if (parentCategoryName) {
    const formattedParentCategoryName = parentCategoryName
      .toLowerCase()
      .replace(/\s+/g, '-')      
      .replace(/[^a-z0-9\-]/g, '');

    return `${formattedParentCategoryName}-${formattedCategoryName}`;
  }

  return formattedCategoryName;
}

// //Main execution block
// let hasRun = false;

// (async () => {
//   if (hasRun) {
//     console.log("The script has already run. Refresh the page to run it again.");
//     return;
//   }

//   try {
//     const createdCategories = await createInitialCategories(categoriesArray);
//     await updateCategoryReferences(categoriesArray, createdCategories);
//     console.log('Categories created and updated successfully');
//     hasRun = true;
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// })();















