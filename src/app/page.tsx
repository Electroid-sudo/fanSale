'use client';

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TicketResponse } from "../interface/ticket";

export default function Home() {
  const [data, setData] = useState<TicketResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/get-ticket');
        const data = await response.data;
        setData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleImageClick = (id: string) => {
    router.push(`/tickets/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Events</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Events</h1>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((event) => (
          <div
            key={event._id}
            className="relative bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleImageClick(event._id)}
          >
            <Image
              src={event.picture}
              alt={event.title}
              width={300}
              height={200} // Provide explicit height
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.stadiumName}</p>
              <p className="text-sm text-gray-600">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
