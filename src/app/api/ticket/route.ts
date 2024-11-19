
import connectionToDataBase from "@/lib/mongoDB";
import TicketModel from "@/models/ticket.model";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectionToDataBase();


    // Parse the incoming JSON payload
    const payload = await request.json();


    // Validate the payload
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ success: false, message: 'Invalid request payload' }, { status: 400 });
    }

    // Extract required fields from payload
    const requiredFields = ['date', 'stadiumName', 'entrance', 'row', 'seat', 'price', 'link', 'picture', 'time'] ;
    const missingFields = requiredFields.filter(field => !payload[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({ success: false, message: 'Missing required fields', missingFields }, { status: 400 });
    }


    // Create new ticket
    const newTicket = new TicketModel(payload);


    // Validate the ticket data
    const errors = newTicket.validateSync();
    if (errors) {
      return NextResponse.json({ success: false, message: 'Invalid ticket data', errors }, { status: 400 });
    }

    // Save the ticket to the database
    await newTicket.save();

    // Return a success response with the newly created ticket
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error:any) {
    console.error("Error occurred while creating the ticket:", error);

    // Return an error response if something goes wrong
    return NextResponse.json(
      { success: false, message: "Failed to create ticket", error: error.message },
      { status: 500 }
    );
  }
}