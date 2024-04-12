

import { createClient } from "next-sanity";
import ClientConfig  from "./config/client-config";
export default createClient({
  ...ClientConfig,
  token: process.env.SANITY_SECRETE_TOKEN || "",
}); 