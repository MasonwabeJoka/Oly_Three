import  createClient  from '@sanity/client';
import ClientConfig from "@/sanity/config/client-config"
import { Auction } from './../types/auction';

const client = createClient(ClientConfig);
export const getAuctionById = async (id: string): Promise<Auction | null> => {
  const query = `*[_type == "auction" && _id == $id][0]`;
  const params = { id };
  
  const auction = await client.fetch(query, params) as Auction | null;
  return auction;
};
export const getAllAuctions = async (): Promise<Auction[]> => {
    const query = `*[_type == "auction"]`;
    const auctions = await client.fetch(query) as Auction[];
    return auctions;
  };
export const createAuction = async (auction: Omit<Auction, 'id'>) => {
    return client.create({
      _type: 'auction',
      ...auction,
    });
  };

  export const updateAuction = async (id: string, updates: Partial<Auction>) => {
    return client.patch(id).set(updates).commit();
  };

  export const deleteAuction = async (id: string) => {
    return client.delete(id);
  };
  
  