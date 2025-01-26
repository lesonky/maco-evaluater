import { RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface RestartButtonProps {
  onClick: () => void
}

export function RestartButton({ onClick }: RestartButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" onClick={onClick} className="ml-2">
          <RefreshCcw className="h-4 w-4" />
          <span className="sr-only">Restart Conversation</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={5}>Restart Conversation</TooltipContent>
    </Tooltip>
  )
}

