import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTrack, getDomain, getCompetency } from '@/lib/content'
import CompetencyDetail from './CompetencyDetail'
import type { TrackId } from '@/lib/types'

interface CompetencyPageProps {
  params: Promise<{ track: string; domain: string; competency: string }>
}

export async function generateMetadata({ params }: CompetencyPageProps): Promise<Metadata> {
  const { track: trackSlug, domain: domainSlug, competency: competencySlug } = await params
  const track = getTrack(trackSlug as TrackId)
  const domain = getDomain(trackSlug as TrackId, domainSlug)
  const competency = getCompetency(trackSlug as TrackId, domainSlug, competencySlug)
  if (!track || !domain || !competency) return {}
  return {
    title: `${competency.name} — ${domain.name}`,
    description: `Competency criteria and self-assessment for ${competency.name} in the ${track.name} track.`,
  }
}

export default async function CompetencyPage({ params }: CompetencyPageProps) {
  const { track: trackSlug, domain: domainSlug, competency: competencySlug } = await params

  const track = getTrack(trackSlug as TrackId)
  if (!track) notFound()

  const domain = getDomain(trackSlug as TrackId, domainSlug)
  if (!domain) notFound()

  const competency = getCompetency(trackSlug as TrackId, domainSlug, competencySlug)
  if (!competency) notFound()

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <CompetencyDetail track={track} domain={domain} competency={competency} />
    </main>
  )
}
