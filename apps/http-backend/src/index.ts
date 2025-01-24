import { prismaClient } from "@repo/db/client";
import express from "express"
import {RegisterSchema, LoginSchema, CreateRoomSchema} from "@repo/common/types"
import brcypt from "bcryptjs"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import cors from "cors"
import { middleware } from "./middleware";

const app = express()

app.use(express.json())
app.use(cors())



app.post("/signup", async (req, res)=> {
    const validatedFields = RegisterSchema.safeParse(req.body)

    if(!validatedFields.success){
        res.json({
            error: "Invalid Fields"
        })
        return;
    }

    const {username, email, password} = validatedFields.data

    const hashedPassword = await brcypt.hash(password , 10)

    const existingUser = await prismaClient.user.findUnique({
        where:{
            email
        }
    })

    if(existingUser){
        res.json({
            error: "User Already Exists!"
        })
        return;
    }

    const user = await prismaClient.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })


    res.json({
        user
    })
})

app.post("/signin", async (req,res)=> {
    const validatedFields = LoginSchema.safeParse(req.body)

    if(!validatedFields || !validatedFields.success || !validatedFields.data.password){
        res.json({
            error: "Invalid Fields!"
        })
        return;
    }

    const {email, password} = validatedFields.data

    const user  = await prismaClient.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        res.json({
            error: "User does not exist!"
        })
        return;
    }

    const matchPassword  = await brcypt.compare(password , user.password)

    if(!matchPassword){
        res.json({
            error: "Invalid Credentials!"
        })
        return;
    }

    const token = jwt.sign({userId : user.id} , process.env.JWT_SECRET! || "123123")

    res.json({
        token
    })

})


app.post("/room", middleware , async (req, res)=> {
    const validRoom = CreateRoomSchema.safeParse(req.body)

    if(!validRoom.success){
        res.json({
            error: "Invalid Room Name"
        })
        return;
    }

    const userId = req.userId

    if(!userId){
        res.json({
            error: "User doesn't exist!"
        })
        return;
    }


    const { roomName } = validRoom.data

    const existingRoom = await prismaClient.room.findFirst({
        where: {
            roomName
        }
    })

    if(existingRoom){
        res.json({
            error: "Room already exists!"
        })
        return;
    }



    const room = await prismaClient.room.create({
        data: {
            roomName,
            userId
        }
    })

    res.json({
        room
    })
})

app.get("/room/:roomName", async (req, res)=> {
    const roomName = req.params.roomName

    const room = await prismaClient.room.findFirst({
        where:{
            roomName
        },
        include: {
            shape: true
        }
    })

    res.json({
        room
    })

})

app.get("/user", middleware , async (req, res)=>{
    const userId = req.userId

    const user = await prismaClient.user.findUnique({
        where:{
            id: userId
        },
        select:{
            username: true,
            id: true,
            email: true,
            room: true,
            shapes: true
        }
    })

    res.json({
        user
    })
})




app.listen(3001, ()=>{
    console.log("Listening")
})

