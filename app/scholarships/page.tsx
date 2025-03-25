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
  GraduationCap,
  Calendar,
  DollarSign,
  ArrowRight,
  Building,
  BookOpen,
  Globe,
  Award,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock data
const scholarships = [
  {
    id: 1,
    title: "Tech Innovators Scholarship",
    provider: "TechCorp Foundation",
    amount: "$5,000",
    deadline: "June 15, 2023",
    category: "Technology",
    eligibility: ["Computer Science students", "GPA 3.5+", "2nd year or above"],
    description: "Supporting students pursuing careers in technology and innovation.",
    image: "/placeholder.svg?height=400&width=600",
    match: 95,
  },
  {
    id: 2,
    title: "Women in STEM Grant",
    provider: "WomenTech NGO",
    amount: "$3,500",
    deadline: "July 30, 2023",
    category: "STEM",
    eligibility: ["Female students", "STEM fields", "Any year"],
    description: "Empowering women to pursue education and careers in STEM fields.",
    image: "/placeholder.svg?height=400&width=600",
    match: 87,
  },
  {
    id: 3,
    title: "Global Leaders Scholarship",
    provider: "International Education Fund",
    amount: "$10,000",
    deadline: "August 20, 2023",
    category: "Leadership",
    eligibility: ["International students", "Leadership experience", "Any field"],
    description: "Supporting future global leaders with demonstrated leadership potential.",
    image: "/placeholder.svg?height=400&width=600",
    match: 78,
  },
  {
    id: 4,
    title: "Creative Arts Fellowship",
    provider: "Arts Foundation",
    amount: "$2,500",
    deadline: "September 5, 2023",
    category: "Arts",
    eligibility: ["Arts & Design students", "Portfolio required", "Any year"],
    description: "Supporting creative excellence in visual arts, design, music, and performing arts.",
    image: "/placeholder.svg?height=400&width=600",
    match: 65,
  },
  {
    id: 5,
    title: "First Generation Student Grant",
    provider: "Education Access Initiative",
    amount: "$4,000",
    deadline: "July 15, 2023",
    category: "Diversity",
    eligibility: ["First-generation college students", "Financial need", "Any field"],
    description: "Supporting students who are the first in their family to attend college.",
    image: "/placeholder.svg?height=400&width=600",
    match: 92,
  },
  {
    id: 6,
    title: "Environmental Studies Scholarship",
    provider: "Green Future Foundation",
    amount: "$3,000",
    deadline: "August 10, 2023",
    category: "Environment",
    eligibility: ["Environmental Science/Studies", "Research proposal", "3rd year or above"],
    description: "Supporting students committed to environmental conservation and sustainability.",
    image: "/placeholder.svg?height=400&width=600",
    match: 70,
  },
]

