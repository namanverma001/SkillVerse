"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, BookOpen, Clock, Award } from "lucide-react"

// Add custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: hsl(var(--muted));
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground));
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--primary));
  }
`

interface EnrollmentModalProps {
  isOpen: boolean
  onClose: () => void
  onEnroll: () => void
  course: any
}

export default function EnrollmentModal({ isOpen, onClose, onEnroll, course }: EnrollmentModalProps) {
  const [isEnrolling, setIsEnrolling] = useState(false)

  const handleEnroll = () => {
    setIsEnrolling(true)

    // Simulate enrollment process
    setTimeout(() => {
      setIsEnrolling(false)
      onEnroll()
    }, 1500)
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

  // Add the scrollbar styles
  return (
    <>
      <style jsx global>
        {scrollbarStyles}
      </style>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative bg-background rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2">Enroll in Course</h2>
                <p className="text-center text-muted-foreground mb-6">
                  You're about to enroll in <span className="font-medium text-foreground">{course.title}</span>
                </p>

                {/* Video preview section with course-specific video */}
                <div className="mb-6 rounded-lg overflow-hidden">
                  <iframe
                    className="w-full aspect-video"
                    src={getCourseVideoUrl(course.id)}
                    title={`Preview: ${course.title}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Free access to all course materials</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Track your progress as you learn</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Earn a badge upon completion</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Receive a certificate of completion</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted rounded-lg mb-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span>Course Duration</span>
                  </div>
                  <Badge variant="outline">{course.duration}</Badge>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted rounded-lg mb-6">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    <span>Course Badge</span>
                  </div>
                  <Badge variant="outline" className={`badge-${course.badge.level.toLowerCase()}`}>
                    {course.badge.name}
                  </Badge>
                </div>

                <Button className="w-full" onClick={handleEnroll} disabled={isEnrolling}>
                  {isEnrolling ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Enrolling...
                    </div>
                  ) : (
                    "Enroll Now"
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

