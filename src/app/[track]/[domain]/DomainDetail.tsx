import Link from 'next/link'
import type { Track, Domain } from '@/lib/types'

interface DomainDetailProps {
  track: Track
  domain: Domain
}

export default function DomainDetail({ track, domain }: DomainDetailProps) {
  return (
    <div>
      <nav className="mb-6 text-sm text-gray-500 flex gap-2">
        <Link href={`/${track.id}`} className="hover:underline">{track.name}</Link>
        <span>/</span>
        <span className="font-medium text-gray-800">{domain.name}</span>
      </nav>

      {domain.comingSoon ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          <p className="text-lg font-medium">Coming soon</p>
          <p className="mt-1 text-sm">This domain is under development.</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-8">{domain.description}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {domain.competencies.map((competency) => (
              <Link
                key={competency.id}
                href={`/${track.id}/${domain.id}/${competency.id}`}
                className="block rounded-lg border p-4 hover:border-blue-400"
              >
                <h2 className="font-semibold text-gray-800">{competency.name}</h2>
                <p className="mt-1 text-sm text-gray-500">{competency.description}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
