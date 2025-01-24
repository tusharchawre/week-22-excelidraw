"use client"
import { useForm } from "react-hook-form"
import {z} from "zod"
import { CreateRoomSchema, LoginSchema, RegisterSchema} from "@repo/common/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useState, useTransition } from "react"

import { useRouter } from "next/navigation"





export function CreateRoomForm() {

    const [error, setError] = useState("")


    const form = useForm<z.infer<typeof CreateRoomSchema>>({
        resolver: zodResolver(CreateRoomSchema),
        defaultValues: {
            roomName: ""
        }
    })


    const onSubmit = async (values: z.infer<typeof CreateRoomSchema>) => {
        setError("")




        const token = localStorage.getItem("token")

        const response = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/room` , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify(values)
        })

        if(!response.ok){
            throw new Error("Something went wrong!")
        }

        const responseData = await response.json()

        if(responseData.error){
            setError(responseData.error)
        }
        else{
            console.log(responseData)
        }
    }


    



  return (
    <Card className="w-full max-w-md">
        <CardHeader>
            <CardTitle className="w-full text-center">
                Enter the room name
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField 
                    control={form.control} 
                    name="roomName"
                    render = {({field})=>(
                        <FormItem>
                            <FormLabel>Room Name</FormLabel>
                            <FormControl>
                                <Input  placeholder="Enter Room Name" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            {error != "" && <FormMessage>{error}</FormMessage>}
                            <FormDescription>
                                This is your public display room name.
                            </FormDescription>

                        </FormItem>
                    )}
                    />

                    {/* TODO: Auto-gen button for roomNames */}

                <Button type="submit"  className="w-full mt-4">
                    Create Room
                </Button>
                </form>

            </Form>
        </CardContent>
    </Card>
  )
}

