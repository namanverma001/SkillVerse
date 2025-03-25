"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem("eduAid_user")
    localStorage.removeItem("eduAid_token")

    // Redirect to home page
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }, [router])

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
        <h1 className="text-2xl font-bold mb-2">Logging out...</h1>
        <p className="text-muted-foreground">You will be redirected to the home page.</p>
      </div>
    </div>
  )
}

