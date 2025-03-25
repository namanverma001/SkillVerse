"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, BookOpen, GraduationCap, Briefcase, Award } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import StatsCounter from "@/components/stats-counter"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Breaking Barriers to <span className="text-primary">Education</span> and{" "}
                <span className="text-primary">Opportunity</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
                Access free learning resources, scholarships, and freelancing opportunities all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button asChild size="lg" className="font-medium">
                  <Link href="/auth/signup">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/learning-hub">Explore Courses</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-primary/10"></div>
              <div className="absolute inset-0 flex items-center justify-center text-primary text-2xl font-bold">
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  >
                    <GraduationCap className="h-16 w-16 mx-auto" />
                  </motion.div>
                  <p>Empowering Education For All</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatsCounter end={10000} suffix="+" label="Free Courses" />
            <StatsCounter end={5000} suffix="+" label="Scholarships" />
            <StatsCounter end={2500} suffix="+" label="Freelance Jobs" />
            <StatsCounter end={50000} suffix="+" label="Students Helped" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to learn, grow, and succeed in one platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Learning Hub"
              description="Access free courses from top platforms like YouTube, Khan Academy, Coursera, and MIT OpenCourseWare."
              link="/learning-hub"
            />
            <FeatureCard
              icon={<GraduationCap className="h-10 w-10 text-primary" />}
              title="Scholarships & Financial Aid"
              description="Find and apply for scholarships based on your profile and eligibility criteria."
              link="/scholarships"
            />
            <FeatureCard
              icon={<Briefcase className="h-10 w-10 text-primary" />}
              title="Freelancing Marketplace"
              description="Discover freelance opportunities and projects to earn while you learn."
              link="/freelancing"
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-primary" />}
              title="Skill Verification"
              description="Earn badges and certificates to showcase your skills to potential employers."
              link="/profile"
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="AI-Powered Doubt Solver"
              description="Get instant answers to your questions with our AI-powered chatbot."
              link="/learning-hub/doubt-solver"
            />
            <FeatureCard
              icon={<GraduationCap className="h-10 w-10 text-primary" />}
              title="Progress Tracking"
              description="Track your learning progress and achievements in one place."
              link="/dashboard"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Success Stories</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              See how our platform has helped students achieve their dreams
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Priya Sharma"
              role="Computer Science Student"
              image="/placeholder.svg?height=200&width=200"
              quote="SkillVerse helped me find a scholarship that covered my entire tuition. I'm now pursuing my dream degree without financial stress."
            />
            <TestimonialCard
              name="Rahul Patel"
              role="Graphic Design Freelancer"
              image="/placeholder.svg?height=200&width=200"
              quote="Through the freelancing marketplace, I found clients while studying. I graduated with both a degree and professional experience."
            />
            <TestimonialCard
              name="Ananya Singh"
              role="Data Science Graduate"
              image="/placeholder.svg?height=200&width=200"
              quote="The free courses and doubt-solving features helped me master complex topics. I'm now working at a top tech company."
            />
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Courses</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">Watch previews of our most popular courses</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/qz0aGYrrlhU"
                  title="Introduction to Web Development"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-xl font-bold">Web Development Fundamentals</h3>
              <p className="text-muted-foreground">
                Learn HTML, CSS, and JavaScript to build responsive websites from scratch.
              </p>
              <Button asChild>
                <Link href="/learning-hub/course/1">
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/_uQrJ0TkZlc"
                  title="Introduction to Data Science"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-xl font-bold">Data Science Fundamentals</h3>
              <p className="text-muted-foreground">
                Master Python, data analysis, and visualization techniques for data science.
              </p>
              <Button asChild>
                <Link href="/learning-hub/course/2">
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of students breaking barriers to education and opportunity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="font-medium">
                <Link href="/auth/signup">
                  Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

