// pages/api/store-api-key.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { apiKey } = req.body;

    // Store the API key securely (e.g., using environment variables or a secret manager)
    // For this example, we'll store it in a global variable, which is NOT recommended for production use
    global.OPENAI_API_KEY = apiKey;

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
