"use client"

import Link from "next/link"
import { useUser } from "@/hooks/useUser"
import { Button } from "@/components/ui/button"



const Dashboard = () => {
  const { user, isLoading, error } = useUser()




  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-xl text-gray-800 mb-6">{error.toString()}</p>
        <Link href="/" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
          Go Back Home
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-800">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">User Not Found</h1>
        <p className="text-xl text-gray-600 mb-6">
          We couldn't find your user information. Please try logging in again.
        </p>
        <Link href="/login" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
          Log In
        </Link>
      </div>
    )
  }

 


  const room = user.user.room || [];

  if (room.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-800">Rooms Not Found</div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-white">
      <main className="p-8">
        <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-black">Your Rooms</h1>
        <Link href="/create-room">
            <Button>Create Room</Button>
        </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {room.map((r) => (
            <a href={`/room/${r.roomName}`} key={r.id}>
              <div className="border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-2 text-black">{r.roomName}</h2>
                <p className="text-gray-600">Room ID: {r.id}</p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
