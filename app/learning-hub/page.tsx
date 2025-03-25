"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  BookOpen,
  Youtube,
  Globe,
  Clock,
  Star,
  ArrowRight,
  Bookmark,
  BookMarked,
  Play,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data
const courses = [
  {
    id: "1", // Changed from 1 to "1" to match the string IDs in course detail page
    title: "Introduction to Web Development",
    description: "Learn HTML, CSS, and JavaScript fundamentals",
    platform: "Khan Academy",
    category: "Web Development",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.8,
    enrolled: 12500,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2400&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "2", // Changed from 2 to "2" to match the string IDs in course detail page
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis and visualization",
    platform: "Coursera",
    category: "Data Science",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.6,
    enrolled: 9800,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2400&auto=format&fit=crop",
    tags: ["Python", "Statistics", "Data Visualization"],
  },
  {
    id: "3", // Changed from 3 to "3" and we'll add this course to the course detail page
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps",
    platform: "YouTube",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.7,
    enrolled: 7500,
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2400&auto=format&fit=crop",
    tags: ["React Native", "JavaScript", "Mobile"],
  },
  {
    id: "4", // Changed from 4 to "4" and we'll add this course to the course detail page
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms",
    platform: "MIT OpenCourseWare",
    category: "AI & Machine Learning",
    level: "Advanced",
    duration: "12 weeks",
    rating: 4.9,
    enrolled: 15000,
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2400&auto=format&fit=crop",
    tags: ["Python", "ML Algorithms", "Data Science"],
  },
  {
    id: "5", // Changed from 5 to "5" and we'll add this course to the course detail page
    title: "UI/UX Design Principles",
    description: "Learn user interface and experience design",
    platform: "Coursera",
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.5,
    enrolled: 8200,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2400&auto=format&fit=crop",
    tags: ["UI Design", "UX Research", "Figma"],
  },
  {
    id: "6", // Changed from 6 to "6" and we'll add this course to the course detail page
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into JavaScript programming",
    platform: "YouTube",
    category: "Web Development",
    level: "Advanced",
    duration: "8 weeks",
    rating: 4.7,
    enrolled: 11000,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2400&auto=format&fit=crop",
    tags: ["JavaScript", "ES6", "Async/Await"],
  },
]

const categories = [
  "Web Development",
  "Data Science",
  "Mobile Development",
  "AI & Machine Learning",
  "Design",
  "Business",
  "Marketing",
]

const platforms = [
  { name: "Khan Academy", icon: <Globe className="h-4 w-4" /> },
  { name: "Coursera", icon: <Globe className="h-4 w-4" /> },
  { name: "YouTube", icon: <Youtube className="h-4 w-4" /> },
  { name: "MIT OpenCourseWare", icon: <BookOpen className="h-4 w-4" /> },
]

const levels = ["Beginner", "Intermediate", "Advanced"]

export default function LearningHubPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [savedCourses, setSavedCourses] = useState<number[]>([])

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || course.category === selectedCategory
    const matchesPlatform = !selectedPlatform || course.platform === selectedPlatform
    const matchesLevel = !selectedLevel || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesPlatform && matchesLevel
  })

  const toggleSavedCourse = (courseId: string) => {
    if (savedCourses.includes(Number(courseId))) {
      setSavedCourses(savedCourses.filter((id) => id !== Number(courseId)))
    } else {
      setSavedCourses([...savedCourses, Number(courseId)])
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Learning Hub</h1>
        <p className="text-muted-foreground">Discover free courses from top platforms and start learning today</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your course search</CardDescription>
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

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Platforms</h3>
                <div className="space-y-1">
                  {platforms.map((platform) => (
                    <Button
                      key={platform.name}
                      variant={selectedPlatform === platform.name ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-sm"
                      onClick={() => setSelectedPlatform(selectedPlatform === platform.name ? null : platform.name)}
                    >
                      <span className="mr-2">{platform.icon}</span>
                      {platform.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Level</h3>
                <div className="space-y-1">
                  {levels.map((level) => (
                    <Button
                      key={level}
                      variant={selectedLevel === level ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-sm"
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedPlatform(null)
                  setSelectedLevel(null)
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Have questions about courses or need personalized recommendations?
              </p>
              <Button asChild className="w-full">
                <Link href="/learning-hub/doubt-solver">Ask AI Doubt Solver</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Search and Tabs */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
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

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="popular">Most Popular</TabsTrigger>
                <TabsTrigger value="new">Newly Added</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <motion.div key={course.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full flex flex-col overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-primary/90 text-white hover:bg-primary/100 hover:scale-110 transition-transform"
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                          onClick={() => toggleSavedCourse(course.id)}
                        >
                          {savedCourses.includes(Number(course.id)) ? (
                            <BookMarked className="h-4 w-4 text-primary" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/80">
                          {course.platform}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {course.category}
                        </Badge>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <div className="flex flex-wrap gap-1">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 border-t">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                          {course.rating}
                        </div>
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/learning-hub/course/${course.id}`}>
                          Enroll <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
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
                <h3 className="text-xl font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                    setSelectedPlatform(null)
                    setSelectedLevel(null)
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

