"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AuthCheckProps {
  children: React.ReactNode
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth/login", "/auth/signup", "/auth/forgot-password"]
  const isPublicRoute =
    publicRoutes.includes(pathname) || pathname.startsWith("/about") || pathname.startsWith("/terms")

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const user = localStorage.getItem("eduAid_user")
      const token = localStorage.getItem("eduAid_token")

      if (user && token) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)

        // If not authenticated and trying to access a protected route, redirect to login
        if (!isPublicRoute) {
          router.push("/auth/login")
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router, pathname, isPublicRoute])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If authenticated or public route, render children
  if (isAuthenticated || isPublicRoute) {
    return <>{children}</>
  }

  // This should not be reached due to the redirect in useEffect
  return null
}

