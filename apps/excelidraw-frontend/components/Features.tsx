import { Squares } from "@/components/ui/squares-background"

export function Features() {
  return (
    <div className="space-y-8 ">
      <div className="relative h-[140vh] opacity-40 rounded-lg overflow-hidden">
        <Squares 
          squareSize={40}
          borderColor="#333" 
          hoverFillColor="#222"
        />
      </div>
    </div>
  )
}
