import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTrack } from '@/lib/content'
import WorkshopWizard from '@/components/WorkshopWizard'
import type { TrackId } from '@/lib/types'

interface WorkshopPageProps {
  params: Promise<{ track: string }>
  searchParams: Promise<{ scope?: string }>
}

export async function generateMetadata({ params }: WorkshopPageProps): Promise<Metadata> {
  const { track: trackSlug } = await params
  const track = getTrack(trackSlug as TrackId)
  if (!track) return {}
  return {
    title: `Workshop — ${track.name}`,
    description: `Step through your ${track.name} assessment criteria.`,
  }
}

export default async function WorkshopPage({ params, searchParams }: WorkshopPageProps) {
  const { track: trackSlug } = await params
  const { scope } = await searchParams
  const track = getTrack(trackSlug as TrackId)

  if (!track) {
    notFound()
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <WorkshopWizard track={track} scope={scope ?? null} />
    </main>
  )
}
