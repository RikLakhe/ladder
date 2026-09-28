import { notFound } from 'next/navigation'
import { getTrack, getDomain } from '@/lib/content'
import DomainDetail from './DomainDetail'
import type { TrackId } from '@/lib/types'

interface DomainPageProps {
  params: Promise<{ track: string; domain: string }>
}

export default async function DomainPage({ params }: DomainPageProps) {
  const { track: trackSlug, domain: domainSlug } = await params
  const track = getTrack(trackSlug as TrackId)
  if (!track) notFound()

  const domain = getDomain(trackSlug as TrackId, domainSlug)
  if (!domain) notFound()

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <DomainDetail track={track} domain={domain} />
    </main>
  )
}
