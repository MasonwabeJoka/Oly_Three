import { NextApiRequest, NextApiResponse } from 'next';
import { createAd } from '@/sanityTemp/actions/createAd';

export default async function createdAd(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const adData = req.body;
      const result = await createAd(adData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
