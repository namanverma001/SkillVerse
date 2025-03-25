"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Clock,
  Star,
  Users,
  Award,
  CheckCircle,
  Play,
  FileText,
  MessageSquare,
  Download,
  Share2,
  Heart,
  Calendar,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import EnrollmentModal from "@/components/enrollment-modal"

// Update the courses array to include thumbnails for all courses

const courses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn HTML, CSS, and JavaScript fundamentals to build responsive websites from scratch.",
    longDescription:
      "This comprehensive course covers all the essential skills needed to start your journey as a web developer. You'll learn how to structure web pages with HTML, style them with CSS, and add interactivity with JavaScript. By the end of this course, you'll be able to build responsive websites that work across different devices and screen sizes.",
    platform: "Khan Academy",
    instructor: "Sarah Johnson",
    instructorTitle: "Senior Web Developer",
    instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2400&auto=format&fit=crop",
    category: "Web Development",
    level: "Beginner",
    duration: "6 weeks",
    totalHours: 24,
    totalLessons: 36,
    rating: 4.8,
    reviews: 1250,
    enrolled: 12500,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2400&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript"],
    price: "Free",
    syllabus: [
      {
        title: "Getting Started with HTML",
        lessons: [
          { title: "Introduction to HTML", duration: "15 min", type: "video" },
          { title: "HTML Document Structure", duration: "20 min", type: "video" },
          { title: "Working with Text Elements", duration: "25 min", type: "video" },
          { title: "HTML Practice Exercise", duration: "30 min", type: "exercise" },
        ],
      },
      {
        title: "CSS Fundamentals",
        lessons: [
          { title: "Introduction to CSS", duration: "15 min", type: "video" },
          { title: "Selectors and Properties", duration: "25 min", type: "video" },
          { title: "Box Model Explained", duration: "20 min", type: "video" },
          { title: "CSS Styling Exercise", duration: "30 min", type: "exercise" },
        ],
      },
      {
        title: "JavaScript Basics",
        lessons: [
          { title: "Introduction to JavaScript", duration: "20 min", type: "video" },
          { title: "Variables and Data Types", duration: "25 min", type: "video" },
          { title: "Functions and Events", duration: "30 min", type: "video" },
          { title: "JavaScript Coding Challenge", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Building Responsive Layouts",
        lessons: [
          { title: "Responsive Design Principles", duration: "20 min", type: "video" },
          { title: "Media Queries", duration: "25 min", type: "video" },
          { title: "Flexbox Layout", duration: "30 min", type: "video" },
          { title: "Responsive Website Project", duration: "60 min", type: "project" },
        ],
      },
    ],
    requirements: [
      "Basic computer skills",
      "No prior programming experience required",
      "A computer with internet access",
      "Text editor (VS Code recommended)",
    ],
    outcomes: [
      "Build responsive websites from scratch",
      "Understand HTML document structure and elements",
      "Style web pages using CSS",
      "Add interactivity with JavaScript",
      "Deploy websites to the internet",
    ],
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
    description: "Introduction to data analysis and visualization using Python and popular libraries.",
    longDescription:
      "This course provides a comprehensive introduction to data science, covering the essential tools and techniques used by data scientists. You'll learn Python programming, data manipulation with pandas, data visualization with matplotlib and seaborn, and basic statistical analysis. By the end of this course, you'll be able to analyze real-world datasets and extract meaningful insights.",
    platform: "Coursera",
    instructor: "Dr. Michael Chen",
    instructorTitle: "Data Scientist & Professor",
    instructorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2400&auto=format&fit=crop",
    category: "Data Science",
    level: "Intermediate",
    duration: "8 weeks",
    totalHours: 32,
    totalLessons: 42,
    rating: 4.6,
    reviews: 980,
    enrolled: 9800,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2400&auto=format&fit=crop",
    tags: ["Python", "Statistics", "Data Visualization"],
    price: "Free",
    syllabus: [
      {
        title: "Introduction to Python for Data Science",
        lessons: [
          { title: "Python Basics", duration: "20 min", type: "video" },
          { title: "Data Structures in Python", duration: "25 min", type: "video" },
          { title: "NumPy Arrays", duration: "30 min", type: "video" },
          { title: "Python Coding Exercise", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Data Manipulation with Pandas",
        lessons: [
          { title: "Introduction to Pandas", duration: "20 min", type: "video" },
          { title: "DataFrames and Series", duration: "25 min", type: "video" },
          { title: "Data Cleaning Techniques", duration: "30 min", type: "video" },
          { title: "Pandas Practice Exercise", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Data Visualization",
        lessons: [
          { title: "Matplotlib Basics", duration: "20 min", type: "video" },
          { title: "Seaborn for Statistical Visualization", duration: "25 min", type: "video" },
          { title: "Creating Interactive Visualizations", duration: "30 min", type: "video" },
          { title: "Visualization Project", duration: "60 min", type: "project" },
        ],
      },
      {
        title: "Statistical Analysis",
        lessons: [
          { title: "Descriptive Statistics", duration: "20 min", type: "video" },
          { title: "Hypothesis Testing", duration: "30 min", type: "video" },
          { title: "Correlation and Regression", duration: "35 min", type: "video" },
          { title: "Final Data Analysis Project", duration: "90 min", type: "project" },
        ],
      },
    ],
    requirements: [
      "Basic programming knowledge",
      "Understanding of algebra and basic statistics",
      "Computer with Python installed",
      "Jupyter Notebook (installation instructions provided)",
    ],
    outcomes: [
      "Analyze and manipulate data using Python",
      "Create insightful data visualizations",
      "Perform basic statistical analysis",
      "Clean and preprocess raw data",
      "Extract meaningful insights from datasets",
    ],
    badge: {
      name: "Data Science Explorer",
      description: "Awarded for mastering the fundamentals of data science",
      image: "/placeholder.svg?height=200&width=200",
      level: "Intermediate",
    },
  },
  {
    id: "3",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps for iOS and Android using React Native.",
    longDescription:
      "This course teaches you how to build mobile applications that work on both iOS and Android using React Native. You'll learn component-based architecture, state management, navigation, and how to access native device features. By the end of this course, you'll be able to create and deploy your own mobile applications.",
    platform: "YouTube",
    instructor: "Alex Rodriguez",
    instructorTitle: "Mobile App Developer",
    instructorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2400&auto=format&fit=crop",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "10 weeks",
    totalHours: 40,
    totalLessons: 48,
    rating: 4.7,
    reviews: 850,
    enrolled: 7500,
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2400&auto=format&fit=crop",
    tags: ["React Native", "JavaScript", "Mobile"],
    price: "Free",
    syllabus: [
      {
        title: "React Native Fundamentals",
        lessons: [
          { title: "Introduction to React Native", duration: "20 min", type: "video" },
          { title: "Setting Up Your Development Environment", duration: "30 min", type: "video" },
          { title: "Components and Props", duration: "25 min", type: "video" },
          { title: "Your First React Native App", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Styling and Layout",
        lessons: [
          { title: "Flexbox in React Native", duration: "25 min", type: "video" },
          { title: "Styling Components", duration: "20 min", type: "video" },
          { title: "Responsive Design for Mobile", duration: "30 min", type: "video" },
          { title: "Styling Challenge", duration: "40 min", type: "exercise" },
        ],
      },
      {
        title: "Navigation and State Management",
        lessons: [
          { title: "React Navigation", duration: "35 min", type: "video" },
          { title: "Managing State with Hooks", duration: "30 min", type: "video" },
          { title: "Context API and Redux", duration: "40 min", type: "video" },
          { title: "Navigation Project", duration: "60 min", type: "project" },
        ],
      },
      {
        title: "Native Device Features",
        lessons: [
          { title: "Camera and Image Picker", duration: "25 min", type: "video" },
          { title: "Geolocation and Maps", duration: "30 min", type: "video" },
          { title: "Push Notifications", duration: "25 min", type: "video" },
          { title: "Final Mobile App Project", duration: "90 min", type: "project" },
        ],
      },
    ],
    requirements: [
      "Basic knowledge of JavaScript",
      "Familiarity with React",
      "Computer with Node.js installed",
      "Android Studio or Xcode (optional)",
    ],
    outcomes: [
      "Build cross-platform mobile apps",
      "Implement responsive UI for mobile devices",
      "Manage application state effectively",
      "Access native device features",
      "Deploy apps to app stores",
    ],
    badge: {
      name: "Mobile App Developer",
      description: "Awarded for mastering React Native mobile development",
      image: "/placeholder.svg?height=200&width=200",
      level: "Intermediate",
    },
  },
  {
    id: "4",
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms and their applications.",
    longDescription:
      "This course provides a solid foundation in machine learning concepts and techniques. You'll learn about supervised and unsupervised learning, model evaluation, and how to implement popular algorithms. Through hands-on projects, you'll gain practical experience applying machine learning to real-world problems.",
    platform: "MIT OpenCourseWare",
    instructor: "Dr. Emily Zhang",
    instructorTitle: "AI Researcher & Professor",
    instructorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2400&auto=format&fit=crop",
    category: "AI & Machine Learning",
    level: "Advanced",
    duration: "12 weeks",
    totalHours: 48,
    totalLessons: 52,
    rating: 4.9,
    reviews: 1100,
    enrolled: 15000,
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2400&auto=format&fit=crop",
    tags: ["Python", "ML Algorithms", "Data Science"],
    price: "Free",
    syllabus: [
      {
        title: "Introduction to Machine Learning",
        lessons: [
          { title: "What is Machine Learning?", duration: "25 min", type: "video" },
          { title: "Types of Machine Learning", duration: "30 min", type: "video" },
          { title: "The Machine Learning Workflow", duration: "35 min", type: "video" },
          { title: "Setting Up Your ML Environment", duration: "40 min", type: "exercise" },
        ],
      },
      {
        title: "Supervised Learning",
        lessons: [
          { title: "Linear Regression", duration: "40 min", type: "video" },
          { title: "Classification Algorithms", duration: "45 min", type: "video" },
          { title: "Decision Trees and Random Forests", duration: "35 min", type: "video" },
          { title: "Supervised Learning Project", duration: "60 min", type: "exercise" },
        ],
      },
      {
        title: "Unsupervised Learning",
        lessons: [
          { title: "Clustering Algorithms", duration: "30 min", type: "video" },
          { title: "Dimensionality Reduction", duration: "35 min", type: "video" },
          { title: "Anomaly Detection", duration: "25 min", type: "video" },
          { title: "Unsupervised Learning Project", duration: "60 min", type: "project" },
        ],
      },
      {
        title: "Model Evaluation and Deployment",
        lessons: [
          { title: "Metrics for Model Evaluation", duration: "30 min", type: "video" },
          { title: "Cross-Validation Techniques", duration: "25 min", type: "video" },
          { title: "Model Deployment Basics", duration: "35 min", type: "video" },
          { title: "Final Machine Learning Project", duration: "90 min", type: "project" },
        ],
      },
    ],
    requirements: [
      "Intermediate Python programming skills",
      "Basic understanding of statistics",
      "Knowledge of linear algebra (recommended)",
      "Computer with Python and necessary libraries installed",
    ],
    outcomes: [
      "Understand core machine learning concepts",
      "Implement supervised and unsupervised learning algorithms",
      "Evaluate and improve model performance",
      "Apply machine learning to real-world problems",
      "Deploy machine learning models",
    ],
    badge: {
      name: "Machine Learning Practitioner",
      description: "Awarded for mastering fundamental machine learning techniques",
      image: "/placeholder.svg?height=200&width=200",
      level: "Advanced",
    },
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    description: "Learn user interface and experience design fundamentals for digital products.",
    longDescription:
      "This course covers the essential principles of UI/UX design for creating user-friendly digital products. You'll learn design thinking, user research methods, wireframing, prototyping, and usability testing. By the end of this course, you'll be able to design intuitive and engaging user experiences.",
    platform: "Coursera",
    instructor: "Jessica Lee",
    instructorTitle: "Senior UX Designer",
    instructorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2400&auto=format&fit=crop",
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    totalHours: 24,
    totalLessons: 30,
    rating: 4.5,
    reviews: 920,
    enrolled: 8200,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2400&auto=format&fit=crop",
    tags: ["UI Design", "UX Research", "Figma"],
    price: "Free",
    syllabus: [
      {
        title: "Introduction to UI/UX Design",
        lessons: [
          { title: "What is UI/UX Design?", duration: "20 min", type: "video" },
          { title: "The Design Process", duration: "25 min", type: "video" },
          { title: "User-Centered Design", duration: "30 min", type: "video" },
          { title: "Design Thinking Exercise", duration: "35 min", type: "exercise" },
        ],
      },
      {
        title: "User Research and Personas",
        lessons: [
          { title: "User Research Methods", duration: "30 min", type: "video" },
          { title: "Creating User Personas", duration: "25 min", type: "video" },
          { title: "User Journey Mapping", duration: "35 min", type: "video" },
          { title: "Research and Persona Project", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Wireframing and Prototyping",
        lessons: [
          { title: "Introduction to Wireframing", duration: "20 min", type: "video" },
          { title: "Prototyping with Figma", duration: "40 min", type: "video" },
          { title: "Interactive Prototypes", duration: "35 min", type: "video" },
          { title: "Wireframing Project", duration: "50 min", type: "project" },
        ],
      },
      {
        title: "Visual Design and Testing",
        lessons: [
          { title: "Visual Design Principles", duration: "25 min", type: "video" },
          { title: "Typography and Color Theory", duration: "30 min", type: "video" },
          { title: "Usability Testing", duration: "35 min", type: "video" },
          { title: "Final UI/UX Design Project", duration: "60 min", type: "project" },
        ],
      },
    ],
    requirements: [
      "No prior design experience required",
      "Basic computer skills",
      "Figma account (free)",
      "Interest in design and user experience",
    ],
    outcomes: [
      "Understand UI/UX design fundamentals",
      "Conduct effective user research",
      "Create wireframes and prototypes",
      "Apply visual design principles",
      "Test and iterate on designs",
    ],
    badge: {
      name: "UI/UX Design Fundamentals",
      description: "Awarded for mastering the basics of user interface and experience design",
      image: "/placeholder.svg?height=200&width=200",
      level: "Beginner",
    },
  },
  {
    id: "6",
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into advanced JavaScript programming concepts and patterns.",
    longDescription:
      "This course explores advanced JavaScript concepts that take your programming skills to the next level. You'll learn about closures, prototypes, asynchronous programming, design patterns, and modern ES6+ features. By the end of this course, you'll be able to write more efficient, maintainable, and sophisticated JavaScript code.",
    platform: "YouTube",
    instructor: "David Wilson",
    instructorTitle: "JavaScript Architect",
    instructorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=2400&auto=format&fit=crop",
    category: "Web Development",
    level: "Advanced",
    duration: "8 weeks",
    totalHours: 32,
    totalLessons: 40,
    rating: 4.7,
    reviews: 950,
    enrolled: 11000,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2400&auto=format&fit=crop",
    tags: ["JavaScript", "ES6", "Async/Await"],
    price: "Free",
    syllabus: [
      {
        title: "JavaScript Under the Hood",
        lessons: [
          { title: "Execution Context and Call Stack", duration: "35 min", type: "video" },
          { title: "Scope and Closures", duration: "40 min", type: "video" },
          { title: "this Keyword and Binding", duration: "30 min", type: "video" },
          { title: "Advanced Scope Exercise", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Object-Oriented JavaScript",
        lessons: [
          { title: "Prototypal Inheritance", duration: "35 min", type: "video" },
          { title: "ES6 Classes and Inheritance", duration: "30 min", type: "video" },
          { title: "Object Composition vs Inheritance", duration: "40 min", type: "video" },
          { title: "OOP Challenge", duration: "50 min", type: "exercise" },
        ],
      },
      {
        title: "Asynchronous JavaScript",
        lessons: [
          { title: "Callbacks and Promises", duration: "35 min", type: "video" },
          { title: "Async/Await", duration: "30 min", type: "video" },
          { title: "Event Loop Deep Dive", duration: "45 min", type: "video" },
          { title: "Async Programming Project", duration: "60 min", type: "project" },
        ],
      },
      {
        title: "Modern JavaScript Patterns",
        lessons: [
          { title: "Module Pattern and ES Modules", duration: "30 min", type: "video" },
          { title: "Functional Programming Concepts", duration: "40 min", type: "video" },
          { title: "Performance Optimization", duration: "35 min", type: "video" },
          { title: "Final JavaScript Project", duration: "90 min", type: "project" },
        ],
      },
    ],
    requirements: [
      "Intermediate JavaScript knowledge",
      "Understanding of basic programming concepts",
      "Familiarity with ES6 syntax",
      "Experience with web development",
    ],
    outcomes: [
      "Master advanced JavaScript concepts",
      "Write more efficient and maintainable code",
      "Implement modern design patterns",
      "Handle asynchronous operations effectively",
      "Debug complex JavaScript applications",
    ],
    badge: {
      name: "Advanced JavaScript Mastery",
      description: "Awarded for mastering advanced JavaScript concepts and patterns",
      image: "/placeholder.svg?height=200&width=200",
      level: "Advanced",
    },
  },
]

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string

  const [course, setCourse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch course details
    const fetchCourse = () => {
      setIsLoading(true)
      setTimeout(() => {
        const foundCourse = courses.find((c) => c.id === courseId)
        if (foundCourse) {
          setCourse(foundCourse)
        } else {
          router.push("/learning-hub")
        }
        setIsLoading(false)
      }, 500)
    }

    fetchCourse()

    // Check if user is enrolled (from local storage in this demo)
    const checkEnrollment = () => {
      const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]")
      const enrolled = enrolledCourses.includes(courseId)
      setIsEnrolled(enrolled)

      if (enrolled) {
        const courseProgress = JSON.parse(localStorage.getItem(`course_${courseId}_progress`) || "0")
        setProgress(courseProgress)
      }
    }

    checkEnrollment()
  }, [courseId, router])

  const handleEnroll = () => {
    // Save enrollment to local storage
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "[]")
    if (!enrolledCourses.includes(courseId)) {
      enrolledCourses.push(courseId)
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses))
      localStorage.setItem(`course_${courseId}_progress`, "0")
      setIsEnrolled(true)
      setProgress(0)
    }

    setShowEnrollmentModal(false)

    // Redirect to course content
    router.push(`/learning-hub/course/${courseId}/learn`)
  }

  if (isLoading || !course) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/30 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    )
  }

  // Map course ID to appropriate video URL
  const getCourseVideoUrl = (courseId: string) => {
    switch (courseId) {
      case "1": // Web Development
        return "https://www.youtube.com/embed/UB1O30fR-EE" // HTML Document Structure
      case "2": // Data Science
        return "https://www.youtube.com/embed/vmEHCJofslg" // Pandas Intro
      case "3": // React Native
        return "https://www.youtube.com/embed/0-S5a0eXPoc" // React Native Intro
      case "4": // Machine Learning
        return "https://www.youtube.com/embed/ukzFI9rgwfU" // ML Intro
      case "5": // UI/UX Design
        return "https://www.youtube.com/embed/c9Wg6Cb_YlU" // UI/UX Design Intro
      case "6": // Advanced JavaScript
        return "https://www.youtube.com/embed/8aGhZQkoFbQ" // JS Event Loop
      default:
        return "https://www.youtube.com/embed/UB1O30fR-EE"
    }
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/learning-hub")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Courses
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src={getCourseVideoUrl(course.id)}
                    title={course.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none flex items-end">
                  <div className="p-6 text-white">
                    <Badge className="mb-2 bg-primary">{course.level}</Badge>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
                    <p className="text-white/80">{course.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About This Course</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{course.longDescription}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                    <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
                      <Clock className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
                      <BookOpen className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Lessons</span>
                      <span className="font-medium">{course.totalLessons}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
                      <Users className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Enrolled</span>
                      <span className="font-medium">{course.enrolled.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
                      <Star className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <span className="font-medium">
                        {course.rating} ({course.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {course.outcomes.map((outcome: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium">Requirements</h3>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-medium">Course Badge</h3>
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="relative h-16 w-16 overflow-hidden">
                        <Image
                          src={course.badge.image || "/placeholder.svg"}
                          alt={course.badge.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{course.badge.name}</h4>
                        <p className="text-sm text-muted-foreground">{course.badge.description}</p>
                        <Badge variant="outline" className={`mt-2 badge-${course.badge.level.toLowerCase()}`}>
                          {course.badge.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    {course.totalLessons} lessons • {course.totalHours} hours of content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.syllabus.map((section: any, sectionIndex: number) => (
                    <div key={sectionIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">{section.title}</h3>
                        <span className="text-sm text-muted-foreground">{section.lessons.length} lessons</span>
                      </div>
                      <div className="border rounded-md overflow-hidden">
                        {section.lessons.map((lesson: any, lessonIndex: number) => (
                          <div
                            key={lessonIndex}
                            className={`flex justify-between items-center p-3 ${
                              lessonIndex !== section.lessons.length - 1 ? "border-b" : ""
                            }`}
                          >
                            <div className="flex items-center">
                              {lesson.type === "video" ? (
                                <Play className="h-4 w-4 text-primary mr-3" />
                              ) : lesson.type === "exercise" ? (
                                <FileText className="h-4 w-4 text-primary mr-3" />
                              ) : (
                                <Award className="h-4 w-4 text-primary mr-3" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                {lesson.type}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructor" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About the Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={course.instructorImage} alt={course.instructor} />
                      <AvatarFallback>
                        {course.instructor
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-4 text-center md:text-left">
                      <div>
                        <h3 className="text-xl font-medium">{course.instructor}</h3>
                        <p className="text-muted-foreground">{course.instructorTitle}</p>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam
                        ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc, quis aliquam nisl nunc quis nisl.
                        Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis
                        nisl.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <Badge variant="secondary">
                          <Users className="h-3 w-3 mr-1" />
                          25+ Courses
                        </Badge>
                        <Badge variant="secondary">
                          <Star className="h-3 w-3 mr-1" />
                          4.8 Instructor Rating
                        </Badge>
                        <Badge variant="secondary">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          15,000+ Reviews
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <CardDescription>
                    {course.reviews} reviews • {course.rating} average rating
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary">{course.rating}</div>
                      <div className="flex items-center justify-center mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(course.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : i < course.rating
                                  ? "text-yellow-500 fill-yellow-500 opacity-50"
                                  : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{course.reviews} ratings</p>
                    </div>

                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage =
                          rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1
                        return (
                          <div key={rating} className="flex items-center gap-4">
                            <div className="flex items-center w-20">
                              <span className="mr-2">{rating}</span>
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            </div>
                            <Progress value={percentage} className="h-2 flex-1" />
                            <span className="text-sm text-muted-foreground w-12 text-right">{percentage}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    {/* Sample reviews */}
                    {[
                      {
                        name: "Alex Thompson",
                        rating: 5,
                        date: "2 months ago",
                        comment:
                          "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. I've already started applying what I learned to my projects.",
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "Jamie Rodriguez",
                        rating: 4,
                        date: "3 months ago",
                        comment:
                          "Great content and well-structured curriculum. I would have liked more practical exercises, but overall it was very informative and helpful.",
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "Taylor Kim",
                        rating: 5,
                        date: "1 month ago",
                        comment:
                          "As a beginner, I found this course perfect for my skill level. The instructor takes time to explain everything clearly and the projects helped reinforce what I learned.",
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                    ].map((review, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={review.avatar} alt={review.name} />
                              <AvatarFallback>
                                {review.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{review.name}</h4>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="sticky top-20">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold">{course.price}</h2>
                    {isEnrolled && (
                      <div className="mt-2">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        >
                          Enrolled
                        </Badge>
                      </div>
                    )}
                  </div>

                  {isEnrolled ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Your progress</span>
                          <span>{progress}% complete</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/learning-hub/course/${courseId}/learn`}>
                          {progress > 0 ? "Continue Learning" : "Start Learning"}
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full" onClick={() => setShowEnrollmentModal(true)}>
                      Enroll Now
                    </Button>
                  )}

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium text-center">This course includes:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Play className="h-4 w-4 text-primary mr-2" />
                        <span>{course.totalHours} hours on-demand video</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 text-primary mr-2" />
                        <span>
                          {course.syllabus.reduce(
                            (acc: number, section: any) =>
                              acc +
                              section.lessons.filter((l: any) => l.type === "exercise" || l.type === "project").length,
                            0,
                          )}{" "}
                          practical exercises
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Download className="h-4 w-4 text-primary mr-2" />
                        <span>Downloadable resources</span>
                      </li>
                      <li className="flex items-center">
                        <Award className="h-4 w-4 text-primary mr-2" />
                        <span>Certificate of completion</span>
                      </li>
                      <li className="flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span>Lifetime access</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-center space-x-2 pt-4 border-t">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <EnrollmentModal
        isOpen={showEnrollmentModal}
        onClose={() => setShowEnrollmentModal(false)}
        onEnroll={handleEnroll}
        course={course}
      />
    </div>
  )
}

