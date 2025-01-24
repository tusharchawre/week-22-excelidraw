import {z} from "zod"

export const RegisterSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required"
    })
    .max(20, {
        message: "Username exceeds 20 characters!"
    }),

    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(6, {message: "Password must exceed 6 characters!"})
})


export const LoginSchema = z.object({
    email : z.string().email(),
    password: z.string()
})


export const CreateRoomSchema = z.object({
    roomName : z.string().min(1 , {
        message: "RoomName is required!"
    })
})