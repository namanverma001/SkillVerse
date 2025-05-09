"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Briefcase,
  Clock,
  DollarSign,
  ArrowRight,
  Building,
  Code,
  PenTool,
  FileText,
  Camera,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import JobApplicationModal from "@/components/job-application-modal"
import FreelancerCard from "@/components/freelancer-card"
import Image from "next/image"

// Mock data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer Needed",
    client: "StartupX",
    budget: "$500",
    duration: "2 weeks",
    category: "Web Development",
    skills: ["React", "Tailwind CSS", "JavaScript"],
    description: "Looking for a frontend developer to build a responsive landing page for our product.",
    postedDate: "2 days ago",
    proposals: 12,
    match: 95,
  },
  {
    id: 2,
    title: "Content Writer for Tech Blog",
    client: "TechBlog Inc",
    budget: "$200",
    duration: "1 week",
    category: "Content Writing",
    skills: ["Technical Writing", "SEO", "Research"],
    description: "Need an experienced writer to create engaging content about the latest tech trends.",
    postedDate: "3 days ago",
    proposals: 18,
    match: 87,
  },
  {
    id: 3,
    title: "Logo Design for Education Platform",
    client: "EduLearn",
    budget: "$150",
    duration: "3 days",
    category: "Graphic Design",
    skills: ["Logo Design", "Illustrator", "Branding"],
    description: "Create a modern and professional logo for an online education platform.",
    postedDate: "1 day ago",
    proposals: 24,
    match: 78,
  },
  {
    id: 4,
    title: "Mobile App UI Design",
    client: "AppWorks",
    budget: "$400",
    duration: "1 week",
    category: "UI/UX Design",
    skills: ["Figma", "Mobile Design", "UI/UX"],
    description: "Design user interface for a fitness tracking mobile application.",
    postedDate: "4 days ago",
    proposals: 15,
    match: 82,
  },
  {
    id: 5,
    title: "Data Analysis for E-commerce",
    client: "ShopOnline",
    budget: "$300",
    duration: "5 days",
    category: "Data Analysis",
    skills: ["Excel", "Python", "Data Visualization"],
    description: "Analyze customer purchase data and create insightful reports.",
    postedDate: "2 days ago",
    proposals: 9,
    match: 70,
  },
  {
    id: 6,
    title: "Social Media Content Creation",
    client: "BrandBoost",
    budget: "$250",
    duration: "Ongoing",
    category: "Social Media",
    skills: ["Content Creation", "Photoshop", "Copywriting"],
    description: "Create engaging social media content for a fashion brand.",
    postedDate: "3 days ago",
    proposals: 21,
    match: 65,
  },
]

const categories = [
  "Web Development",
  "Content Writing",
  "Graphic Design",
  "UI/UX Design",
  "Data Analysis",
  "Social Media",
  "Video Editing",
  "Translation",
]

