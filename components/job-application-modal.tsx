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
import { X, DollarSign, Clock, Briefcase, Upload, FileText, LinkIcon } from "lucide-react"

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: () => void
  job: any
}

export default function JobApplicationModal({ isOpen, onClose, onApply, job }: JobApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [bidAmount, setBidAmount] = useState<string>(job?.budget?.replace("$", "") || "")
  const [deliveryTime, setDeliveryTime] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
              <h2 className="text-2xl font-bold text-center mb-2">Job Application</h2>
              <p className="text-center text-muted-foreground mb-6">
                Apply for <span className="font-medium text-foreground">{job.title}</span>
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-primary mr-2" />
                    <span>Client</span>
                  </div>
                  <span className="font-medium">{job.client}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <span>Budget</span>
                  </div>
                  <Badge>{job.budget}</Badge>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span>Duration</span>
                  </div>
                  <span className="font-medium">{job.duration}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cover-letter">Cover Letter</Label>
                  <Textarea
                    id="cover-letter"
                    placeholder="Explain why you're the best fit for this job..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bid-amount">Your Bid ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="bid-amount"
                        placeholder="e.g., 500"
                        type="number"
                        min="1"
                        className="pl-9"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delivery-time">Delivery Time</Label>
                    <Input
                      id="delivery-time"
                      placeholder="e.g., 5 days"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Portfolio & Samples</Label>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm">Work Samples</span>
                      </div>
                      <div className="relative">
                        <Button type="button" variant="outline" size="sm" className="relative">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                          <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileUpload}
                            multiple
                          />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portfolio-link" className="text-sm">
                        Portfolio Link
                      </Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="portfolio-link" placeholder="https://your-portfolio.com" className="pl-9" />
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
                    I confirm that I can deliver this project as described
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Submitting Application...
                    </div>
                  ) : (
                    "Submit Proposal"
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

