"use client"
import { Features } from '@/components/Features'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { useUser } from '@/hooks/useUser'
import React from 'react'

const page = () => {


  return (
      <>
      <Navbar />
      <Hero />
      <div className="w-full h-screen ">
        <Features />

      </div>
      </>
  )
}

export default page