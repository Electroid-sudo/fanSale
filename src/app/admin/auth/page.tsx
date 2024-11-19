'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";
import { FileUpload } from '@/types/image.type';
import { useRouter } from 'next/navigation';
import { TicketResponse } from '../../../interface/ticket';



const TicketForm = () => {
  const [images, setImages] = useState<FileUpload[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<TicketResponse>()
const router = useRouter()

const formik = useFormik({
  initialValues: {
    title: '',
    date: '',
    time: '',
    stadiumName: '',
    entrance: '',
    row: '',
    seat: '',
    price: '',
    link: '',
  },
  validationSchema: Yup.object({
    title: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    time: Yup.string().required('Required'),
    stadiumName: Yup.string().required('Required'),
    entrance: Yup.string(),
    row: Yup.string(),
    seat: Yup.string(),
    price: Yup.number().required('Required').positive('Must be a positive number'),
    link: Yup.string().url('Invalid URL').required('Required'),
  }),
  onSubmit: async (values) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const formData = {
        ...values,
        picture: images.length > 0 ? images[0].url : null,
      };

      const response = await axios.post('/api/ticket', formData);
      setData(response.data);
   
   
      if (response.status === 201) {
        
        router.push(`/tickets/${response.data?._id}`)
      } else {
        setError('Form submission failed');
      }
    } catch (error) {
      setError('Error submitting form');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  },
});


  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#002c52]">Ticket Information</h2>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Button */}
          <div className="md:col-span-2">
          <UploadButton<OurFileRouter, 'imageUploader'>
  endpoint="imageUploader"
  onClientUploadComplete={(res:any) => {
    if (res) {
      setImages(res);
    }
  }}
  onUploadError={(error: Error) => {
    alert(`ERROR! ${error.message}`);
  }}
/>

          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-1">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
            {formik.touched.date && formik.errors.date && (
              <p className="text-red-500 text-sm">{formik.errors.date}</p>
            )}
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="block text-gray-700 font-medium mb-1">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.time}
            />
            {formik.touched.time && formik.errors.time && (
              <p className="text-red-500 text-sm">{formik.errors.time}</p>
            )}
          </div>

          {/* Stadium Name */}
          <div>
            <label htmlFor="stadiumName" className="block text-gray-700 font-medium mb-1">Stadium Name</label>
            <input
              id="stadiumName"
              name="stadiumName"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stadiumName}
            />
            {formik.touched.stadiumName && formik.errors.stadiumName && (
              <p className="text-red-500 text-sm">{formik.errors.stadiumName}</p>
            )}
          </div>

          {/* Entrance */}
          <div>
            <label htmlFor="entrance" className="block text-gray-700 font-medium mb-1">Entrance</label>
            <input
              id="entrance"
              name="entrance"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.entrance}
            />
          </div>

          {/* Row */}
          <div>
            <label htmlFor="row" className="block text-gray-700 font-medium mb-1">Row</label>
            <input
              id="row"
              name="row"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.row}
            />
          </div>

          {/* Seat */}
          <div>
            <label htmlFor="seat" className="block text-gray-700 font-medium mb-1">Seat</label>
            <input
              id="seat"
              name="seat"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.seat}
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>

          {/* Link */}
          <div>
            <label htmlFor="link" className="block text-gray-700 font-medium mb-1">Link</label>
            <input
              id="link"
              name="link"
              type="url"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.link}
            />
            {formik.touched.link && formik.errors.link && (
              <p className="text-red-500 text-sm">{formik.errors.link}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#002c52] text-white py-2 px-4 rounded-lg w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
