import * as React from "react"
import { Container } from "@/components/common/Container"
import { ExternalLink, Plus, Minus, ChevronRight } from "lucide-react"
import { Link } from "@tanstack/react-router"

interface FAQItem {
  id: string
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    id: "who",
    question: "Who can join an AWS Student Builder Group?",
    answer: "Membership is open to any learner actively enrolled at the University of Sri Jayewardenepura (USJ) aged 18+ who is ready to build their future—across Applied Sciences, Computing, Technology, Engineering, Management, and Humanities. No prior cloud or coding experience is required."
  },
  {
    id: "why",
    question: "Why should I join an AWS Student Builder Group?",
    answer: "You will gain hands-on access to real AWS cloud architectures, mentorship from AWS Community Builders and cloud leaders, exam prep cohorts for AWS Cloud Practitioner and Solutions Architect certifications, hackathons, and exclusive technical guidance from AWS."
  },
  {
    id: "lead",
    question: "Can I lead a workshop, project, or campus session?",
    answer: "Absolutely. AWS SBG USJ is entirely student-led. We actively recruit workshop mentors, technical writers, open-source maintainers, and event coordinators to shape cloud education on our campus."
  },
  {
    id: "evolution",
    question: "How does AWS SBG USJ relate to AWS Cloud Clubs?",
    answer: "AWS Student Builder Groups is the official next evolution of the global AWS Cloud Clubs program, integrating directly with the AWS Builder Center, AWS Educate, and official AWS certification pathways."
  }
]

export function ProgramSection() {
  const [openFaq, setOpenFaq] = React.useState<string | null>("who")

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id))
  }

  return (
    <section className="py-24 bg-[#0A0E17] border-b border-white/10 relative overflow-hidden">
      <Container size="lg">
        {/* Breadcrumb Path inspired by AWS Builder Center */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8 overflow-x-auto scrollbar-none">
          <span className="hover:text-white transition-colors cursor-pointer">
            AWS Builder Center
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="hover:text-white transition-colors cursor-pointer">
            Community
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="text-[#FF9900] font-semibold shrink-0">
            AWS Student Builder Groups
          </span>
        </div>

        {/* Top Hero Layout: Header & Actions Left, Coordinate Grid Chip Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-white/15 pb-16 mb-16">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-display">
              AWS Student Builder Groups
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 font-medium">
              Connect with other students on campus. Build together on the cloud.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="px-6 py-3.5 bg-white hover:bg-slate-200 text-black font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                Join a Student Group
              </Link>
              <a
                href="https://aws.amazon.com/developer/community/students/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 border border-white/20 hover:border-white text-white font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>AWS Global Program</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Coordinate Grid with 7x7 Builder Chip Logo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative p-6 sm:p-8 bg-[#0D131F] border border-white/15 w-full max-w-md">
              {/* Square Coordinate Grid Background */}
              <div 
                className="w-full aspect-square border border-white/10 relative flex items-center justify-center"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "14.2857% 14.2857%" // Exactly 7x7 grid squares!
                }}
              >
                {/* Official AWS Student Builder Group Rebranded Icon with Name */}
                <div className="relative z-10 p-4 flex items-center justify-center">
                  <img
                    src="/icons/sbg-icon-and-name.png"
                    alt="AWS Student Builder Groups"
                    className="w-52 h-52 object-contain drop-shadow-[0_0_28px_rgba(255,153,0,0.35)]"
                  />
                </div>

                {/* Subtitle coordinates */}
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-500">
                  GRID: 7x7 • CORE: USJ
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Two-Column About & FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: About the Program */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight font-display">
              About the program
            </h3>
            <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                <strong className="text-white">AWS Student Builder Groups</strong> (formerly AWS Cloud Clubs) 
                are vibrant, student-led communities on post-secondary school campuses worldwide. 
                Students come together to explore cloud technology, build innovative software architectures, 
                and master industry-grade cloud skills.
              </p>
              <p>
                Membership is open to any learner actively enrolled in a post-secondary institution aged 18+ 
                who is ready to build their future. Every group is led by Student Builder Group Leaders 
                who are passionate about bringing their communities to life.
              </p>
              <p className="text-slate-400 text-sm">
                With support from AWS, our USJ chapter organizes hands-on workshops, cloud certification prep cohorts, 
                and project showcases that empower Sri Lankan undergraduates to graduate cloud-ready.
              </p>
            </div>
          </div>

          {/* Right Column: FAQs Accordion */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight font-display mb-6">
              Frequently Asked Questions
            </h3>

            <div className="border-t border-white/15 divide-y divide-white/15">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id
                return (
                  <div key={faq.id} className="transition-colors">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full py-4 flex items-center justify-between text-left gap-4 cursor-pointer group"
                    >
                      <span className={`text-sm sm:text-base font-semibold transition-colors ${
                        isOpen ? "text-[#FF9900]" : "text-white group-hover:text-slate-200"
                      }`}>
                        {faq.question}
                      </span>
                      <div className="w-7 h-7 shrink-0 border border-white/20 bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-white">
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5 text-[#FF9900]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="pb-5 pr-8 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
