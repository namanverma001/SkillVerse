import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  user: {
    name?: string
    email?: string
    avatar?: string
  } | null
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export default function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  }

  const getInitials = () => {
    if (!user?.name) return "U"
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage
        src={user?.avatar || `/placeholder.svg?height=${size === "lg" ? 200 : 100}&width=${size === "lg" ? 200 : 100}`}
        alt={user?.name || "User"}
      />
      <AvatarFallback className="bg-primary/20 text-primary">{getInitials()}</AvatarFallback>
    </Avatar>
  )
}

