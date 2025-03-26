"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Play, FileText, Award, CheckCircle, AlertCircle, BookOpen } from "lucide-react"
import Link from "next/link"
import BadgeAchievedModal from "@/components/badge-achieved-modal"
import CertificateModal from "@/components/certificate-modal"
import NotesModal from "@/components/notes-modal"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

// Mock course data (same as in course detail page)
const courses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn HTML, CSS, and JavaScript fundamentals to build responsive websites from scratch.",
    platform: "Khan Academy",
    instructor: "Sarah Johnson",
    category: "Web Development",
    level: "Beginner",
    duration: "6 weeks",
    totalHours: 24,
    totalLessons: 36,
    image: "/placeholder.svg?height=400&width=600",
    syllabus: [
      {
        title: "Getting Started with HTML",
        lessons: [
          {
            id: "1-1-1",
            title: "Introduction to HTML",
            duration: "15 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
          },
          {
            id: "1-1-2",
            title: "HTML Document Structure",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
          },
          {
            id: "1-1-3",
            title: "Working with Text Elements",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/HJ0Hx9WX-6I",
          },
          { id: "1-1-4", title: "HTML Practice Exercise", duration: "30 min", type: "exercise" },
        ],
      },
      {
        title: "CSS Fundamentals",
        lessons: [
          {
            id: "1-2-1",
            title: "Introduction to CSS",
            duration: "15 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/1PnVor36_40",
          },
          {
            id: "1-2-2",
            title: "Selectors and Properties",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/QT_EIrSGrbw",
          },
          {
            id: "1-2-3",
            title: "Box Model Explained",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/rIO5326FgPE",
          },
          { id: "1-2-4", title: "CSS Styling Exercise", duration: "30 min", type: "exercise" },
        ],
      },
      {
        title: "JavaScript Basics",
        lessons: [
          {
            id: "1-3-1",
            title: "Introduction to JavaScript",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
          },
          {
            id: "1-3-2",
            title: "Variables and Data Types",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/9Yk6Kf4RdQA",
          },
          {
            id: "1-3-3",
            title: "Functions and Events",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/e57ReoUn6kM",
          },
          { id: "1-3-4", title: "JavaScript Coding Challenge", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Building Responsive Layouts",
        lessons: [
          {
            id: "1-4-1",
            title: "Responsive Design Principles",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/srvUrASNj0s",
          },
          {
            id: "1-4-2",
            title: "Media Queries",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/2KL-z9A56SQ",
          },
          {
            id: "1-4-3",
            title: "Flexbox Layout",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/fYq5PXgSsbE",
          },
          { id: "1-4-4", title: "Responsive Website Project", duration: "60 min", type: "project" },
        ],
      },
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
    platform: "Coursera",
    instructor: "Dr. Michael Chen",
    category: "Data Science",
    level: "Intermediate",
    duration: "8 weeks",
    totalHours: 32,
    totalLessons: 42,
    image: "/placeholder.svg?height=400&width=600",
    syllabus: [
      {
        title: "Introduction to Python for Data Science",
        lessons: [
          {
            id: "2-1-1",
            title: "Python Basics",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
          },
          {
            id: "2-1-2",
            title: "Data Structures in Python",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/W8KRzm-HUcc",
          },
          {
            id: "2-1-3",
            title: "NumPy Arrays",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/QUT1VHiLmmI",
          },
          { id: "2-1-4", title: "Python Coding Exercise", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Data Manipulation with Pandas",
        lessons: [
          {
            id: "2-2-1",
            title: "Introduction to Pandas",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/vmEHCJofslg",
          },
          {
            id: "2-2-2",
            title: "DataFrames and Series",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/zmdjNSmRXF4",
          },
          {
            id: "2-2-3",
            title: "Data Cleaning Techniques",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/bDhvCp3_lYw",
          },
          { id: "2-2-4", title: "Pandas Practice Exercise", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Data Visualization",
        lessons: [
          {
            id: "2-3-1",
            title: "Matplotlib Basics",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/DAQNHzOcO5A",
          },
          {
            id: "2-3-2",
            title: "Seaborn for Statistical Visualization",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/GcXcSZ0gQps",
          },
          {
            id: "2-3-3",
            title: "Creating Interactive Visualizations",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/j9MgNwWABzA",
          },
          { id: "2-3-4", title: "Visualization Project", duration: "60 min", type: "project" },
        ],
      },
      {
        title: "Statistical Analysis",
        lessons: [
          {
            id: "2-4-1",
            title: "Descriptive Statistics",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/SzZ6GpcfoQY",
          },
          {
            id: "2-4-2",
            title: "Hypothesis Testing",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/0oc49DyA3hU",
          },
          {
            id: "2-4-3",
            title: "Correlation and Regression",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/qtaqvPAeEJY",
          },
          { id: "2-4-4", title: "Final Data Analysis Project", duration: "90 min", type: "project" },
        ],
      },
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
    platform: "YouTube",
    instructor: "Alex Rodriguez",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "10 weeks",
    totalHours: 40,
    totalLessons: 48,
    image: "/placeholder.svg?height=400&width=600",
    syllabus: [
      {
        title: "React Native Fundamentals",
        lessons: [
          {
            id: "3-1-1",
            title: "Introduction to React Native",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/0-S5a0eXPoc",
          },
          {
            id: "3-1-2",
            title: "Setting Up Your Development Environment",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/ur6I5m2nTvk",
          },
          {
            id: "3-1-3",
            title: "Components and Props",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/0pThnRneDjw",
          },
          { id: "3-1-4", title: "Your First React Native App", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Styling and Layout",
        lessons: [
          {
            id: "3-2-1",
            title: "Flexbox in React Native",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/R2eqAgR_KlU",
          },
          {
            id: "3-2-2",
            title: "Styling Components",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/DfLMZpMkZMQ",
          },
          {
            id: "3-2-3",
            title: "Responsive Design for Mobile",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/T4Uehk3_wlY",
          },
          { id: "3-2-4", title: "Styling Challenge", duration: "40 min", type: "exercise" },
        ],
      },
      {
        title: "Navigation and State Management",
        lessons: [
          {
            id: "3-3-1",
            title: "React Navigation",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/nQVCkqvU1uE",
          },
          {
            id: "3-3-2",
            title: "Managing State with Hooks",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
          },
          {
            id: "3-3-3",
            title: "Context API and Redux",
            duration: "40 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/9boMnm5X9ak",
          },
          { id: "3-3-4", title: "Navigation Project", duration: "60 min", type: "project" },
        ],
      },
      {
        title: "Native Device Features",
        lessons: [
          {
            id: "3-4-1",
            title: "Camera and Image Picker",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/3_ldEVWlL18",
          },
          {
            id: "3-4-2",
            title: "Geolocation and Maps",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/qlELLakgO8E",
          },
          {
            id: "3-4-3",
            title: "Push Notifications",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/wWL4vdxXFKs",
          },
          { id: "3-4-4", title: "Final Mobile App Project", duration: "90 min", type: "project" },
        ],
      },
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
    platform: "MIT OpenCourseWare",
    instructor: "Dr. Emily Zhang",
    category: "AI & Machine Learning",
    level: "Advanced",
    duration: "12 weeks",
    totalHours: 48,
    totalLessons: 52,
    image: "/placeholder.svg?height=400&width=600",
    syllabus: [
      {
        title: "Introduction to Machine Learning",
        lessons: [
          {
            id: "4-1-1",
            title: "What is Machine Learning?",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
          },
          {
            id: "4-1-2",
            title: "Types of Machine Learning",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/1rJGDW_sr9k",
          },
          {
            id: "4-1-3",
            title: "The Machine Learning Workflow",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/aCULcv_IQYw",
          },
          { id: "4-1-4", title: "Setting Up Your ML Environment", duration: "40 min", type: "exercise" },
        ],
      },
      {
        title: "Supervised Learning",
        lessons: [
          {
            id: "4-2-1",
            title: "Linear Regression",
            duration: "40 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/nk2CQITm_eo",
          },
          {
            id: "4-2-2",
            title: "Classification Algorithms",
            duration: "45 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/JcI5Vnw0b2c",
          },
          {
            id: "4-2-3",
            title: "Decision Trees and Random Forests",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/eM4uJ6XGnSM",
          },
          { id: "4-2-4", title: "Supervised Learning Project", duration: "60 min", type: "exercise" },
        ],
      },
      {
        title: "Unsupervised Learning",
        lessons: [
          {
            id: "4-3-1",
            title: "Clustering Algorithms",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/5I3Ei69I40s",
          },
          {
            id: "4-3-2",
            title: "Dimensionality Reduction",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/3uxOyk-SczU",
          },
          {
            id: "4-3-3",
            title: "Anomaly Detection",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/12Xq9OLdQwQ",
          },
          { id: "4-3-4", title: "Unsupervised Learning Project", duration: "60 min", type: "project" },
        ],
      },
      {
        title: "Model Evaluation and Deployment",
        lessons: [
          {
            id: "4-4-1",
            title: "Metrics for Model Evaluation",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/85dtiMz9tSo",
          },
          {
            id: "4-4-2",
            title: "Cross-Validation Techniques",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/fSytzGwwBVw",
          },
          {
            id: "4-4-3",
            title: "Model Deployment Basics",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/bjsJOl8gz5k",
          },
          { id: "4-4-4", title: "Final Machine Learning Project", duration: "90 min", type: "project" },
        ],
      },
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
    platform: "Coursera",
    instructor: "Jessica Lee",
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    totalHours: 24,
    totalLessons: 30,
    image: "/placeholder.svg?height=400&width=600",
    syllabus: [
      {
        title: "Introduction to UI/UX Design",
        lessons: [
          {
            id: "5-1-1",
            title: "What is UI/UX Design?",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/c9Wg6Cb_YlU",
          },
          {
            id: "5-1-2",
            title: "The Design Process",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/Nj5RCaE_b00",
          },
          {
            id: "5-1-3",
            title: "User-Centered Design",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/whtBPzY4K-k",
          },
          { id: "5-1-4", title: "Design Thinking Exercise", duration: "35 min", type: "exercise" },
        ],
      },
      {
        title: "User Research and Personas",
        lessons: [
          {
            id: "5-2-1",
            title: "User Research Methods",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/bAARmsv1tms",
          },
          {
            id: "5-2-2",
            title: "Creating User Personas",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/u44pBnAn7cM",
          },
          {
            id: "5-2-3",
            title: "User Journey Mapping",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/mSxpVRo3BLg",
          },
          { id: "5-2-4", title: "Research and Persona Project", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Wireframing and Prototyping",
        lessons: [
          {
            id: "5-3-1",
            title: "Introduction to Wireframing",
            duration: "20 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/qpH7-KFWZRI",
          },
          {
            id: "5-3-2",
            title: "Prototyping with Figma",
            duration: "40 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/FTFaQWZBqQ8",
          },
          {
            id: "5-3-3",
            title: "Interactive Prototypes",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/lTIeZ2ahEkQ",
          },
          { id: "5-3-4", title: "Wireframing Project", duration: "50 min", type: "project" },
        ],
      },
      {
        title: "Visual Design and Testing",
        lessons: [
          {
            id: "5-4-1",
            title: "Visual Design Principles",
            duration: "25 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/9YJPZ9bMYYQ",
          },
          {
            id: "5-4-2",
            title: "Typography and Color Theory",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/yJ5DnM0WUFk",
          },
          {
            id: "5-4-3",
            title: "Usability Testing",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/0YL0xoSmyZI",
          },
          { id: "5-4-4", title: "Final UI/UX Design Project", duration: "60 min", type: "project" },
        ],
      },
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
    platform: "YouTube",
    instructor: "David Wilson",
    category: "Web Development",
    level: "Advanced",
    duration: "8 weeks",
    totalHours: 32,
    totalLessons: 40,
    image: "/placeholder.svg?height=400&width=600",
    syllabus: [
      {
        title: "JavaScript Under the Hood",
        lessons: [
          {
            id: "6-1-1",
            title: "Execution Context and Call Stack",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/Fd9VaW0M7K4",
          },
          {
            id: "6-1-2",
            title: "Scope and Closures",
            duration: "40 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/3a0I8ICR1Vg",
          },
          {
            id: "6-1-3",
            title: "this Keyword and Binding",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/gvicrj31JOM",
          },
          { id: "6-1-4", title: "Advanced Scope Exercise", duration: "45 min", type: "exercise" },
        ],
      },
      {
        title: "Object-Oriented JavaScript",
        lessons: [
          {
            id: "6-2-1",
            title: "Prototypal Inheritance",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/YkoelSTUy7A",
          },
          {
            id: "6-2-2",
            title: "ES6 Classes and Inheritance",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/2ZphE5HcQPQ",
          },
          {
            id: "6-2-3",
            title: "Object Composition vs Inheritance",
            duration: "40 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/wfMtDGfHWpA",
          },
          { id: "6-2-4", title: "OOP Challenge", duration: "50 min", type: "exercise" },
        ],
      },
      {
        title: "Asynchronous JavaScript",
        lessons: [
          {
            id: "6-3-1",
            title: "Callbacks and Promises",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/PoRJizFvM7s",
          },
          {
            id: "6-3-2",
            title: "Async/Await",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/V_Kr9OSfDeU",
          },
          {
            id: "6-3-3",
            title: "Event Loop Deep Dive",
            duration: "45 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/8aGhZQkoFbQ",
          },
          { id: "6-3-4", title: "Async Programming Project", duration: "60 min", type: "project" },
        ],
      },
      {
        title: "Modern JavaScript Patterns",
        lessons: [
          {
            id: "6-4-1",
            title: "Module Pattern and ES Modules",
            duration: "30 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/cRHQNNcYf6s",
          },
          {
            id: "6-4-2",
            title: "Functional Programming Concepts",
            duration: "40 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/BMUiFMZr7vk",
          },
          {
            id: "6-4-3",
            title: "Performance Optimization",
            duration: "35 min",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/0fONene3OIA",
          },
          { id: "6-4-4", title: "Final JavaScript Project", duration: "90 min", type: "project" },
        ],
      },
    ],
    badge: {
      name: "Advanced JavaScript Mastery",
      description: "Awarded for mastering advanced JavaScript concepts and patterns",
      image: "/placeholder.svg?height=200&width=200",
      level: "Advanced",
    },
  },
]

const generateLessonDescription = (title: string, type: string) => {
  if (type === "video") {
    return `Watch this video to learn about ${title}.`
  } else if (type === "exercise") {
    return `Complete this exercise to practice what you've learned in ${title}.`
  } else {
    return `Work on this project to apply your knowledge of ${title}.`
  }
}

export default function CourseLearnPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string

  const [course, setCourse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null)
  const [currentLesson, setCurrentLesson] = useState<any>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [showBadgeModal, setShowBadgeModal] = useState(false)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [generatedNotes, setGeneratedNotes] = useState<string | null>(null)
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    // Simulate API call to fetch course details
    const fetchCourse = () => {
      setIsLoading(true)
      setTimeout(() => {
        const foundCourse = courses.find((c) => c.id === courseId)
        if (foundCourse) {
          setCourse(foundCourse)

          // Load completed lessons from localStorage
          const savedCompletedLessons = JSON.parse(localStorage.getItem(`course_${courseId}_completed_lessons`) || "[]")
          setCompletedLessons(savedCompletedLessons)

          // Calculate progress
          const totalLessons = foundCourse.syllabus.reduce(
            (acc: number, section: any) => acc + section.lessons.length,
            0,
          )
          const progressPercentage = Math.round((savedCompletedLessons.length / totalLessons) * 100)
          setProgress(progressPercentage)
          localStorage.setItem(`course_${courseId}_progress`, progressPercentage.toString())

          // Set current lesson (first uncompleted lesson or first lesson)
          const allLessons = foundCourse.syllabus.flatMap((section: any) => section.lessons)
          const firstUncompletedLesson = allLessons.find((lesson: any) => !savedCompletedLessons.includes(lesson.id))

          if (firstUncompletedLesson) {
            setCurrentLessonId(firstUncompletedLesson.id)
            setCurrentLesson(firstUncompletedLesson)
          } else if (allLessons.length > 0) {
            setCurrentLessonId(allLessons[0].id)
            setCurrentLesson(allLessons[0])
          }
        } else {
          router.push("/learning-hub")
        }
        setIsLoading(false)
      }, 500)
    }

    fetchCourse()
  }, [courseId, router])

  const handleLessonClick = (lesson: any) => {
    setCurrentLessonId(lesson.id)
    setCurrentLesson(lesson)
  }

  const handleLessonComplete = () => {
    if (!currentLessonId) return

    // Add to completed lessons if not already completed
    if (!completedLessons.includes(currentLessonId)) {
      const newCompletedLessons = [...completedLessons, currentLessonId]
      setCompletedLessons(newCompletedLessons)

      // Save to localStorage
      localStorage.setItem(`course_${courseId}_completed_lessons`, JSON.stringify(newCompletedLessons))

      // Calculate new progress
      const totalLessons = course.syllabus.reduce((acc: number, section: any) => acc + section.lessons.length, 0)
      const newProgress = Math.round((newCompletedLessons.length / totalLessons) * 100)
      setProgress(newProgress)
      localStorage.setItem(`course_${courseId}_progress`, newProgress.toString())

      // Check if course is completed
      if (newProgress === 100) {
        // Add badge to user's collection
        const userBadges = JSON.parse(localStorage.getItem("user_badges") || "[]")
        if (!userBadges.some((badge: any) => badge.name === course.badge.name)) {
          userBadges.push({
            ...course.badge,
            courseId: course.id,
            courseTitle: course.title,
            earnedDate: new Date().toISOString(),
          })
          localStorage.setItem("user_badges", JSON.stringify(userBadges))

          // Show badge achievement modal
          setShowBadgeModal(true)
        }
      }
    }

    // Find next lesson
    const allLessons = course.syllabus.flatMap((section: any) => section.lessons)
    const currentIndex = allLessons.findIndex((lesson: any) => lesson.id === currentLessonId)

    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1]
      setCurrentLessonId(nextLesson.id)
      setCurrentLesson(nextLesson)
    }
  }

  const handleGenerateCertificate = () => {
    // Save certificate to user's collection
    const userCertificates = JSON.parse(localStorage.getItem("user_certificates") || "[]")
    if (!userCertificates.some((cert: any) => cert.courseId === course.id)) {
      userCertificates.push({
        courseId: course.id,
        courseTitle: course.title,
        issueDate: new Date().toISOString(),
        certificateId: `CERT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      })
      localStorage.setItem("user_certificates", JSON.stringify(userCertificates))
    }

    setShowCertificateModal(true)
  }

  const handleGenerateNotes = async () => {
    if (!currentLesson || currentLesson.type !== "video" || !currentLesson.videoUrl) {
      toast({
        title: "Cannot generate notes",
        description: "Notes can only be generated for video lessons.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingNotes(true)
    setGeneratedNotes(null)
    setShowNotesModal(true)

    try {
      // Use fetch with explicit options
      const response = await fetch("/api/generate-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoUrl: currentLesson.videoUrl,
        }),
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Failed to generate notes: ${response.status}`)
      }

      const data = await response.json()
      setGeneratedNotes(data.notes)
    } catch (error) {
      console.error("Error generating notes:", error)
      toast({
        title: "Error",
        description: "Failed to generate notes. Please try again later.",
        variant: "destructive",
      })
      setShowNotesModal(false)
    } finally {
      setIsGeneratingNotes(false)
    }
  }

  // Rest of the component...

  // Render code (unchanged)
  if (isLoading || !course) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/30 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-muted-foreground">Loading course content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Component JSX (unchanged) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Button variant="ghost" className="mb-2" onClick={() => router.push(`/learning-hub/course/${courseId}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
          <h1 className="text-2xl font-bold">{course.title}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground mr-2">Your progress:</div>
          <Progress value={progress} className="w-40 h-2" />
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Course Curriculum */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Course Content</CardTitle>
              <CardDescription>
                {course.totalLessons} lessons • {completedLessons.length} completed
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
              <Accordion type="multiple" defaultValue={course.syllabus.map((_: any, i: number) => `section-${i}`)}>
                {course.syllabus.map((section: any, sectionIndex: number) => (
                  <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                    <AccordionTrigger className="text-sm">
                      <div className="flex items-center">
                        <span>{section.title}</span>
                        <Badge variant="outline" className="ml-2">
                          {section.lessons.length} lessons
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-1 pl-4">
                        {section.lessons.map((lesson: any, lessonIndex: number) => (
                          <Button
                            key={lessonIndex}
                            variant={currentLessonId === lesson.id ? "default" : "ghost"}
                            className={`w-full justify-start text-left h-auto py-2 ${
                              completedLessons.includes(lesson.id) ? "text-primary" : ""
                            }`}
                            onClick={() => handleLessonClick(lesson)}
                          >
                            <div className="flex items-center w-full">
                              <div className="mr-2">
                                {completedLessons.includes(lesson.id) ? (
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                ) : lesson.type === "video" ? (
                                  <Play className="h-4 w-4" />
                                ) : lesson.type === "exercise" ? (
                                  <FileText className="h-4 w-4" />
                                ) : (
                                  <Award className="h-4 w-4" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm">{lesson.title}</span>
                                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {progress === 100 && (
                <div className="mt-6 p-4 border rounded-lg bg-muted">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-primary mr-2" />
                    <h3 className="font-medium">Course Completed!</h3>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Congratulations on completing the course. You can now generate your certificate.
                  </p>
                  <Button className="w-full" onClick={handleGenerateCertificate}>
                    Generate Certificate
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Lesson */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-0">
              {currentLesson && (
                <div>
                  {/* Video placeholder */}
                  <div className="relative aspect-video w-full bg-black">
                    {currentLesson.type === "video" ? (
                      <iframe
                        className="w-full h-full"
                        src={currentLesson.videoUrl}
                        title={currentLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
                        {currentLesson.type === "exercise" ? (
                          <FileText className="h-16 w-16 text-primary opacity-80 mb-2" />
                        ) : (
                          <Award className="h-16 w-16 text-primary opacity-80 mb-2" />
                        )}
                        <p className="text-lg font-medium">
                          {currentLesson.type === "exercise" ? "Practice Exercise" : "Project"}
                        </p>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div className="bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                        {currentLesson.type === "video"
                          ? "Video Lesson"
                          : currentLesson.type === "exercise"
                            ? "Practice Exercise"
                            : "Project"}
                      </div>
                      <div className="bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                        {currentLesson.duration}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold">{currentLesson.title}</h2>
                        <p className="text-muted-foreground">
                          {
                            course.syllabus.find((section: any) =>
                              section.lessons.some((lesson: any) => lesson.id === currentLessonId),
                            )?.title
                          }
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          completedLessons.includes(currentLessonId || "")
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : ""
                        }
                      >
                        {completedLessons.includes(currentLessonId || "") ? "Completed" : "In Progress"}
                      </Badge>
                    </div>

                    {currentLesson.type === "video" && (
                      <div className="mb-6">
                        <Button onClick={handleGenerateNotes} className="flex items-center" variant="outline">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Generate AI Notes from Video
                        </Button>
                      </div>
                    )}

                    <div className="prose max-w-none dark:prose-invert">
                      <p>
                        {currentLesson
                          ? generateLessonDescription(currentLesson.title, currentLesson.type)
                          : "Select a lesson to start learning."}
                      </p>

                      {currentLesson.type === "exercise" && (
                        <div className="mt-6 p-4 border rounded-lg bg-muted">
                          <h3 className="text-lg font-medium mb-2">Exercise Instructions</h3>
                          <p>Follow these steps to complete the exercise:</p>
                          <ol className="mt-2 space-y-2">
                            <li>Step 1: Lorem ipsum dolor sit amet</li>
                            <li>Step 2: Consectetur adipiscing elit</li>
                            <li>Step 3: Nullam euismod, nisl eget aliquam ultricies</li>
                            <li>Step 4: Submit your solution</li>
                          </ol>
                        </div>
                      )}

                      {currentLesson.type === "project" && (
                        <div className="mt-6 p-4 border rounded-lg bg-muted">
                          <h3 className="text-lg font-medium mb-2">Project Requirements</h3>
                          <p>Complete this project to apply what you've learned:</p>
                          <ul className="mt-2 space-y-2">
                            <li>Requirement 1: Lorem ipsum dolor sit amet</li>
                            <li>Requirement 2: Consectetur adipiscing elit</li>
                            <li>Requirement 3: Nullam euismod, nisl eget aliquam ultricies</li>
                            <li>Requirement 4: Submit your project for review</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-8 pt-4 border-t">
                      <div className="flex items-center">
                        <Checkbox
                          id="mark-complete"
                          checked={completedLessons.includes(currentLessonId || "")}
                          onCheckedChange={() => {
                            if (!completedLessons.includes(currentLessonId || "")) {
                              handleLessonComplete()
                            }
                          }}
                        />
                        <label htmlFor="mark-complete" className="ml-2 text-sm font-medium">
                          Mark as completed
                        </label>
                      </div>

                      <div className="flex space-x-2">
                        {/* Navigation buttons */}
                        <Button
                          variant="outline"
                          onClick={() => {
                            const allLessons = course.syllabus.flatMap((section: any) => section.lessons)
                            const currentIndex = allLessons.findIndex((lesson: any) => lesson.id === currentLessonId)

                            if (currentIndex > 0) {
                              const prevLesson = allLessons[currentIndex - 1]
                              setCurrentLessonId(prevLesson.id)
                              setCurrentLesson(prevLesson)
                            }
                          }}
                          disabled={
                            course.syllabus
                              .flatMap((section: any) => section.lessons)
                              .findIndex((lesson: any) => lesson.id === currentLessonId) === 0
                          }
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>

                        <Button
                          onClick={() => {
                            handleLessonComplete()
                          }}
                          disabled={
                            completedLessons.includes(currentLessonId || "") &&
                            course.syllabus
                              .flatMap((section: any) => section.lessons)
                              .findIndex((lesson: any) => lesson.id === currentLessonId) ===
                              course.syllabus.flatMap((section: any) => section.lessons).length - 1
                          }
                        >
                          {completedLessons.includes(currentLessonId || "") ? (
                            <>
                              Next
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Complete & Continue
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Lesson Notes
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Exercise Files
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Code Samples
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Additional Reading
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Stuck on this lesson?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you're having trouble understanding the content or completing the exercises, our AI Doubt Solver
                    can help you get unstuck.
                  </p>
                  <Button asChild>
                    <Link href="/learning-hub/doubt-solver">Ask AI Doubt Solver</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BadgeAchievedModal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        badge={course.badge}
        courseTitle={course.title}
      />

      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        courseTitle={course.title}
        studentName={user?.name || "Student"}
        completionDate={new Date().toLocaleDateString()}
        certificateId={`CERT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`}
      />

      <NotesModal
        isOpen={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        videoTitle={currentLesson?.title || ""}
        notes={generatedNotes}
        isLoading={isGeneratingNotes}
      />
    </div>
  )
}

