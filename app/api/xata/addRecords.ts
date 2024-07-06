import { getXataClient} from "@/lib/xata.codegen";

const xata = getXataClient();


export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
      try {
        const data = req.body;
        const record = await xata.db.Vehicles.create(data);
        res.status(200).json(record);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }

