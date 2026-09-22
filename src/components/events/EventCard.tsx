import { Calendar, Clock, MapPin, Video, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { LinkedinIcon } from "@/components/ui/icons"
import type { CommunityEvent } from "@/features/events/types"
import { formatDate, cn } from "@/lib/utils"
import { SITE_CONFIG } from "@/lib/constants"

interface EventCardProps {
  event: CommunityEvent
  className?: string
  bordered?: boolean
}

export function EventCard({ event, className, bordered = true }: EventCardProps) {
  const isUpcoming = event.status === "upcoming"

  return (
    <Card
      className={cn(
        "flex flex-col h-full bg-[#0D0D0D] hover:bg-[#151515]/40 transition-colors duration-200 rounded-none group",
        bordered ? "border border-white/10 hover:border-[#FF9900]/50" : "border-0",
        className
      )}
    >
      <CardHeader className="p-6 pb-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="aws" className="font-mono text-[10px] rounded-none uppercase">
            {event.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
            {event.isVirtual ? (
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <Video className="w-3.5 h-3.5" /> VIRTUAL
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#FF9900]" /> IN-PERSON
              </span>
            )}
          </div>
        </div>

        <CardTitle className="text-xl font-display font-bold line-clamp-2 text-white group-hover:text-[#FF9900] transition-colors">
          {event.title}
        </CardTitle>

        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-slate-300 pt-2 border-b border-white/5 pb-2">
          <span className="inline-flex items-center gap-1 text-[#FF9900]">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(event.date)}
          </span>
          <span className="inline-flex items-center gap-1 text-slate-300">
            <Clock className="w-3.5 h-3.5" />
            {event.time}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 flex-1 space-y-4 font-sans">
        <CardDescription className="line-clamp-3 text-slate-200 text-sm leading-relaxed">
          {event.description}
        </CardDescription>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {event.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono bg-[#0D0D0D] text-slate-200 border border-white/10 px-2 py-0.5"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Instructors */}
        {event.speakers.length > 0 && (
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs font-mono text-slate-300 mb-1">
              Speakers & Leads:
            </p>
            <div className="space-y-1.5">
              {event.speakers.map((speaker) => (
                <div key={speaker.name} className="text-xs text-slate-200 flex items-center flex-wrap gap-1">
                  {speaker.linkedinUrl ? (
                    <a
                      href={speaker.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-white hover:text-[#0077B5] transition-colors inline-flex items-center gap-1 group/spk"
                      title={`${speaker.name} on LinkedIn`}
                    >
                      <span className="underline decoration-white/20 underline-offset-2 group-hover/spk:decoration-[#0077B5]">
                        {speaker.name}
                      </span>
                      <LinkedinIcon className="w-3 h-3 text-[#0077B5] shrink-0 group-hover/spk:scale-110 transition-transform" />
                    </a>
                  ) : (
                    <span className="font-medium text-white">{speaker.name}</span>
                  )}
                  <span className="text-slate-300 text-xs">
                    • {speaker.role} {speaker.company ? `at ${speaker.company}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-auto border-t border-white/10 pt-4">
        {isUpcoming ? (
          <a
            href={event.registrationUrl || SITE_CONFIG.links.meetup}
            target="_blank"
            rel="noreferrer"
            className="w-full block"
          >
            <Button variant="glow" size="sm" className="w-full font-mono text-xs rounded-none">
              RSVP on Meetup
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </a>
        ) : (
          <Button variant="secondary" size="sm" className="w-full font-mono text-xs rounded-none" disabled={!event.recordingUrl}>
            {event.recordingUrl ? "Watch Recording" : "Session Completed"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
