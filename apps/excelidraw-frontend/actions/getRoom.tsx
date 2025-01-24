export const getRoom = async (roomName : string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/room/${roomName}`, {
        method: "GET"
    })

    if (res.status === 200) {
        const data = await res.json()
        return data.room
    }

    throw new Error("Something went wrong")
}