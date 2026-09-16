import * as React from "react"
import { Calendar, Clock, MapPin, Video, Users, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { CommunityEvent } from "@/features/events/types"
import { formatDate } from "@/lib/utils"

interface EventCardProps {
  event: CommunityEvent
}

export function EventCard({ event }: EventCardProps) {
  const isUpcoming = event.status === "upcoming"

  return (
    <Card className="flex flex-col h-full hover:border-[#FF9900]/40 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant={isUpcoming ? "aws" : "secondary"}>
            {event.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            {event.isVirtual ? (
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <Video className="w-3.5 h-3.5" /> Virtual
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#FF9900]" /> In-Person
              </span>
            )}
          </div>
        </div>
        <CardTitle className="text-xl line-clamp-2 hover:text-[#FF9900] transition-colors">
          {event.title}
        </CardTitle>
        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 pt-2">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#FF9900]" />
            {formatDate(event.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {event.time}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <CardDescription className="line-clamp-3">
          {event.description}
        </CardDescription>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {event.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Speakers */}
        {event.speakers.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Speakers / Instructors
            </p>
            <div className="space-y-1">
              {event.speakers.map((speaker) => (
                <div key={speaker.name} className="text-xs text-slate-200">
                  <span className="font-medium text-white">{speaker.name}</span>
                  <span className="text-slate-400"> • {speaker.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4">
        {isUpcoming ? (
          <Button variant="glow" size="sm" className="w-full">
            Register / RSVP Now
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        ) : (
          <Button variant="secondary" size="sm" className="w-full" disabled={!event.recordingUrl}>
            {event.recordingUrl ? "Watch Session Recording" : "Event Completed"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
