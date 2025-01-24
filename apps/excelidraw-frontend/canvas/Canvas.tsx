"use client"

import { Scale } from "@/components/Scale."
import { Sidebar } from "@/components/Sidebar"
import { Toolbar } from "@/components/Toolbar"
import { Game } from "@/render/Game"
import { useEffect, useRef, useState } from "react"

interface CanvasProps {
    roomId: string
    socket: WebSocket
    room: any
}

export type Tool = "rect" | "ellipse" | "grab" | "line" | "pencil" | "erase"

export type strokeWidth = 1 | 2 | 4

export type strokeFill = "rgba(211, 211, 211)" | "rgba(242, 154, 158)" | "rgba(77, 161, 83)" | "rgba(98, 177, 247)" | "rgba(183, 98, 42)"

export type bgFill = "rgba(0, 0, 0, 0)" | "rgba(89, 49, 49)" | "rgba(23, 61, 16)" | "rgba(30, 70, 101)" | "rgba(49, 37, 7)"



export const Canvas = ({roomId, socket , room}: CanvasProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [game, setGame] = useState<Game>()
    const [scale, setScale] = useState<number>(1)
    const [activeTool, setActiveTool] = useState<Tool>("grab")
    const [strokeFill, setStrokeFill] = useState<strokeFill>("rgba(211, 211, 211)")
    const [strokeWidth, setStrokeWidth] = useState<strokeWidth>(1)
    const [bgFill, setBgFill] = useState<bgFill>("rgba(0, 0, 0, 0)")

    useEffect(()=>{
        game?.setTool(activeTool)
        game?.setStrokeWidth(strokeWidth)
        game?.setStrokeFill(strokeFill)
        game?.setBgFill(bgFill)
    })

    useEffect(()=>{
        if(canvasRef.current){
            const g = new Game(
                canvasRef.current , 
                roomId, 
                socket , 
                room,
                (newScale) => setScale(newScale)
            )
            setGame(g)


            return () =>{
                g.destroy()
            }
        }

    }, [canvasRef])


    useEffect(()=>{
        setScale(game?.outputScale || 1)
    }, [game?.outputScale])


    


    return(
        <div className="w-full h-screen">

        <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
        <Sidebar activeTool={activeTool} 
        strokeFill={strokeFill} 
        setStrokeFill={setStrokeFill} 
        strokeWidth={strokeWidth} 
        setStrokeWidth={setStrokeWidth} 
        bgFill={bgFill} 
        setBgFill={setBgFill} />
        <Scale scale={scale} />
            <canvas ref={canvasRef} />

        </div>
    )
}