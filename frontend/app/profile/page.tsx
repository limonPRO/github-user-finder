import React from 'react'
import ProfilePage from '@/pages/profile-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'profile',
  description: '...',
}


const page = () => {
  return (
    <ProfilePage/>
  )
}

export default page
