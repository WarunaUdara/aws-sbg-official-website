import * as React from "react"
import { Link } from "@tanstack/react-router"
import { ArrowRight, Sparkles, Terminal, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/common/Container"

export function Hero() {
  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="hero-glow-bg" />

      <Container size="lg" className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] text-xs font-semibold tracking-wide shadow-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AWS Student Building Guild • USJ Official Chapter</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Build the Cloud of <br className="hidden sm:inline" />
            <span className="aws-gradient-text">Tomorrow, Today.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed font-normal">
            The official community for student developers, cloud architects, and tech innovators at the{" "}
            <span className="text-slate-200 font-medium">University of Sri Jayewardenepura</span>. 
            Level up with hands-on AWS labs, hackathons, and peer mentorship.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <Link to="/events" className="w-full sm:w-auto">
              <Button variant="glow" size="lg" className="w-full sm:w-auto">
                Explore Upcoming Events
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Join Student Guild
              </Button>
            </Link>
          </div>

          {/* Cloud Highlights Bar */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-[#FF9900]" />
              Hands-on CDK & Serverless
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800">
              <Zap className="w-3.5 h-3.5 text-[#FF9900]" />
              Amazon Bedrock & GenAI
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF9900]" />
              AWS Certification Cohorts
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
