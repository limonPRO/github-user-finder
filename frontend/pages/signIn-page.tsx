"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Mutation, useMutation } from '@tanstack/react-query';
import axios, { axiosPost } from '@/lib/axios';
import axiosInstance from '@/lib/axios';
import { signIn } from 'next-auth/react';
import { addToLocalStorage } from '@/lib/utils';

// Zod schema for form validation
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type FormData = z.infer<typeof schema>;

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result :any   = await axiosPost('/users/login', data); 
      
      if(result.success){
      addToLocalStorage('token', result?.token as string)
       console.log(result)
       addToLocalStorage('user', result.data)
      }

      router.push('/profile');
    } catch (error) {
      
      console.error('Error signing up:', error);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-[500px]">
        <h2 className="text-lg font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className={`w-full border rounded p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register('password')}
              className={`w-full border rounded p-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Sign In
          </button>
          <button
            type="button"
            className="w-full mt-2 bg-gray-200 text-gray-700 p-2 rounded"
            onClick={() => {
              // Add your Google Sign-In logic here
              console.log('Google Sign-In clicked');
            }}
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
