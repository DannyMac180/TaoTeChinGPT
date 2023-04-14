// pages/api/store-api-key.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { setApiKey } from '../../utils/apiKeyStore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { apiKey } = req.body;

    setApiKey(apiKey);

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
