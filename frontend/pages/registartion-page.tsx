"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { axiosPost } from '@/lib/axios';
import toast from 'react-hot-toast';

// Zod schema for form validation
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  firstName: z.string().min(1, 'Given name is required'),
  lastName: z.string().min(1, 'Family name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'], 
});

type FormData = z.infer<typeof schema>;

const SignUpPage = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result : any = await axiosPost('/users/register', data); 
      toast.success(result.message)
      reset()
    } catch (error) {
      toast.error("something went wrong")
    }
  };
  // console.log

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-[500px]">
        <h2 className="text-lg font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              {...register('firstName')}
              className={`w-full border rounded p-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              {...register('lastName')}
              className={`w-full border rounded p-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              className={`w-full border rounded p-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
      
     
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Sign Up
          </button>
          <button
            type="button"
            className="w-full mt-2 bg-gray-200 text-gray-700 p-2 rounded"
            onClick={() => {
              // Add your Google Sign-Up logic here
              console.log('Google Sign-Up clicked');
            }}
          >
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
