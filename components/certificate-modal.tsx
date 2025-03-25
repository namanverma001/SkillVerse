"use client"

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Download, Share2, Award, GraduationCap, CheckCircle } from "lucide-react"

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  courseTitle: string
  studentName: string
  completionDate: string
  certificateId: string
}

export default function CertificateModal({
  isOpen,
  onClose,
  courseTitle,
  studentName,
  completionDate,
  certificateId,
}: CertificateModalProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-background rounded-lg shadow-lg max-w-4xl w-full mx-4 overflow-hidden"
          >
            <div className="absolute top-4 right-4 z-10">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Certificate of Achievement
                </h2>
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
              </div>

              <div className="relative">
                {/* Confetti animation */}
                <div className="confetti confetti-1"></div>
                <div className="confetti confetti-2"></div>
                <div className="confetti confetti-3"></div>
                <div className="confetti confetti-4"></div>
                <div className="confetti confetti-5"></div>
                <div className="confetti confetti-6"></div>
                <div className="confetti confetti-7"></div>
                <div className="confetti confetti-8"></div>
                <div className="confetti confetti-9"></div>
                <div className="confetti confetti-10"></div>
                <div className="confetti confetti-11"></div>
                <div className="confetti confetti-12"></div>
                <div className="confetti confetti-13"></div>
                <div className="confetti confetti-14"></div>
                <div className="confetti confetti-15"></div>
                <div className="confetti confetti-16"></div>
                <div className="confetti confetti-17"></div>
                <div className="confetti confetti-18"></div>

                {/* Certificate */}
                <div
                  ref={certificateRef}
                  className="certificate-container border-8 border-primary/20 rounded-lg p-8 bg-white text-black"
                >
                  <div className="border-4 border-primary/30 rounded-lg p-8 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 left-0 right-0 h-20 bg-primary/20"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-primary/20"></div>
                      <div className="absolute -left-10 top-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full border-8 border-primary/30"></div>
                      <div className="absolute -right-10 top-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full border-8 border-primary/30"></div>
                    </div>

                    {/* Certificate content */}
                    <div className="text-center relative z-10">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-primary to-blue-600 p-2 rounded-full">
                            <GraduationCap className="h-8 w-8 text-white" />
                          </div>
                          <span className="text-xl font-bold ml-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            EduAid
                          </span>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>
                            Certificate ID: <span className="font-semibold">{certificateId}</span>
                          </p>
                          <p>
                            Issued on: <span className="font-semibold">{completionDate}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <Award className="h-20 w-20 text-primary" />
                          <div className="absolute -inset-2 rounded-full bg-primary opacity-20 animate-pulse"></div>
                        </div>
                      </div>

                      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Certificate of Achievement
                      </h1>
                      <p className="text-lg mb-8">This is to certify that</p>
                      <p className="text-3xl font-bold mb-4 text-primary">{studentName}</p>
                      <p className="text-lg mb-4">has successfully completed the course</p>
                      <p className="text-2xl font-bold mb-8 text-primary">{courseTitle}</p>

                      <div className="mb-8 text-sm">
                        <p className="flex items-center justify-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Demonstrated proficiency in all course materials</span>
                        </p>
                        <p className="flex items-center justify-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Completed all required assignments and assessments</span>
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Achieved excellence in practical application of concepts</span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center mb-8">
                        <div className="text-left">
                          <div className="border-t-2 border-primary/30 pt-4 w-48">
                            <p className="text-lg font-medium">Dr. Sarah Johnson</p>
                            <p className="text-sm">Course Instructor</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="border-t-2 border-primary/30 pt-4 w-48">
                            <p className="text-lg font-medium">Dr. Michael Chen</p>
                            <p className="text-sm">EduAid Director</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="border-t-2 border-primary/30 pt-4 w-48">
                          <p className="text-lg font-medium">EduAid</p>
                          <p className="text-sm">Education & Financial Aid Platform</p>
                        </div>
                      </div>

                      {/* Certificate seal */}
                      <div className="absolute bottom-4 right-4 h-24 w-24 opacity-70">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/30 flex items-center justify-center">
                          <GraduationCap className="h-10 w-10 text-primary/70" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  This certificate verifies your successful completion of the course. You can download it or share it on
                  your social profiles and professional networks.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

