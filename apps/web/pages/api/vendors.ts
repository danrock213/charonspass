// /pages/api/vendors.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { vendors } from '@/data/vendors';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const vendor = { ...req.body, id: Date.now().toString() };
    vendors.push(vendor);
    res.status(201).json({ success: true, vendorId: vendor.id });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
