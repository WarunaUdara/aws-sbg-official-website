import * as React from "react"
import { Calendar, Clock, MapPin, Video, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { CommunityEvent } from "@/features/events/types"
import { formatDate } from "@/lib/utils"
import { SITE_CONFIG } from "@/lib/constants"

interface EventCardProps {
  event: CommunityEvent
}

export function EventCard({ event }: EventCardProps) {
  const isUpcoming = event.status === "upcoming"

  return (
    <Card className="flex flex-col h-full bg-[#161F2E]/90 border border-white/10 hover:border-[#FF9900]/50 transition-all duration-250 rounded-none group">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="aws" className="font-mono text-[10px] rounded-none uppercase">
            {event.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
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

        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-slate-400 pt-2 border-b border-white/5 pb-2">
          <span className="inline-flex items-center gap-1 text-[#FF9900]">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(event.date)}
          </span>
          <span className="inline-flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {event.time}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 flex-1 space-y-4 font-sans">
        <CardDescription className="line-clamp-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {event.description}
        </CardDescription>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {event.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono bg-[#0A0E17] text-slate-300 border border-white/5 px-2 py-0.5"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Instructors */}
        {event.speakers.length > 0 && (
          <div className="pt-2 border-t border-white/10">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
              INSTRUCTORS / SPEAKERS:
            </p>
            <div className="space-y-1">
              {event.speakers.map((speaker) => (
                <div key={speaker.name} className="text-xs text-slate-200">
                  <span className="font-medium text-white">{speaker.name}</span>
                  <span className="text-slate-400 text-[11px]"> • {speaker.role}</span>
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
