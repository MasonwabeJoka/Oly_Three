import { defineQuery } from "next-sanity";
import { client } from "@/server/sanity/lib/client";

const userQuery = defineQuery(`*[_type == "user"] {
  _id,
  email,
  firstName,
  lastName,
  fullName,
  "profileImage": profileImage.asset->url
}`);

export const getSanityUsers = async () => {
  try {
    return await client.fetch(userQuery);
  } catch (error) {
    console.error("Error fetching sanity users:", error);
    throw error;
  }
};