// Top freelancers data
const topFreelancers = [
  {
    id: 1,
    name: "Rahul Patel",
    specialty: "Full-Stack Web Developer",
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
    rating: 4.9,
    projects: 24,
    image: "/placeholder.svg?height=200&width=200&text=RP&color=4F46E5&background=EEF2FF",
    bio: "Full-stack developer with 5+ years of experience building scalable web applications. Specialized in React and Node.js with a focus on performance optimization and clean code architecture.",
    portfolio: [
      {
        title: "E-commerce Platform",
        description:
          "Built a full-featured e-commerce platform with React, Node.js, and MongoDB with payment integration.",
        image: "/placeholder.svg?height=300&width=400&text=E-commerce&color=4F46E5&background=EEF2FF",
      },
      {
        title: "Real-time Dashboard",
        description: "Developed a real-time analytics dashboard using Socket.io and D3.js for data visualization.",
        image: "/placeholder.svg?height=300&width=400&text=Dashboard&color=4F46E5&background=EEF2FF",
      },
    ],
    website: "https://rahulpatel.dev",
    email: "rahul@example.com",
    location: "Mumbai, India",
    hourlyRate: "$45",
    availability: "Available",
  },
  {
    id: 2,
    name: "Priya Sharma",
    specialty: "UI/UX & Graphic Designer",
    skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Branding"],
    rating: 4.8,
    projects: 32,
    image: "/placeholder.svg?height=200&width=200&text=PS&color=EC4899&background=FCE7F3",
    bio: "Award-winning designer with expertise in creating intuitive user interfaces and compelling brand identities. Passionate about user-centered design and accessibility.",
    portfolio: [
      {
        title: "Finance App Redesign",
        description: "Complete UI/UX redesign for a financial services app focusing on simplicity and user engagement.",
        image: "/placeholder.svg?height=300&width=400&text=Finance+App&color=EC4899&background=FCE7F3",
      },
      {
        title: "Brand Identity System",
        description: "Created comprehensive brand identity including logo, color palette, typography, and guidelines.",
        image: "/placeholder.svg?height=300&width=400&text=Brand+Identity&color=EC4899&background=FCE7F3",
      },
    ],
    website: "https://priyaportfolio.com",
    email: "priya@example.com",
    location: "Bangalore, India",
    hourlyRate: "$40",
    availability: "Limited Availability",
  },
  {
    id: 3,
    name: "Ananya Singh",
    specialty: "Content Strategist & Writer",
    skills: ["SEO Content", "Technical Writing", "Copywriting", "Content Strategy", "Editing"],
    rating: 4.7,
    projects: 18,
    image: "/placeholder.svg?height=200&width=200&text=AS&color=0EA5E9&background=E0F2FE",
    bio: "Content strategist and writer specializing in technical content, SEO optimization, and brand storytelling. Experience working with startups and tech companies to improve content engagement.",
    portfolio: [
      {
        title: "Tech Blog Series",
        description: "Created a series of technical blog posts that increased organic traffic by 45% in three months.",
        image: "/placeholder.svg?height=300&width=400&text=Tech+Blog&color=0EA5E9&background=E0F2FE",
      },
      {
        title: "Product Documentation",
        description: "Developed comprehensive user documentation and guides for a SaaS platform.",
        image: "/placeholder.svg?height=300&width=400&text=Documentation&color=0EA5E9&background=E0F2FE",
      },
    ],
    email: "ananya@example.com",
    location: "Delhi, India",
    hourlyRate: "$35",
    availability: "Available",
  },
  {
    id: 4,
    name: "Vikram Mehta",
    specialty: "Mobile App Developer",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    rating: 4.9,
    projects: 21,
    image: "/placeholder.svg?height=200&width=200&text=VM&color=10B981&background=D1FAE5",
    bio: "Mobile app developer with expertise in cross-platform development using React Native and Flutter. Created apps with millions of downloads across various industries.",
    portfolio: [
      {
        title: "Health & Fitness App",
        description: "Developed a fitness tracking app with custom animations and real-time progress tracking.",
        image: "/placeholder.svg?height=300&width=400&text=Fitness+App&color=10B981&background=D1FAE5",
      },
      {
        title: "Food Delivery Platform",
        description: "Built a complete food delivery app with real-time order tracking and payment processing.",
        image: "/placeholder.svg?height=300&width=400&text=Food+App&color=10B981&background=D1FAE5",
      },
    ],
    website: "https://vikrammehta.dev",
    email: "vikram@example.com",
    location: "Pune, India",
    hourlyRate: "$50",
    availability: "Available",
  },
]

