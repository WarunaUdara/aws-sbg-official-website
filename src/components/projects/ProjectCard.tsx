import * as React from "react"
import { Github, ExternalLink, Star, Code2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { BuilderProject } from "@/features/projects/types"

interface ProjectCardProps {
  project: BuilderProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full hover:border-[#FF9900]/40 transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="aws">{project.category}</Badge>
          {project.stars && (
            <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{project.stars}</span>
            </div>
          )}
        </div>
        <CardTitle className="text-lg group-hover:text-[#FF9900] transition-colors">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <CardDescription className="line-clamp-3">
          {project.description}
        </CardDescription>

        {/* AWS Services Stack */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Code2 className="w-3 h-3 text-[#FF9900]" /> AWS Architecture
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.awsServices.map((service) => (
              <span
                key={service}
                className="text-[10px] font-mono bg-slate-800/80 text-[#FF9900] border border-slate-700/60 px-2 py-0.5 rounded"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Contributors */}
        <div className="pt-2 border-t border-slate-800/80">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Student Builders
          </p>
          <div className="flex flex-wrap gap-x-3 text-xs text-slate-300">
            {project.contributors.map((c) => (
              <span key={c.name} className="hover:text-white">
                {c.name} <span className="text-slate-500">({c.role})</span>
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 pt-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5" /> Source Code
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs inline-flex items-center gap-1 text-[#FF9900] hover:underline transition-colors"
          >
            Live Demo <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </CardFooter>
    </Card>
  )
}
