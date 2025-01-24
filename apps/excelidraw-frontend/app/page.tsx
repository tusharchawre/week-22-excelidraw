"use client"
import { useUser } from '@/hooks/useUser'
import React from 'react'

const page = () => {

  const user = useUser()



  return (
    <div className='text-red-500'>
      {JSON.stringify(user)}
    </div>
  )
}

export default page