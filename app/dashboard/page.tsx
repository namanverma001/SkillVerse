"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Clock,
  Calendar,
  Bell,
  ArrowRight,
  BarChart3,
  TrendingUp,
} from "lucide-react"

// Mock data
const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    platform: "Khan Academy",
    progress: 75,
    lastAccessed: "2 days ago",
  },
  { id: 2, title: "Data Science Fundamentals", platform: "Coursera", progress: 45, lastAccessed: "1 week ago" },
  {
    id: 3,
    title: "Mobile App Development with React Native",
    platform: "YouTube",
    progress: 20,
    lastAccessed: "3 days ago",
  },
]

const recommendedCourses = [
  { id: 4, title: "Advanced JavaScript Concepts", platform: "MIT OpenCourseWare", duration: "8 weeks" },
  { id: 5, title: "UI/UX Design Principles", platform: "Coursera", duration: "6 weeks" },
  { id: 6, title: "Machine Learning Basics", platform: "Khan Academy", duration: "10 weeks" },
]

const scholarships = [
  {
    id: 1,
    title: "Tech Innovators Scholarship",
    provider: "TechCorp Foundation",
    deadline: "June 15, 2023",
    amount: "$5,000",
  },
  { id: 2, title: "Women in STEM Grant", provider: "WomenTech NGO", deadline: "July 30, 2023", amount: "$3,500" },
]

const freelanceJobs = [
  { id: 1, title: "Frontend Developer Needed", client: "StartupX", budget: "$500", deadline: "2 weeks" },
  { id: 2, title: "Content Writer for Tech Blog", client: "TechBlog Inc", budget: "$200", deadline: "1 week" },
]

const achievements = [
  { id: 1, title: "Completed First Course", date: "Jan 15, 2023", icon: <Award className="h-5 w-5 text-yellow-500" /> },
  {
    id: 2,
    title: "Earned Web Development Badge",
    date: "Mar 22, 2023",
    icon: <Award className="h-5 w-5 text-blue-500" />,
  },
]

const notifications = [
  { id: 1, title: "New scholarship available", time: "2 hours ago", type: "scholarship" },
  { id: 2, title: "Course deadline approaching", time: "1 day ago", type: "course" },
  { id: 3, title: "New freelance job matches your skills", time: "3 days ago", type: "job" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Rahul! Here's your learning progress.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            <span className="relative">
              Notifications
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </span>
          </Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            My Schedule
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="freelancing">Freelancing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">46.7%</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scholarships Applied</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">1 pending review</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Freelance Earnings</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$350</div>
                <p className="text-xs text-muted-foreground">+$150 from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Your Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{course.title}</p>
                        <p className="text-sm text-muted-foreground">{course.platform}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{course.lastAccessed}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={course.progress} className="h-2" />
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link href="/learning-hub">
                    View all courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-4">
                      <div className="rounded-full p-1 bg-primary/10">
                        {notification.type === "scholarship" ? (
                          <GraduationCap className="h-4 w-4 text-primary" />
                        ) : notification.type === "course" ? (
                          <BookOpen className="h-4 w-4 text-primary" />
                        ) : (
                          <Briefcase className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Courses</CardTitle>
                <CardDescription>Based on your interests and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedCourses.map((course) => (
                    <div key={course.id} className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{course.title}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{course.platform}</Badge>
                          <span className="text-xs text-muted-foreground">{course.duration}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scholarship Opportunities</CardTitle>
                <CardDescription>Deadlines approaching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scholarships.map((scholarship) => (
                    <div key={scholarship.id} className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{scholarship.title}</p>
                        <Badge>{scholarship.amount}</Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{scholarship.provider}</span>
                        <span>Deadline: {scholarship.deadline}</span>
                      </div>
                    </div>
                  ))}
                  <Button asChild variant="outline" size="sm" className="w-full mt-2">
                    <Link href="/scholarships">View all scholarships</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Badges and certifications earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-4 p-2 rounded-md border"
                    >
                      <div className="rounded-full p-2 bg-muted">{achievement.icon}</div>
                      <div>
                        <p className="text-sm font-medium">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </motion.div>
                  ))}
                  <Button asChild variant="outline" size="sm" className="w-full mt-2">
                    <Link href="/profile">View all achievements</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Enrolled Courses</CardTitle>
              <CardDescription>Track your progress and continue learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.platform}</p>
                      </div>
                      <Button>Continue Learning</Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={course.progress} className="h-2" />
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Last accessed: {course.lastAccessed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Courses</CardTitle>
              <CardDescription>Based on your interests and learning history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendedCourses.map((course) => (
                  <Card key={course.id} className="border">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">{course.title}</h3>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{course.platform}</Badge>
                          <span className="text-xs text-muted-foreground">{course.duration}</span>
                        </div>
                        <Button className="w-full mt-2">Enroll Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scholarships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Scholarships</CardTitle>
              <CardDescription>Opportunities matching your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {scholarships.map((scholarship) => (
                  <div key={scholarship.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{scholarship.title}</h3>
                        <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
                      </div>
                      <Badge>{scholarship.amount}</Badge>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {scholarship.deadline}</span>
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Applications</CardTitle>
              <CardDescription>Track your scholarship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Digital Innovators Scholarship</h3>
                      <p className="text-sm text-muted-foreground">TechFuture Foundation</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    >
                      Pending
                    </Badge>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Applied on: May 10, 2023</p>
                    <p>Decision expected by: June 30, 2023</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">STEM Excellence Award</h3>
                      <p className="text-sm text-muted-foreground">Global Education Initiative</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      Approved
                    </Badge>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Applied on: February 15, 2023</p>
                    <p>Approved on: April 5, 2023</p>
                    <p>Amount: $2,500</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="freelancing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Jobs</CardTitle>
              <CardDescription>Freelance opportunities matching your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {freelanceJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">Client: {job.client}</p>
                      </div>
                      <Badge>{job.budget}</Badge>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Deadline: {job.deadline}</span>
                      </div>
                      <Button>Apply</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Freelance Projects</CardTitle>
              <CardDescription>Track your ongoing and completed projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Website Redesign</h3>
                      <p className="text-sm text-muted-foreground">Client: LocalBusiness Inc.</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      In Progress
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Started: May 5, 2023</span>
                      <span>Due: May 25, 2023</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <span>Payment: $350</span>
                      <span>60% Complete</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Logo Design</h3>
                      <p className="text-sm text-muted-foreground">Client: StartupX</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      Completed
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Completed: April 20, 2023</span>
                      <span>Payment: $150</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-green-600 dark:text-green-400">✓ Payment received</span>
                      <span className="text-green-600 dark:text-green-400">✓ 5-star review</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

