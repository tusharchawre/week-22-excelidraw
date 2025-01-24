import { getRoom } from "@/actions/getRoom"
import { RoomCanvas } from "@/canvas/RoomCanvas"
import { Toolbar } from "@/components/Toolbar"


const page = async ({params}: {
    params : {
        roomName :string
    }
}) => {

    const roomName = (await params).roomName

    const room = await getRoom(roomName)

    if(!room){
        return <p>The room Doesnt exist</p>
    }

  return (

        <RoomCanvas roomId={room.id} room={room} />

  )
}

export default page