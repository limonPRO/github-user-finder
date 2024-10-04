

import VerifyEmail from '@/pages/verify-email-page'
import React from 'react'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'verify email',
  description: '...',
}
const page = () => {
  return (
    <VerifyEmail/>
  )
}

export default page