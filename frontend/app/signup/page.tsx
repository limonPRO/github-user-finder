
import React from 'react'
import SignUpPage from '@/pages/registartion-page'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'sign up',
  description: '...',
}


const page = () => {
  return (
    <SignUpPage/>
  )
}

export default page