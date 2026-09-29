import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTrack } from '@/lib/content'
import ResultsDashboard from '@/components/ResultsDashboard'
import type { TrackId } from '@/lib/types'

interface ResultsPageProps {
  params: Promise<{ track: string }>
}

export async function generateMetadata({ params }: ResultsPageProps): Promise<Metadata> {
  const { track: trackSlug } = await params
  const track = getTrack(trackSlug as TrackId)
  if (!track) return {}
  return {
    title: `Results — ${track.name}`,
    description: `Your ${track.name} assessment results.`,
  }
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { track: trackSlug } = await params
  const track = getTrack(trackSlug as TrackId)
  if (!track) notFound()
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <ResultsDashboard track={track!} />
    </main>
  )
}
