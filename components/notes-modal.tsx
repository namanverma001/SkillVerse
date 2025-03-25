"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Download, Copy, AlertCircle } from "lucide-react"

interface NotesModalProps {
  isOpen: boolean
  onClose: () => void
  videoTitle: string
  notes: string | null
  isLoading: boolean
}

export default function NotesModal({ isOpen, onClose, videoTitle, notes, isLoading }: NotesModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (notes) {
      navigator.clipboard.writeText(notes)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (notes) {
      const element = document.createElement("a")
      const file = new Blob([notes], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `${videoTitle.replace(/\s+/g, "_")}_notes.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI-Generated Notes: {videoTitle}</DialogTitle>
          <DialogDescription>
            These notes were automatically generated from the video transcript using Gemini AI.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Generating comprehensive notes from video transcript...</p>
          </div>
        ) : notes ? (
          <>
            {notes.includes("Failed to generate") || notes.includes("error") ? (
              <div className="bg-destructive/10 p-4 rounded-md flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium text-destructive mb-1">Error Generating Notes</p>
                  <p className="text-sm">{notes}</p>
                  <p className="text-sm mt-2">
                    This could be due to API limits or temporary service issues. Please try again later.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-muted p-4 rounded-md whitespace-pre-line">{notes}</div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={handleCopy}>
                    {copied ? "Copied!" : "Copy Notes"}
                    <Copy className="ml-2 h-4 w-4" />
                  </Button>
                  <Button onClick={handleDownload}>
                    Download Notes
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="py-8 text-center text-muted-foreground">No notes available. Please try again.</div>
        )}
      </DialogContent>
    </Dialog>
  )
}

