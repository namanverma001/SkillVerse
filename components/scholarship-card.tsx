"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Building, ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"

interface ScholarshipCardProps {
  scholarship: any
  onApply: (scholarship: any) => void
}

export default function ScholarshipCard({ scholarship, onApply }: ScholarshipCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full flex flex-col overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={scholarship.image || "/placeholder.svg"}
            alt={scholarship.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary">{scholarship.match}% Match</Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-foreground mb-2">
              {scholarship.category}
            </Badge>
            <h3 className="text-lg font-bold text-white line-clamp-1">{scholarship.title}</h3>
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardDescription className="flex items-center">
              <Building className="h-3 w-3 mr-1" />
              {scholarship.provider}
            </CardDescription>
            <Badge variant="outline" className="ml-2">
              <DollarSign className="h-3 w-3 mr-1" />
              {scholarship.amount}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <p className="text-sm text-muted-foreground mb-4">{scholarship.description}</p>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                Deadline: <span className="font-medium">{scholarship.deadline}</span>
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Eligibility:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {scholarship.eligibility.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 border-t flex justify-between">
          <Button variant="outline" size="sm" className="gap-1">
            <ExternalLink className="h-3.5 w-3.5" />
            Details
          </Button>
          <Button onClick={() => onApply(scholarship)}>
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

