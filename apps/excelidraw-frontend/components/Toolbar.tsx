import { Circle, Eraser, HandIcon, Pencil, RectangleHorizontalIcon, Slash } from "lucide-react"
import { ToolButton } from "./ToolButton"
import { Tool } from "@/canvas/Canvas"
import { ReactNode } from "react"
import { Separator } from "./ui/separator"

interface ToolbarProps{
    activeTool : Tool
    setActiveTool: (s: Tool) => void
}

export const Toolbar = ({activeTool, setActiveTool}: ToolbarProps) => {

    const Tool : {tool: Tool, icon: ReactNode , shortcut: number}[] = [{
        tool: "grab",
        icon: <HandIcon />,
        shortcut: 1
    },
    {
        tool: "rect",
        icon: <RectangleHorizontalIcon />,
        shortcut: 2
    },
    {
        tool: "ellipse",
        icon: <Circle />,
        shortcut: 3
    },
    {
        tool: "line",
        icon: <Slash />,
        shortcut: 4
    },
    {
        tool: "pencil",
        icon: <Pencil />,
        shortcut: 5
    },
    {
        tool: "erase",
        icon: <Eraser />,
        shortcut: 6
    }

]



    return(
        <div className="w-fit h-16 py-2 px-4 fixed top-5 left-[50%] -translate-x-[50%]">
            <div className="flex bg-[#232329] px-4 py-1 rounded-md gap-3 h-full">
            {Tool.map((tool)=>
                { 
                    return (<><ToolButton active={activeTool === tool.tool} onClick={()=>setActiveTool(tool.tool)} icon={tool.icon} shortcut={tool.shortcut} tool={tool.tool} />

                    {tool.tool === "grab" ? (<Separator orientation="vertical" className="bg-white/20 mx-1" />): null}
                    
                    
                    </>)
                
                }
            )}
            </div>

            <p className="text-white/30 mt-1 absolute w-full mx-auto scale-[0.8] text-sm text-center">To zoom, use scroll or pinch!</p>
            
        </div>
    )
}