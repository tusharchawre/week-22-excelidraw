"use client"
import { Features } from '@/components/Features'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { useUser } from '@/hooks/useUser'
import React from 'react'

const page = () => {


  return (
      <>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
      </>
  )
}

export default page