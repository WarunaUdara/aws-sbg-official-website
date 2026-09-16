import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Code2, PlusCircle } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Button } from '@/components/ui/button'
import { MOCK_PROJECTS } from '@/features/projects/data'
import { SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
})

const CATEGORIES = ['All', 'AI/ML', 'Serverless', 'IoT', 'DevOps', 'Web Apps'] as const

function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All')

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true
    return p.category === selectedCategory
  })

  return (
    <div className="py-12 md:py-20">
      <Container size="lg">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] text-xs font-mono uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            <span>USJ Builder Ecosystem</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Student Projects & <span className="aws-gradient-text">Architectures</span>
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            Real solutions designed and deployed on Amazon Web Services by undergraduate students
            at the University of Sri Jayewardenepura.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-none text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#FF9900] text-slate-950 font-bold shadow-sm'
                  : 'bg-[#161F2E] text-slate-300 hover:text-white border border-white/10 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Connected Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/10 bg-[#0A0E17] mb-16">
          {filteredProjects.map((project, i) => {
            const isLastRowMobile = i === filteredProjects.length - 1
            const isLastColTablet = i % 2 === 1 || i === filteredProjects.length - 1
            const isLastColDesktop = i % 3 === 2 || i === filteredProjects.length - 1

            return (
              <ProjectCard
                key={project.id}
                project={project}
                bordered={false}
                className={cn(
                  "border-white/10",
                  !isLastRowMobile && "border-b",
                  !isLastColTablet && "md:border-r",
                  !isLastColDesktop && "lg:border-r",
                  isLastColDesktop && "lg:border-r-0"
                )}
              />
            )
          })}
        </div>

        {/* Submit Your Project Callout */}
        <div className="rounded-none border border-white/10 bg-[#161F2E]/60 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <PlusCircle className="w-5 h-5 text-[#FF9900]" />
              Are you building with AWS at USJ?
            </h3>
            <p className="text-base text-slate-300 max-w-xl">
              Get your cloud project featured on the official AWS SBG USJ website, receive technical feedback,
              and inspire other student builders!
            </p>
          </div>
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noreferrer"
            className="w-full md:w-auto"
          >
            <Button variant="glow" size="md" className="w-full md:w-auto whitespace-nowrap">
              Submit Project via PR
            </Button>
          </a>
        </div>
      </Container>
    </div>
  )
}
