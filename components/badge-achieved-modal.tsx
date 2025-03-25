"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Award, X, Share2 } from "lucide-react"

interface BadgeAchievedModalProps {
  isOpen: boolean
  onClose: () => void
  badge: any
  courseTitle: string
}

export default function BadgeAchievedModal({ isOpen, onClose, badge, courseTitle }: BadgeAchievedModalProps) {
  return (
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-background rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 text-center">
              <div className="mb-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative mx-auto"
                >
                  <div className="absolute inset-0 rounded-full animate-pulse-ring bg-primary/20"></div>
                  <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden border-4 border-primary">
                    <div className="absolute inset-0 animated-bg"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <Award className="h-16 w-16" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className="flex justify-center mb-2">
                  <Badge
                    className={`badge-${badge.level.toLowerCase()} badge-gradient text-white px-3 py-1 rounded-full`}
                  >
                    <Award className="h-4 w-4 mr-1" />
                    {badge.level} Badge
                  </Badge>
                </div>

                <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                <p className="text-muted-foreground mb-4">
                  You've earned the <span className="font-medium text-foreground">{badge.name}</span> badge for
                  completing the course: <span className="font-medium text-foreground">{courseTitle}</span>
                </p>

                <p className="text-sm text-muted-foreground mb-6">{badge.description}</p>

                <div className="flex justify-center space-x-4">
                  <Button onClick={onClose}>Continue Learning</Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`inline-flex items-center ${className}`}>{children}</div>
}

