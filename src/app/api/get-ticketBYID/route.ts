import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongoDB';
import Ticket from '@/models/ticket.model';
import { NextResponse } from 'next/server';

export  async function GET(
  request: Request,
  
) {
 
  try {
    await connectToDatabase();
    const tickets = await Ticket.find().exec();
    return new NextResponse(JSON.stringify(tickets), {status:200})
  } catch (error) {
    // return response.status(500).json({ message: 'Internal server error' });
  
    
  }
}