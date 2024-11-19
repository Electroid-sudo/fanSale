import mongoose, { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  picture: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  stadiumName: { type: String, required: true },
  entrance: { type: String, required: false },
  row: { type: String, required: false },
  seat: { type: String, required: false },
  time: { type: String, required: true },
  price: { type: Number, required: true },
  link: { type: String, required: true },
}, { timestamps: true });

const TicketModel = mongoose.models.Ticket || model('Ticket', ticketSchema);
export default TicketModel