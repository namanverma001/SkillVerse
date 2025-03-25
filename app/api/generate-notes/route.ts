import { type NextRequest, NextResponse } from "next/server"

// Mock transcripts database
const mockTranscripts = {
  "https://www.youtube.com/embed/qz0aGYrrlhU":
    "HTML stands for HyperText Markup Language. It's the standard markup language for creating web pages.",
  "https://www.youtube.com/embed/UB1O30fR-EE":
    "An HTML document has a specific structure with doctype, html, head, and body elements.",
  "https://www.youtube.com/embed/1PnVor36_40":
    "CSS stands for Cascading Style Sheets. CSS describes how HTML elements are to be displayed.",
  "https://www.youtube.com/embed/W6NZfCO5SIk":
    "JavaScript is a programming language that adds interactivity to your website.",
  // Add more transcripts as needed
}

// Simple function to generate notes from transcript
function generateNotes(transcript: string): string {
  // Create a simple formatted note
  return `# AI Generated Notes

## Summary
${transcript}

## Key Points
- This is an important concept from the video
- Another key takeaway from the content
- A third important point to remember

## Practice Questions
1. What is the main topic of this video?
2. How would you apply these concepts in a real project?
3. What are the best practices mentioned?
`
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json()
    const { videoUrl } = data

    // Get transcript or default message
    const transcript = mockTranscripts[videoUrl] || "No transcript available for this video."

    // Generate notes
    const notes = generateNotes(transcript)

    // Return the response
    return NextResponse.json({ notes })
  } catch (error) {
    console.error("Error generating notes:", error)
    return NextResponse.json(
      { notes: "An error occurred while generating notes. Please try again.", error: true },
      { status: 200 }, // Using 200 to prevent modal from closing
    )
  }
}

