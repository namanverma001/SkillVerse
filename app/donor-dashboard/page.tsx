"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  Briefcase,
  Clock,
  Calendar,
  Bell,
  ArrowRight,
  Users,
  DollarSign,
  FileText,
  PlusCircle,
} from "lucide-react"

// Mock data
const scholarshipsOffered = [
  {
    id: 1,
    title: "Tech Innovators Scholarship",
    amount: "$5,000",
    applicants: 24,
    deadline: "June 15, 2023",
    status: "Active",
  },
  {
    id: 2,
    title: "Women in STEM Grant",
    amount: "$3,500",
    applicants: 18,
    deadline: "July 30, 2023",
    status: "Active",
  },
  {
    id: 3,
    title: "Rural Education Initiative",
    amount: "$2,500",
    applicants: 12,
    deadline: "May 10, 2023",
    status: "Closed",
  },
]

const applicants = [
  {
    id: 1,
    name: "Rahul Sharma",
    scholarship: "Tech Innovators Scholarship",
    appliedDate: "April 15, 2023",
    status: "Under Review",
  },
  {
    id: 2,
    name: "Priya Patel",
    scholarship: "Tech Innovators Scholarship",
    appliedDate: "April 18, 2023",
    status: "Shortlisted",
  },
  {
    id: 3,
    name: "Amit Kumar",
    scholarship: "Women in STEM Grant",
    appliedDate: "April 20, 2023",
    status: "Approved",
  },
  {
    id: 4,
    name: "Neha Singh",
    scholarship: "Tech Innovators Scholarship",
    appliedDate: "April 22, 2023",
    status: "Under Review",
  },
]

const jobsPosted = [
  {
    id: 1,
    title: "Frontend Developer Needed",
    budget: "$500",
    applicants: 8,
    deadline: "2 weeks",
    status: "Active",
  },
  {
    id: 2,
    title: "Content Writer for Tech Blog",
    budget: "$200",
    applicants: 12,
    deadline: "1 week",
    status: "Active",
  },
]

const notifications = [
  { id: 1, title: "New scholarship application received", time: "2 hours ago", type: "application" },
  { id: 2, title: "Scholarship deadline approaching", time: "1 day ago", type: "deadline" },
  { id: 3, title: "New freelancer applied to your job", time: "3 days ago", type: "job" },
]

export default function DonorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donor Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, TechCorp Foundation! Manage your scholarships and job postings.
          </p>
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
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Scholarships</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 active, 1 closed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">54</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Funds Allocated</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$11,000</div>
                <p className="text-xs text-muted-foreground">$8,500 remaining</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jobs Posted</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">20 applications received</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicants.slice(0, 3).map((applicant) => (
                  <div key={applicant.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{applicant.name}</p>
                        <p className="text-sm text-muted-foreground">{applicant.scholarship}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{applicant.appliedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={
                          applicant.status === "Approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : applicant.status === "Shortlisted"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }
                      >
                        {applicant.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link href="#applicants" onClick={() => setActiveTab("applicants")}>
                    View all applicants <ArrowRight className="ml-2 h-4 w-4" />
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
                        {notification.type === "application" ? (
                          <FileText className="h-4 w-4 text-primary" />
                        ) : notification.type === "deadline" ? (
                          <Calendar className="h-4 w-4 text-primary" />
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Scholarships</CardTitle>
                <CardDescription>Active and upcoming scholarship opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scholarshipsOffered.slice(0, 2).map((scholarship) => (
                    <div key={scholarship.id} className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{scholarship.title}</p>
                        <div className="flex items-center space-x-2">
                          <Badge>{scholarship.amount}</Badge>
                          <span className="text-xs text-muted-foreground">Deadline: {scholarship.deadline}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          scholarship.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                        }
                      >
                        {scholarship.status}
                      </Badge>
                    </div>
                  ))}
                  <Button asChild variant="outline" size="sm" className="w-full mt-2">
                    <Link href="#scholarships" onClick={() => setActiveTab("scholarships")}>
                      Manage scholarships
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Job Postings</CardTitle>
                <CardDescription>Active and upcoming job opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobsPosted.map((job) => (
                    <div key={job.id} className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{job.title}</p>
                        <div className="flex items-center space-x-2">
                          <Badge>{job.budget}</Badge>
                          <span className="text-xs text-muted-foreground">Deadline: {job.deadline}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        {job.applicants} Applicants
                      </Badge>
                    </div>
                  ))}
                  <Button asChild variant="outline" size="sm" className="w-full mt-2">
                    <Link href="#jobs" onClick={() => setActiveTab("jobs")}>
                      Manage job postings
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scholarships" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Scholarships</CardTitle>
                <CardDescription>Manage your scholarship opportunities</CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Scholarship
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {scholarshipsOffered.map((scholarship) => (
                  <div key={scholarship.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{scholarship.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge>{scholarship.amount}</Badge>
                          <span className="text-sm text-muted-foreground">Applicants: {scholarship.applicants}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          scholarship.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                        }
                      >
                        {scholarship.status}
                      </Badge>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {scholarship.deadline}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Applicants
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applicants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Applicants</CardTitle>
              <CardDescription>Review and manage scholarship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {applicants.map((applicant) => (
                  <div key={applicant.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{applicant.name}</h3>
                        <p className="text-sm text-muted-foreground">Applied for: {applicant.scholarship}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          applicant.status === "Approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : applicant.status === "Shortlisted"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }
                      >
                        {applicant.status}
                      </Badge>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Applied on: {applicant.appliedDate}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Application
                        </Button>
                        <Button size="sm">Update Status</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Job Postings</CardTitle>
                <CardDescription>Manage your freelance job opportunities</CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {jobsPosted.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge>{job.budget}</Badge>
                          <span className="text-sm text-muted-foreground">Applicants: {job.applicants}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Deadline: {job.deadline}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Applicants
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

