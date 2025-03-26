"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X, DollarSign, Calendar, Building, Upload, FileText } from "lucide-react"

interface ScholarshipApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: () => void
  scholarship: any
}

export default function ScholarshipApplicationModal({
  isOpen,
  onClose,
  onApply,
  scholarship,
}: ScholarshipApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [cgpa, setCgpa] = useState<string>("")
  const [cgpaError, setCgpaError] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate CGPA
    const cgpaValue = Number.parseFloat(cgpa)
    if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
      setCgpaError("CGPA must be between 0 and 10")
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      onApply()
    }, 1500)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => file.name)
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const handleCgpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCgpa(value)

    // Clear error if input is valid
    const cgpaValue = Number.parseFloat(value)
    if (!isNaN(cgpaValue) && cgpaValue >= 0 && cgpaValue <= 10) {
      setCgpaError("")
    }
  }

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
            transition={{ duration: 0.2 }}
            className="relative bg-background rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold text-center mb-2">Scholarship Application</h2>
              <p className="text-center text-muted-foreground mb-6">
                Apply for <span className="font-medium text-foreground">{scholarship.title}</span>
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-primary mr-2" />
                    <span>Provider</span>
                  </div>
                  <span className="font-medium">{scholarship.provider}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <span>Amount</span>
                  </div>
                  <Badge>{scholarship.amount}</Badge>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span>Deadline</span>
                  </div>
                  <span className="font-medium">{scholarship.deadline}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personal-statement">Personal Statement</Label>
                  <Textarea
                    id="personal-statement"
                    placeholder="Tell us why you deserve this scholarship..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academic-info">Current CGPA</Label>
                  <Input
                    id="academic-info"
                    placeholder="e.g., 8.5"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10.0"
                    value={cgpa}
                    onChange={handleCgpaChange}
                    required
                    className={cgpaError ? "border-red-500" : ""}
                  />
                  {cgpaError && <p className="text-sm text-red-500">{cgpaError}</p>}
                  <p className="text-xs text-muted-foreground">Enter your CGPA on a scale of 0-10</p>
                </div>

                <div className="space-y-2">
                  <Label>Required Documents</Label>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm">Academic Transcript</span>
                      </div>
                      <div className="relative">
                        <Button type="button" variant="outline" size="sm" className="relative">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                          <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileUpload}
                          />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm">Recommendation Letter</span>
                      </div>
                      <div className="relative">
                        <Button type="button" variant="outline" size="sm" className="relative">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                          <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileUpload}
                          />
                        </Button>
                      </div>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs font-medium">Uploaded Files:</p>
                        {uploadedFiles.map((file, index) => (
                          <p key={index} className="text-xs text-muted-foreground flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {file}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I confirm that all information provided is accurate and complete
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Submitting Application...
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

