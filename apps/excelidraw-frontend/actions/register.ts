"use server"
import { RegisterSchema } from "@repo/common/types"
import { redirect } from "next/navigation"
import {z} from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    })

    if (res.status === 200) {
        return res.json()
    }

    throw new Error("Something went wrong")
}