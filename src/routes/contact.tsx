import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MessageSquare, Send, CheckCircle2, Users, HelpCircle, Mail, MapPin } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import { submitContactFn } from '@/server/functions/contact.functions'
import { SITE_CONFIG } from '@/lib/constants'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

const FACULTIES = [
  'Faculty of Applied Sciences',
  'Faculty of Technology',
  'Faculty of Engineering',
  'Faculty of Management Studies & Commerce',
  'Faculty of Humanities & Social Sciences',
  'Faculty of Medical Sciences',
  'Other / Alumni',
]

const INTEREST_AREAS = [
  'Cloud Practitioner / SAA Certification',
  'Serverless & AWS CDK Development',
  'GenAI & Amazon Bedrock',
  'DevOps & Containers',
  'Guild Organization & Event Volunteer',
]

function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    studentId: '',
    faculty: FACULTIES[0],
    interest: INTEREST_AREAS[0],
    message: '',
  })

  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedbackMessage, setFeedbackMessage] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await submitContactFn({
        data: formData,
      })
      setStatus('success')
      setFeedbackMessage(res.message)
    } catch (err) {
      setStatus('error')
      setFeedbackMessage(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    }
  }

  return (
    <div className="py-12 md:py-20">
      <Container size="lg">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] text-xs font-mono uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect & Join</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Join the <span className="aws-gradient-text">Guild Community</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Ready to dive into cloud computing? Fill out the membership form to get added to our student developer roster,
            or drop us an inquiry regarding partnerships, workshops, and speaking opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-none border border-white/10 bg-[#161F2E]/80 backdrop-blur-xl p-8 sm:p-10 shadow-xl">
              {status === 'success' ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">Application Received!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    {feedbackMessage}
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={SITE_CONFIG.links.discord} target="_blank" rel="noreferrer">
                      <Button variant="glow" size="sm" className="rounded-none">
                        Join Discord Server
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none"
                      onClick={() => {
                        setStatus('idle')
                        setFormData({
                          name: '',
                          email: '',
                          studentId: '',
                          faculty: FACULTIES[0],
                          interest: INTEREST_AREAS[0],
                          message: '',
                        })
                      }}
                    >
                      Submit Another
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="p-4 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                      {feedbackMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Waruna Udara"
                        className="w-full px-3.5 py-2.5 rounded-none bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF9900]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="student@sjp.ac.lk"
                        className="w-full px-3.5 py-2.5 rounded-none bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF9900]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                        Student / Registration ID
                      </label>
                      <input
                        type="text"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        placeholder="e.g. AS2022xxx"
                        className="w-full px-3.5 py-2.5 rounded-none bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF9900]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                        Faculty
                      </label>
                      <select
                        value={formData.faculty}
                        onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-none bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#FF9900]"
                      >
                        {FACULTIES.map((fac) => (
                          <option key={fac} value={fac} className="bg-slate-900">
                            {fac}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                      Primary Area of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-none bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-[#FF9900]"
                    >
                      {INTEREST_AREAS.map((interest) => (
                        <option key={interest} value={interest} className="bg-slate-900">
                          {interest}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                      Message / What do you want to build or learn? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us a little about your background, experience with cloud/code, or what you hope to achieve with AWS SBG USJ..."
                      className="w-full px-3.5 py-2.5 rounded-none bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF9900] resize-y"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full rounded-none"
                  >
                    {status === 'submitting' ? (
                      'Submitting...'
                    ) : (
                      <>
                        Submit Application
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Info / Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-none border border-white/10 bg-[#161F2E]/60 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                <Users className="w-5 h-5 text-[#FF9900]" /> Community Channels
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect directly with fellow students, ask cloud questions, share architectures, and stay notified about upcoming events.
              </p>
              <div className="space-y-2 pt-2">
                <a
                  href={SITE_CONFIG.links.meetup}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 rounded-none bg-slate-950 border border-slate-800 hover:border-[#F64060]/60 text-sm text-white transition-colors"
                >
                  <span className="font-semibold text-[#F64060] block text-xs font-mono">Meetup Group</span>
                  Campus workshops, RSVPs & hands-on sessions at Mattegoda / USJ
                </a>
                <a
                  href={SITE_CONFIG.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 rounded-none bg-slate-950 border border-slate-800 hover:border-emerald-500/60 text-sm text-white transition-colors"
                >
                  <span className="font-semibold text-emerald-400 block text-xs font-mono">WhatsApp Channel</span>
                  Instant event announcements, study group alerts & campus updates
                </a>
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 rounded-none bg-slate-950 border border-slate-800 hover:border-[#0077B5]/60 text-sm text-white transition-colors"
                >
                  <span className="font-semibold text-[#0077B5] block text-xs font-mono">LinkedIn Organization</span>
                  Professional networking, speaker spotlights & certification milestones
                </a>
                <a
                  href={SITE_CONFIG.links.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 rounded-none bg-slate-950 border border-slate-800 hover:border-[#5865F2]/60 text-sm text-white transition-colors"
                >
                  <span className="font-semibold text-[#5865F2] block text-xs font-mono">Discord Server</span>
                  Technical discussions, architecture reviews & peer code help
                </a>
                <a
                  href={SITE_CONFIG.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 rounded-none bg-slate-950 border border-slate-800 hover:border-[#FF9900]/50 text-sm text-white transition-colors"
                >
                  <span className="font-semibold text-slate-300 block text-xs font-mono">GitHub Organization</span>
                  Open source workshops, CDK templates & student projects
                </a>
              </div>
            </div>

            <div className="rounded-none border border-white/10 bg-[#161F2E]/60 p-6 space-y-3 text-xs text-slate-400">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 font-display">
                <MapPin className="w-4 h-4 text-[#FF9900]" /> Location
              </h4>
              <p>University of Sri Jayewardenepura, Gangodawila, Nugegoda, Sri Lanka.</p>
              <p className="flex items-center gap-1.5 pt-2 text-slate-300 font-mono">
                <Mail className="w-3.5 h-3.5 text-[#FF9900]" />
                aws.sbg.usj@gmail.com
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