export default function FreelancingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("jobs")
  const [activeProjects, setActiveProjects] = useState<any[]>([])
  const [completedProjects, setCompletedProjects] = useState<any[]>([])
  const { toast } = useToast()

  // First, let's add a new state for the application modal
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)

  // Load saved project data from localStorage
  useEffect(() => {
    const savedActiveProjects = localStorage.getItem("freelance_active_projects")
    if (savedActiveProjects) {
      setActiveProjects(JSON.parse(savedActiveProjects))
    } else {
      // Default data if none exists
      setActiveProjects([])
    }

    const savedCompletedProjects = localStorage.getItem("freelance_completed_projects")
    if (savedCompletedProjects) {
      setCompletedProjects(JSON.parse(savedCompletedProjects))
    } else {
      // Default data if none exists
      setCompletedProjects([])
    }
  }, [])

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || job.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Handle job application
  // Add this after the other handler functions
  const handleApplyJobClick = (job: any) => {
    // Check if already applied
    const alreadyApplied = activeProjects.some((project) => project.id === job.id)

    if (alreadyApplied) {
      toast({
        title: "Already Applied",
        description: "You have already applied for this job.",
        variant: "destructive",
      })
      return
    }

    // Set the selected job and show the modal
    setSelectedJob(job)
    setShowApplicationModal(true)
  }

  // Modify the handleApplyJob function to be used by the modal
  const handleApplyJob = () => {
    if (!selectedJob) return

    // Create new project
    const newProject = {
      id: selectedJob.id,
      title: selectedJob.title,
      client: selectedJob.client,
      status: "In Progress",
      startDate: new Date().toLocaleDateString(),
      dueDate: calculateDueDate(selectedJob.duration),
      payment: selectedJob.budget,
      progress: 20,
    }

    // Add to active projects
    const updatedProjects = [...activeProjects, newProject]
    setActiveProjects(updatedProjects)

    // Save to localStorage
    localStorage.setItem("freelance_active_projects", JSON.stringify(updatedProjects))

    toast({
      title: "Application Submitted",
      description: "Your job application has been submitted successfully!",
    })

    // Close the modal
    setShowApplicationModal(false)
  }

  // Calculate due date based on duration
  const calculateDueDate = (duration: string) => {
    const today = new Date()

    if (duration.includes("week")) {
      const weeks = Number.parseInt(duration.split(" ")[0])
      today.setDate(today.getDate() + weeks * 7)
    } else if (duration.includes("day")) {
      const days = Number.parseInt(duration.split(" ")[0])
      today.setDate(today.getDate() + days)
    } else {
      // Default to 2 weeks for "Ongoing" or other formats
      today.setDate(today.getDate() + 14)
    }

    return today.toLocaleDateString()
  }

  // Handle project submission
  const handleSubmitWork = (projectId: number) => {
    // Update project status
    const updatedProjects = activeProjects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          status: "Completed",
          progress: 100,
        }
      }
      return project
    })

    // Move to completed projects
    const projectToMove = updatedProjects.find((project) => project.id === projectId)
    if (projectToMove) {
      const newCompletedProject = {
        ...projectToMove,
        completedDate: new Date().toLocaleDateString(),
        rating: 4.5,
        feedback: "Great job! The work was delivered on time and met all requirements.",
      }

      // Remove from active projects
      const filteredActiveProjects = updatedProjects.filter((project) => project.id !== projectId)
      setActiveProjects(filteredActiveProjects)

      // Add to completed projects
      const updatedCompletedProjects = [...completedProjects, newCompletedProject]
      setCompletedProjects(updatedCompletedProjects)

      // Save to localStorage
      localStorage.setItem("freelance_active_projects", JSON.stringify(filteredActiveProjects))
      localStorage.setItem("freelance_completed_projects", JSON.stringify(updatedCompletedProjects))

      toast({
        title: "Work Submitted",
        description: "Your work has been submitted successfully and marked as completed!",
      })
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Freelancing Marketplace</h1>
        <p className="text-muted-foreground">Find freelance opportunities and projects to earn while you learn</p>
      </div>

      <Tabs defaultValue="jobs" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Filters</CardTitle>
                  <CardDescription>Refine your job search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Categories</h3>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory(null)
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Your Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>React</Badge>
                    <Badge>JavaScript</Badge>
                    <Badge>Tailwind CSS</Badge>
                    <Badge>UI Design</Badge>
                    <Badge>Content Writing</Badge>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/profile">Update Skills</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Search */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </div>

              {/* Job Grid */}
              <div className="grid grid-cols-1 gap-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <motion.div key={job.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                      <Card className="h-full">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2">
                                <CardTitle className="text-lg">{job.title}</CardTitle>
                                {job.match > 90 && <Badge className="bg-primary">Top Match</Badge>}
                              </div>
                              <CardDescription className="flex items-center">
                                <Building className="h-3 w-3 mr-1" />
                                {job.client}
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {job.match}% Match
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{job.budget}</p>
                                <p className="text-xs text-muted-foreground">Budget</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{job.duration}</p>
                                <p className="text-xs text-muted-foreground">Duration</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{job.category}</p>
                                <p className="text-xs text-muted-foreground">Category</p>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Required Skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {job.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center pt-2 border-t">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{job.postedDate}</span>
                            <span>{job.proposals} proposals</span>
                          </div>
                          <Button onClick={() => handleApplyJobClick(job)}>
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <Search className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory(null)
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Your ongoing freelance projects</CardDescription>
            </CardHeader>
            <CardContent>
              {activeProjects.length > 0 ? (
                <div className="space-y-6">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div className="space-y-1">
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                          <div className="flex items-center space-x-2 text-xs">
                            <Badge variant="outline">{project.payment}</Badge>
                            <span className="text-muted-foreground">Due: {project.dueDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end space-y-2">
                          <Badge
                            className={
                              project.status === "In Progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            }
                          >
                            {project.status}
                          </Badge>
                          <Button
                            variant={project.status === "Revision Requested" ? "default" : "outline"}
                            size="sm"
                            onClick={() => project.status === "In Progress" && handleSubmitWork(project.id)}
                          >
                            {project.status === "In Progress" ? "Submit Work" : "View Revision Request"}
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No active projects</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any active projects. Apply for jobs to start freelancing.
                  </p>
                  <Button onClick={() => setActiveTab("jobs")}>Browse Jobs</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed Projects</CardTitle>
              <CardDescription>Your finished freelance work</CardDescription>
            </CardHeader>
            <CardContent>
              {completedProjects.length > 0 ? (
                <div className="space-y-6">
                  {completedProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div className="space-y-1">
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                          <div className="flex items-center space-x-2 text-xs">
                            <Badge variant="outline">{project.payment}</Badge>
                            <span className="text-muted-foreground">Completed: {project.completedDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end space-y-2">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(project.rating)
                                    ? "text-yellow-500 fill-yellow-500"
                                    : i < project.rating
                                      ? "text-yellow-500 fill-yellow-500 opacity-50"
                                      : "text-muted-foreground"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm font-medium">{project.rating}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-muted rounded-md text-sm italic">"{project.feedback}"</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No completed projects yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't completed any projects yet. Complete your active projects to see them here.
                  </p>
                  <Button onClick={() => setActiveTab("jobs")}>Browse Jobs</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Your freelancing income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <Card className="border">
                  <CardContent className="p-6">
                    <DollarSign className="h-10 w-10 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">${calculateTotalEarnings()}</div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-6">
                    <CheckCircle className="h-10 w-10 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">{completedProjects.length}</div>
                    <p className="text-sm text-muted-foreground">Completed Projects</p>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-6">
                    <Clock className="h-10 w-10 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">{activeProjects.length}</div>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-6">
                    <Star className="h-10 w-10 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">{calculateAverageRating()}</div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Freelancers</CardTitle>
              <CardDescription>Connect with successful freelancers in our community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                {topFreelancers.map((freelancer) => (
                  <FreelancerCard key={freelancer.id} freelancer={freelancer} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Skills</CardTitle>
              <CardDescription>Most in-demand skills in the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="border">
                  <CardContent className="p-6 text-center">
                    <Code className="h-10 w-10 text-primary mx-auto mb-2" />
                    <h3 className="font-medium">Web Development</h3>
                    <p className="text-sm text-muted-foreground mb-2">500+ jobs available</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">JavaScript</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-6 text-center">
                    <PenTool className="h-10 w-10 text-primary mx-auto mb-2" />
                    <h3 className="font-medium">Graphic Design</h3>
                    <p className="text-sm text-muted-foreground mb-2">350+ jobs available</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="secondary">Illustrator</Badge>
                      <Badge variant="secondary">Photoshop</Badge>
                      <Badge variant="secondary">Figma</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-10 w-10 text-primary mx-auto mb-2" />
                    <h3 className="font-medium">Content Writing</h3>
                    <p className="text-sm text-muted-foreground mb-2">400+ jobs available</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="secondary">Blog Writing</Badge>
                      <Badge variant="secondary">SEO</Badge>
                      <Badge variant="secondary">Copywriting</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-6 text-center">
                    <Camera className="h-10 w-10 text-primary mx-auto mb-2" />
                    <h3 className="font-medium">Video Production</h3>
                    <p className="text-sm text-muted-foreground mb-2">200+ jobs available</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="secondary">Editing</Badge>
                      <Badge variant="secondary">Animation</Badge>
                      <Badge variant="secondary">After Effects</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Freelancer Success Stories</CardTitle>
              <CardDescription>Learn from successful freelancers in our community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=400&width=600&text=Success+Story&color=4F46E5&background=EEF2FF"
                      alt="Success Story"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-lg font-bold text-white">From Beginner to Expert</h3>
                      <p className="text-sm text-white/80">Rahul's journey in web development</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      "I started freelancing as a side hustle while studying. Within a year, I was earning more from
                      freelancing than my previous full-time job would have paid. The platform connected me with clients
                      I could never have reached otherwise."
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Read Full Story
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/placeholder.svg?height=400&width=600&text=Success+Story&color=EC4899&background=FCE7F3"
                      alt="Success Story"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-lg font-bold text-white">Building a Design Agency</h3>
                      <p className="text-sm text-white/80">Priya's entrepreneurial journey</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      "What started as freelance design work for small businesses has grown into my own design agency
                      with five team members. The skills and client relationships I built through freelancing were
                      invaluable to this growth."
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Read Full Story
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {showApplicationModal && selectedJob && (
        <JobApplicationModal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          onApply={handleApplyJob}
          job={selectedJob}
        />
      )}
    </div>
  )

  // Helper function to calculate total earnings
  function calculateTotalEarnings() {
    let total = 0

    // Add earnings from completed projects
    completedProjects.forEach((project) => {
      const amount = project.payment.replace("$", "")
      total += Number.parseInt(amount)
    })

    return total
  }

  // Helper function to calculate average rating
  function calculateAverageRating() {
    if (completedProjects.length === 0) return 0

    let totalRating = 0
    completedProjects.forEach((project) => {
      totalRating += project.rating
    })

    return (totalRating / completedProjects.length).toFixed(1)
  }
}

