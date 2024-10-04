"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios, { axiosGet, axiosPost } from '@/lib/axios';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the token from the URL
  const token = searchParams?.get('token');


  // Submit handler
  const onSubmit = async () => {
    console.log("limon")
    try {
      const result :any   = await axiosGet(`/users/verify-email?token=${token}`); 
      toast.success(result.message)
      router.push("/signin")
      toast.success("verify successsfully")
    } catch (error) {
      toast.error("something went wrong")
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-[500px]">
        <button
          onClick={onSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Verify Account
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
