import { notFound } from 'next/navigation'
import { getTrack } from '@/lib/content'
import TrackOverview from './TrackOverview'
import type { TrackId } from '@/lib/types'

interface TrackPageProps {
  params: Promise<{ track: string }>
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { track: trackSlug } = await params
  const track = getTrack(trackSlug as TrackId)

  if (!track) {
    notFound()
  }

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{track.name}</h1>
      <p className="text-gray-600 mb-8">{track.description}</p>
      <TrackOverview track={track} />
    </main>
  )
}
