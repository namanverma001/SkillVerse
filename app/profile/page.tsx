"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  Download,
  Share2,
  Calendar,
  Clock,
  Star,
  FileText,
  User,
  Mail,
  MapPin,
  Phone,
  Pencil,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CertificateModal from "@/components/certificate-modal"
import UserAvatar from "@/components/user-avatar"
import { useAuth } from "@/components/auth-provider"

// Mock courses data
const courses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn HTML, CSS, and JavaScript fundamentals",
    platform: "Khan Academy",
    category: "Web Development",
    level: "Beginner",
    duration: "6 weeks",
    image: "/placeholder.svg?height=400&width=600",
    badge: {
      name: "Web Development Fundamentals",
      description: "Awarded for mastering the basics of web development",
      image: "/placeholder.svg?height=200&width=200",
      level: "Beginner",
    },
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis and visualization",
    platform: "Coursera",
    category: "Data Science",
    level: "Intermediate",
    duration: "8 weeks",
    image: "/placeholder.svg?height=400&width=600",
    badge: {
      name: "Data Science Explorer",
      description: "Awarded for mastering the fundamentals of data science",
      image: "/placeholder.svg?height=200&width=200",
      level: "Intermediate",
    },
  },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({})
  const [userBadges, setUserBadges] = useState<any[]>([])
  const [userCertificates, setUserCertificates] = useState<any[]>([])
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)

  useEffect(() => {
    // Load enrolled courses from localStorage
    const savedEnrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]")
    setEnrolledCourses(savedEnrolledCourses)

    // Load course progress
    const progress: Record<string, number> = {}
    savedEnrolledCourses.forEach((courseId: string) => {
      progress[courseId] = Number.parseInt(localStorage.getItem(`course_${courseId}_progress`) || "0")
    })
    setCourseProgress(progress)

    // Load badges
    const savedBadges = JSON.parse(localStorage.getItem("user_badges") || "[]")
    setUserBadges(savedBadges)

    // Load certificates
    const savedCertificates = JSON.parse(localStorage.getItem("user_certificates") || "[]")
    setUserCertificates(savedCertificates)
  }, [])

  const viewCertificate = (certificate: any) => {
    setSelectedCertificate(certificate)
    setShowCertificateModal(true)
  }

  return (
    <div className="container py-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute right-[10%] top-[60%] h-[250px] w-[250px] rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your profile, track your learning progress, and view your achievements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - User Profile */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-primary/10 shadow-md card-hover-effect">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <UserAvatar user={user} size="lg" className="mb-4 border-4 border-primary/20" />
                <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
                <p className="text-muted-foreground">{user?.role === "student" ? "Student" : "Organization"}</p>
                <div className="flex mt-2 space-x-2 flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="bg-primary/5 border-primary/20">
                    Web Development
                  </Badge>
                  <Badge variant="outline" className="bg-blue-500/5 border-blue-500/20">
                    Data Science
                  </Badge>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-md card-hover-effect">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-primary mr-2" />
                <span>{user?.email || "email@example.com"}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-primary mr-2" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-primary mr-2" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 text-primary mr-2" />
                <span>Student ID: STU12345</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-md card-hover-effect">
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">HTML/CSS</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">JavaScript</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Python</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Data Analysis</span>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-primary/5 border border-primary/10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-primary/10 shadow-md card-hover-effect">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Your enrolled courses and their progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {enrolledCourses.length > 0 ? (
                      courses
                        .filter((course) => enrolledCourses.includes(course.id))
                        .map((course) => (
                          <div key={course.id} className="space-y-2">
                            <div className="flex justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{course.title}</p>
                                <p className="text-sm text-muted-foreground">{course.platform}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{course.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Progress value={courseProgress[course.id] || 0} className="h-2" />
                              <span className="text-sm font-medium">{courseProgress[course.id] || 0}%</span>
                            </div>
                            <div className="flex justify-end">
                              <Button asChild variant="ghost" size="sm">
                                <Link href={`/learning-hub/course/${course.id}/learn`}>
                                  {courseProgress[course.id] > 0 ? "Continue Learning" : "Start Learning"}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-6">
                        <div className="bg-primary/5 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No courses enrolled yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Explore our courses and start your learning journey today.
                        </p>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                        >
                          <Link href="/learning-hub">Browse Courses</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-primary/10 shadow-md card-hover-effect">
                  <CardHeader>
                    <CardTitle>Recent Badges</CardTitle>
                    <CardDescription>Badges you've earned recently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userBadges.length > 0 ? (
                      <div className="space-y-4">
                        {userBadges.slice(0, 3).map((badge, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full">
                              <Image
                                src={badge.image || "/placeholder.svg"}
                                alt={badge.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{badge.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        {userBadges.length > 3 && (
                          <Button asChild variant="ghost" size="sm" className="w-full">
                            <Link href="#badges" onClick={() => setActiveTab("badges")}>
                              View All Badges
                            </Link>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <div className="bg-primary/5 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">Complete courses to earn badges</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-primary/10 shadow-md card-hover-effect">
                  <CardHeader>
                    <CardTitle>Recent Certificates</CardTitle>
                    <CardDescription>Certificates you've earned recently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userCertificates.length > 0 ? (
                      <div className="space-y-4">
                        {userCertificates.slice(0, 3).map((certificate, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="relative h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full">
                              <Award className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{certificate.courseTitle}</p>
                              <p className="text-xs text-muted-foreground">
                                Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => viewCertificate(certificate)}>
                              View
                            </Button>
                          </div>
                        ))}
                        {userCertificates.length > 3 && (
                          <Button asChild variant="ghost" size="sm" className="w-full">
                            <Link href="#certificates" onClick={() => setActiveTab("certificates")}>
                              View All Certificates
                            </Link>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <div className="bg-primary/5 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">Complete courses to earn certificates</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="border-primary/10 shadow-md card-hover-effect">
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <Card className="border border-primary/10 bg-primary/5">
                      <CardContent className="p-6">
                        <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                        <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-blue-500/10 bg-blue-500/5">
                      <CardContent className="p-6">
                        <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">
                          {Math.round(
                            Object.values(courseProgress).reduce((sum, progress) => sum + progress, 0) /
                              (enrolledCourses.length || 1),
                          )}
                          %
                        </div>
                        <p className="text-sm text-muted-foreground">Average Progress</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-purple-500/10 bg-purple-500/5">
                      <CardContent className="p-6">
                        <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{userBadges.length}</div>
                        <p className="text-sm text-muted-foreground">Badges Earned</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-green-500/10 bg-green-500/5">
                      <CardContent className="p-6">
                        <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{userCertificates.length}</div>
                        <p className="text-sm text-muted-foreground">Certificates</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <Card className="border-primary/10 shadow-md">
                <CardHeader>
                  <CardTitle>My Enrolled Courses</CardTitle>
                  <CardDescription>Track your progress and continue learning</CardDescription>
                </CardHeader>
                <CardContent>
                  {enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {courses
                        .filter((course) => enrolledCourses.includes(course.id))
                        .map((course) => (
                          <motion.div key={course.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                            <Card className="h-full flex flex-col overflow-hidden border-primary/10 shadow-md">
                              <div className="relative h-40 w-full">
                                <Image
                                  src={course.image || "/placeholder.svg"}
                                  alt={course.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute bottom-2 left-2">
                                  <Badge
                                    variant="outline"
                                    className="bg-background/80 backdrop-blur-sm text-foreground"
                                  >
                                    {course.platform}
                                  </Badge>
                                </div>
                              </div>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-lg">{course.title}</CardTitle>
                                  <Badge
                                    variant="outline"
                                    className={
                                      course.level === "Beginner"
                                        ? "bg-green-500/10 text-green-600 border-green-200"
                                        : course.level === "Intermediate"
                                          ? "bg-blue-500/10 text-blue-600 border-blue-200"
                                          : "bg-purple-500/10 text-purple-600 border-purple-200"
                                    }
                                  >
                                    {course.level}
                                  </Badge>
                                </div>
                                <CardDescription>{course.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="pb-2 flex-grow">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span>{courseProgress[course.id] || 0}%</span>
                                  </div>
                                  <Progress value={courseProgress[course.id] || 0} className="h-2" />
                                </div>
                              </CardContent>
                              <CardFooter className="pt-2 border-t">
                                <Button
                                  asChild
                                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                                >
                                  <Link href={`/learning-hub/course/${course.id}/learn`}>
                                    {courseProgress[course.id] > 0 ? "Continue Learning" : "Start Learning"}
                                  </Link>
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-primary/5 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No courses enrolled yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Explore our courses and start your learning journey today.
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                      >
                        <Link href="/learning-hub">Browse Courses</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-primary/10 shadow-md">
                <CardHeader>
                  <CardTitle>Recommended Courses</CardTitle>
                  <CardDescription>Based on your interests and learning history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses
                      .filter((course) => !enrolledCourses.includes(course.id))
                      .map((course) => (
                        <motion.div key={course.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                          <Card className="h-full flex flex-col overflow-hidden border-primary/10 shadow-md">
                            <div className="relative h-40 w-full">
                              <Image
                                src={course.image || "/placeholder.svg"}
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute bottom-2 left-2">
                                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-foreground">
                                  {course.platform}
                                </Badge>
                              </div>
                            </div>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                <Badge
                                  variant="outline"
                                  className={
                                    course.level === "Beginner"
                                      ? "bg-green-500/10 text-green-600 border-green-200"
                                      : course.level === "Intermediate"
                                        ? "bg-blue-500/10 text-blue-600 border-blue-200"
                                        : "bg-purple-500/10 text-purple-600 border-purple-200"
                                  }
                                >
                                  {course.level}
                                </Badge>
                              </div>
                              <CardDescription>{course.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2 flex-grow">
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{course.duration}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="pt-2 border-t">
                              <Button
                                asChild
                                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                              >
                                <Link href={`/learning-hub/course/${course.id}`}>View Course</Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <Card className="border-primary/10 shadow-md">
                <CardHeader>
                  <CardTitle>My Badges</CardTitle>
                  <CardDescription>Badges you've earned from completed courses</CardDescription>
                </CardHeader>
                <CardContent>
                  {userBadges.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {userBadges.map((badge, index) => (
                        <motion.div key={index} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                          <Card className="h-full flex flex-col items-center text-center p-6 border-primary/10 shadow-md">
                            <div className="relative h-24 w-24 mb-4">
                              <div className="absolute inset-0 rounded-full animate-pulse-ring bg-primary/20"></div>
                              <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-primary">
                                <Image
                                  src={badge.image || "/placeholder.svg"}
                                  alt={badge.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <h3 className="text-lg font-bold mb-1">{badge.name}</h3>
                            <Badge
                              className={`mb-2 badge-${badge.level.toLowerCase()} badge-gradient text-white px-3 py-1 rounded-full`}
                            >
                              <Award className="h-3 w-3 mr-1" />
                              {badge.level}
                            </Badge>
                            <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                            <p className="text-xs text-muted-foreground">
                              Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground">From course: {badge.courseTitle}</p>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-primary/5 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                        <Award className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No badges earned yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Complete courses to earn badges and showcase your achievements.
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                      >
                        <Link href="/learning-hub">Browse Courses</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-primary/10 shadow-md">
                <CardHeader>
                  <CardTitle>Badge Levels</CardTitle>
                  <CardDescription>Understanding badge levels and their significance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border border-green-500/20 bg-green-500/5">
                      <CardContent className="p-6">
                        <div className="flex justify-center mb-4">
                          <Badge className="badge-beginner badge-gradient text-white px-3 py-1 rounded-full">
                            <Award className="h-4 w-4 mr-1" />
                            Beginner
                          </Badge>
                        </div>
                        <p className="text-sm text-center">
                          Awarded for completing foundational courses and mastering basic concepts.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border border-blue-500/20 bg-blue-500/5">
                      <CardContent className="p-6">
                        <div className="flex justify-center mb-4">
                          <Badge className="badge-intermediate badge-gradient text-white px-3 py-1 rounded-full">
                            <Award className="h-4 w-4 mr-1" />
                            Intermediate
                          </Badge>
                        </div>
                        <p className="text-sm text-center">
                          Awarded for completing more advanced courses and developing specialized skills.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border border-purple-500/20 bg-purple-500/5">
                      <CardContent className="p-6">
                        <div className="flex justify-center mb-4">
                          <Badge className="badge-advanced badge-gradient text-white px-3 py-1 rounded-full">
                            <Award className="h-4 w-4 mr-1" />
                            Advanced
                          </Badge>
                        </div>
                        <p className="text-sm text-center">
                          Awarded for mastering complex topics and demonstrating expert-level knowledge.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-6">
              <Card className="border-primary/10 shadow-md">
                <CardHeader>
                  <CardTitle>My Certificates</CardTitle>
                  <CardDescription>Certificates you've earned from completed courses</CardDescription>
                </CardHeader>
                <CardContent>
                  {userCertificates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {userCertificates.map((certificate, index) => (
                        <motion.div key={index} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                          <Card className="h-full flex flex-col overflow-hidden border-primary/10 shadow-md">
                            <div className="relative h-40 w-full bg-gradient-to-r from-primary/10 to-blue-500/10 certificate-container">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Award className="h-16 w-16 text-primary" />
                              </div>
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{certificate.courseTitle}</CardTitle>
                              <CardDescription>Certificate ID: {certificate.certificateId}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2 flex-grow">
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Issued on {new Date(certificate.issueDate).toLocaleDateString()}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="pt-2 border-t flex justify-between">
                              <Button variant="outline" size="sm" onClick={() => viewCertificate(certificate)}>
                                <FileText className="h-4 w-4 mr-2" />
                                View
                              </Button>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-primary/5 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No certificates earned yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Complete courses to earn certificates that validate your skills.
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                      >
                        <Link href="/learning-hub">Browse Courses</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-primary/10 shadow-md">
                <CardHeader>
                  <CardTitle>Certificate Benefits</CardTitle>
                  <CardDescription>How certificates can help your career</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border border-primary/10 bg-primary/5">
                      <CardContent className="p-6">
                        <div className="flex justify-center mb-4">
                          <Briefcase className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium text-center mb-2">Career Advancement</h3>
                        <p className="text-sm text-center text-muted-foreground">
                          Showcase your skills to potential employers and stand out in job applications.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border border-blue-500/10 bg-blue-500/5">
                      <CardContent className="p-6">
                        <div className="flex justify-center mb-4">
                          <Star className="h-10 w-10 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-medium text-center mb-2">Skill Validation</h3>
                        <p className="text-sm text-center text-muted-foreground">
                          Provide tangible proof of your knowledge and expertise in specific areas.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border border-purple-500/10 bg-purple-500/5">
                      <CardContent className="p-6">
                        <div className="flex justify-center mb-4">
                          <GraduationCap className="h-10 w-10 text-purple-500" />
                        </div>
                        <h3 className="text-lg font-medium text-center mb-2">Continuous Learning</h3>
                        <p className="text-sm text-center text-muted-foreground">
                          Demonstrate your commitment to professional development and lifelong learning.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedCertificate && (
        <CertificateModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          courseTitle={selectedCertificate?.courseTitle || ""}
          studentName={user?.name || "Student Name"}
          completionDate={selectedCertificate ? new Date(selectedCertificate.issueDate).toLocaleDateString() : ""}
          certificateId={selectedCertificate?.certificateId || ""}
        />
      )}
    </div>
  )
}

