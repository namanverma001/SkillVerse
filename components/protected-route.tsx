"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const publicRoutes = ["/", "/auth/login", "/auth/signup"]
const donorRoutes = ["/donor-dashboard"]
const studentRoutes = ["/dashboard", "/learning-hub", "/scholarships", "/freelancing", "/profile"]

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, userType } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push("/auth/login?redirect=" + encodeURIComponent(pathname))
    }

    // Redirect donors to donor dashboard if they try to access student routes
    if (!isLoading && isAuthenticated && userType === "donor" && studentRoutes.includes(pathname)) {
      router.push("/donor-dashboard")
    }

    // Redirect students to student dashboard if they try to access donor routes
    if (!isLoading && isAuthenticated && userType === "student" && donorRoutes.includes(pathname)) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, pathname, router, userType])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return null
  }

  return <>{children}</>
}

