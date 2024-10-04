
import React from 'react'
import SearchPage from '@/pages/github-users-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'users',
  description: '...',
}

const page = () => {
  return (
    <SearchPage/>
  )
}

export default page