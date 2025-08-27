
import { client } from "@/sanity/lib/client";
import { tempListing } from "@/sanity/lib/crud/temp/queries";

const Test = async () => {

const listing = await client.fetch(tempListing)
console.log(JSON.stringify(listing, null, 2))
  return (
    <div>
  
    </div>
  )
}

export default Test