const categories = ["Technology", "STEM", "Leadership", "Arts", "Diversity", "Environment", "Business", "Healthcare"]

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("available")
  const [applicationStatus, setApplicationStatus] = useState<any[]>([])
  const [successStories, setSuccessStories] = useState<any[]>([])
  const { toast } = useToast()

  // Load saved application data from localStorage
  useEffect(() => {
    const savedApplications = localStorage.getItem("scholarship_applications")
    if (savedApplications) {
      setApplicationStatus(JSON.parse(savedApplications))
    } else {
      // Default data if none exists
      setApplicationStatus([])
    }

    // Load success stories
    setSuccessStories([
      {
        id: 1,
        name: "Priya Sharma",
        scholarship: "Women in STEM Grant",
        amount: "$3,500",
        year: "2022",
        story:
          "The scholarship helped me focus on my studies without financial stress. I'm now working at a leading tech company.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 2,
        name: "Rahul Patel",
        scholarship: "Tech Innovators Scholarship",
        amount: "$5,000",
        year: "2021",
        story:
          "This scholarship funded my final year project which won a national innovation award. I'm now pursuing my Master's degree.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 3,
        name: "Ananya Singh",
        scholarship: "Global Leaders Scholarship",
        amount: "$10,000",
        year: "2022",
        story:
          "The scholarship allowed me to study abroad for a semester, broadening my perspective and building international connections.",
        image: "/placeholder.svg?height=200&width=200",
      },
    ])
  }, [])

  // Filter scholarships based on search and filters
  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || scholarship.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Handle scholarship application
  const handleApplyScholarship = (scholarship: any) => {
    // Check if already applied
    const alreadyApplied = applicationStatus.some((app) => app.id === scholarship.id)

    if (alreadyApplied) {
      toast({
        title: "Already Applied",
        description: "You have already applied for this scholarship.",
        variant: "destructive",
      })
      return
    }

    // Create new application
    const newApplication = {
      id: scholarship.id,
      title: scholarship.title,
      provider: scholarship.provider,
      status: "Under Review",
      appliedDate: new Date().toLocaleDateString(),
      amount: scholarship.amount,
      progress: 50,
    }

    // Add to applications
    const updatedApplications = [...applicationStatus, newApplication]
    setApplicationStatus(updatedApplications)

    // Save to localStorage
    localStorage.setItem("scholarship_applications", JSON.stringify(updatedApplications))

    toast({
      title: "Application Submitted",
      description: "Your scholarship application has been submitted successfully!",
    })
  }

  // Handle document upload
  const handleUploadDocuments = (applicationId: number) => {
    // Update application status
    const updatedApplications = applicationStatus.map((app) => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: "Under Review",
          progress: 75,
        }
      }
      return app
    })

    setApplicationStatus(updatedApplications)
    localStorage.setItem("scholarship_applications", JSON.stringify(updatedApplications))

    toast({
      title: "Documents Uploaded",
      description: "Your documents have been uploaded successfully!",
    })
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Scholarships & Financial Aid</h1>
        <p className="text-muted-foreground">
          Discover scholarships and financial aid opportunities tailored to your profile
        </p>
      </div>

      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available Scholarships</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="success">Success Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Filters</CardTitle>
                  <CardDescription>Refine your scholarship search</CardDescription>
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
                  <CardTitle>Scholarship Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Award className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Complete your profile to improve matching</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Apply early before deadlines</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Prepare required documents in advance</p>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/profile">Complete Your Profile</Link>
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
                    placeholder="Search scholarships..."
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

              {/* Scholarship Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredScholarships.length > 0 ? (
                  filteredScholarships.map((scholarship) => (
                    <motion.div key={scholarship.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                      <Card className="h-full flex flex-col overflow-hidden">
                        <div className="relative h-48 w-full">
                          <Image
                            src={scholarship.image || "/placeholder.svg"}
                            alt={scholarship.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary">{scholarship.match}% Match</Badge>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-foreground">
                              {scholarship.category}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{scholarship.title}</CardTitle>
                            <Badge variant="outline" className="ml-2">
                              <DollarSign className="h-3 w-3 mr-1" />
                              {scholarship.amount}
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {scholarship.provider}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2 flex-grow">
                          <p className="text-sm text-muted-foreground mb-4">{scholarship.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                Deadline: <span className="font-medium">{scholarship.deadline}</span>
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Eligibility:</p>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {scholarship.eligibility.map((item, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2 border-t">
                          <Button className="w-full" onClick={() => handleApplyScholarship(scholarship)}>
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
                    <h3 className="text-xl font-medium mb-2">No scholarships found</h3>
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

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Scholarship Applications</CardTitle>
              <CardDescription>Track the status of your applications</CardDescription>
            </CardHeader>
            <CardContent>
              {applicationStatus.length > 0 ? (
                <div className="space-y-6">
                  {applicationStatus.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div className="space-y-1">
                          <h3 className="font-medium">{application.title}</h3>
                          <p className="text-sm text-muted-foreground">{application.provider}</p>
                          <div className="flex items-center space-x-2 text-xs">
                            <Badge variant="outline">{application.amount}</Badge>
                            <span className="text-muted-foreground">Applied: {application.appliedDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end space-y-2">
                          <Badge
                            className={
                              application.status === "Approved"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : application.status === "Under Review"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            }
                          >
                            {application.status}
                          </Badge>
                          <Button
                            variant={application.status === "Documents Required" ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              application.status === "Documents Required" && handleUploadDocuments(application.id)
                            }
                          >
                            {application.status === "Approved"
                              ? "View Details"
                              : application.status === "Under Review"
                                ? "Check Status"
                                : "Upload Documents"}
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Application Progress</span>
                          <span>{application.progress}%</span>
                        </div>
                        <Progress value={application.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't applied to any scholarships yet. Browse available scholarships and apply now.
                  </p>
                  <Button onClick={() => setActiveTab("available")}>Browse Scholarships</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Scholarships</CardTitle>
              <CardDescription>Based on your profile and interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scholarships.slice(0, 4).map((scholarship) => (
                  <Card key={scholarship.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-medium">{scholarship.title}</h3>
                          <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
                          <div className="flex items-center space-x-2 text-xs">
                            <Badge variant="outline">{scholarship.amount}</Badge>
                            <span className="text-muted-foreground">Deadline: {scholarship.deadline}</span>
                          </div>
                        </div>
                        <Badge>{scholarship.match}% Match</Badge>
                      </div>
                      <Button className="w-full mt-4" onClick={() => handleApplyScholarship(scholarship)}>
                        Apply
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="success" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Success Stories</CardTitle>
              <CardDescription>How scholarships have helped students achieve their goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStories.map((story) => (
                  <Card key={story.id} className="border overflow-hidden">
                    <div className="relative h-48">
                      <Image src={story.image || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-medium">{story.name}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{story.scholarship}</p>
                            <Badge variant="outline">{story.year}</Badge>
                          </div>
                          <Badge>{story.amount}</Badge>
                        </div>
                        <p className="text-sm">{story.story}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Impact Statistics</CardTitle>
              <CardDescription>The difference scholarships make</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <Card className="border">
                  <CardContent className="p-6">
                    <GraduationCap className="h-10 w-10 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">500+</div>
                    <p className="text-sm text-muted-foreground">Students Supported</p>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-6">
                    <DollarSign className="h-10 w-10 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">$2M+</div>
                    <p className="text-sm text-muted-foreground">Scholarship Funds</p>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-6">
                    <Building className="h-10 w-10 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">50+</div>
                    <p className="text-sm text-muted-foreground">Partner Organizations</p>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-6">
                    <Globe className="h-10 w-10 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">85%</div>
                    <p className="text-sm text-muted-foreground">Graduation Rate</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Become a Success Story</CardTitle>
              <CardDescription>Start your scholarship journey today</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">
                Apply for scholarships that match your profile and take the first step towards achieving your
                educational goals.
              </p>
              <Button asChild size="lg">
                <Link href="#available" onClick={() => setActiveTab("available")}>
                  Browse Scholarships <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

