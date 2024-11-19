export interface Ticket {
    picture: string; // Store as URL or file path
    date: string;
    stadiumName: string;
    entrance: string;
    row: string;
    seat: string;
    price: number;
    link: string;
    title:string

  }
  
export interface TicketResponse {
    picture: string; // Store as URL or file path
    date: string;
    stadiumName: string;
    entrance: string;
    row: string;
    seat: string;
    price: number;
    link: string;
    title:string
    time:string;
    _id:string

  }
  