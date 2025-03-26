"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Mail, Briefcase, Award, ChevronDown, ChevronUp, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FreelancerCardProps {
  freelancer: {
    id: number
    name: string
    specialty: string
    skills: string[]
    rating: number
    projects: number
    image: string
    bio: string
    portfolio: {
      title: string
      description: string
      image: string
    }[]
    website?: string
    email: string
    location: string
    hourlyRate: string
    availability: string
  }
}

export default function FreelancerCard({ freelancer }: FreelancerCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="border overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-primary/20">
            <Image src={freelancer.image || "/placeholder.svg"} alt={freelancer.name} fill className="object-cover" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-lg">{freelancer.name}</h3>
            <p className="text-primary font-medium">{freelancer.specialty}</p>

            <div className="flex items-center mt-1 justify-center md:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(freelancer.rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : i < freelancer.rating
                        ? "text-yellow-500 fill-yellow-500 opacity-50"
                        : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm">{freelancer.rating}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{freelancer.projects} projects</span>
            </div>

            <div className="flex items-center mt-2 text-sm text-muted-foreground justify-center md:justify-start">
              <Badge variant="outline" className="mr-2">
                {freelancer.hourlyRate}/hr
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {freelancer.availability}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{freelancer.bio}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {freelancer.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          {expanded && (
            <div className="mt-6 space-y-6 animate-in fade-in-50 duration-300">
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center">
                  <Briefcase className="h-4 w-4 mr-1 text-primary" />
                  Featured Portfolio
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {freelancer.portfolio.map((item, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div className="relative h-32 w-full">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="p-3">
                        <h5 className="font-medium text-sm">{item.title}</h5>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-sm mb-2 flex items-center">
                  <Award className="h-4 w-4 mr-1 text-primary" />
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {freelancer.email}
                  </p>
                  {freelancer.website && (
                    <p className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a
                        href={freelancer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {freelancer.website.replace(/^https?:\/\//, "")}
                      </a>
                    </p>
                  )}
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2 text-muted-foreground"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {freelancer.location}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center pt-4 border-t">
          <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show More
              </>
            )}
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`mailto:${freelancer.email}`}>
                <Mail className="h-4 w-4 mr-1" />
                Contact
              </Link>
            </Button>
            <Button size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

