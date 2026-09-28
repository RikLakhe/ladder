'use client'

import Link from 'next/link'
import { useLadderStore } from '@/lib/store'
import { getTracks } from '@/lib/content'
import type { LevelId, TrackId } from '@/lib/types'

const LEVELS: { id: LevelId; label: string }[] = [
  { id: 'p2', label: 'P2' },
  { id: 'p3', label: 'P3' },
  { id: 'p4', label: 'P4' },
  { id: 'p5', label: 'P5' },
  { id: 'p6', label: 'P6' },
  { id: 'p7', label: 'P7' },
]

export default function HomePage() {
  const currentTrack = useLadderStore((s) => s.currentTrack)
  const currentLevel = useLadderStore((s) => s.currentLevel)
  const setTrack = useLadderStore((s) => s.setTrack)
  const setLevel = useLadderStore((s) => s.setLevel)

  const tracks = getTracks()

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Career Ladder</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Select your track</h2>
        <div className="flex flex-wrap gap-3">
          {tracks.map((track) => (
            <button
              key={track.id}
              aria-pressed={currentTrack === track.id ? 'true' : 'false'}
              onClick={() => setTrack(track.id as TrackId)}
              className={`px-4 py-2 rounded border ${
                currentTrack === track.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-blue-400'
              }`}
            >
              {track.name}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Select your level</h2>
        <div className="flex flex-wrap gap-3">
          {LEVELS.map(({ id, label }) => (
            <button
              key={id}
              aria-pressed={currentLevel === id ? 'true' : 'false'}
              onClick={() => setLevel(id)}
              className={`px-4 py-2 rounded border ${
                currentLevel === id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-blue-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {currentTrack && (
        <nav>
          <Link
            href={`/${currentTrack}`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            View my ladder
          </Link>
        </nav>
      )}
    </main>
  )
}
