import { defineQuery } from "next-sanity"
import { client } from "../../client"
// Query 

const userQuery = defineQuery(`*[_type == "user"] {
  _id,
  email,
  firstName,
  lastName,
  fullName,
  "profileImage": profileImage.asset->url
}`)

// Read 

export const getUser = async () => {
  try {
    const user = await client.fetch(userQuery)
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}