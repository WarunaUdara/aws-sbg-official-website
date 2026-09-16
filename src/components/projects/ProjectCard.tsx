import * as React from "react"
import { ExternalLink, Star, Code2 } from "lucide-react"
import { GithubIcon } from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { BuilderProject } from "@/features/projects/types"

interface ProjectCardProps {
  project: BuilderProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full bg-[#161F2E]/90 border border-white/10 hover:border-[#FF9900]/50 transition-all duration-250 rounded-none group">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="aws" className="font-mono text-[10px] rounded-none uppercase">
            {project.category}
          </Badge>
          {project.stars && (
            <div className="flex items-center gap-1 text-xs font-mono text-amber-400 font-medium bg-[#0A0E17] px-2 py-0.5 border border-white/5">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{project.stars}</span>
            </div>
          )}
        </div>
        <CardTitle className="text-xl font-display font-bold text-white group-hover:text-[#FF9900] transition-colors">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-0 flex-1 space-y-4 font-sans">
        <CardDescription className="line-clamp-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {project.description}
        </CardDescription>

        {/* AWS Services Stack */}
        <div>
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5 text-[#FF9900]" /> AWS ARCHITECTURE
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.awsServices.map((service) => (
              <span
                key={service}
                className="text-[10px] font-mono bg-[#0A0E17] text-[#FF9900] border border-white/10 px-2 py-0.5"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Contributors */}
        <div className="pt-2 border-t border-white/10">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
            STUDENT BUILDERS
          </p>
          <div className="flex flex-wrap gap-x-3 text-xs text-slate-300 font-sans">
            {project.contributors.map((c) => (
              <span key={c.name} className="hover:text-white">
                {c.name} <span className="text-slate-500 font-mono text-[11px]">[{c.role}]</span>
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-auto flex items-center justify-between gap-2 pt-4 border-t border-white/10 font-mono text-xs">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" /> Source
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[#FF9900] hover:underline transition-colors"
          >
            Live Demo <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </CardFooter>
    </Card>
  )
}
