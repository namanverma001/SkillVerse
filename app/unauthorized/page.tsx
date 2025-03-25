import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, LogIn, UserPlus } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Access Restricted</CardTitle>
          <CardDescription className="text-center">Please log in or sign up to access this content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            This page requires authentication. Please log in with your account or create a new one to continue.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button asChild className="w-full">
              <Link href="/auth/login">
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
          <div className="text-center text-sm">
            <Link href="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

