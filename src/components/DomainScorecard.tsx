import Link from 'next/link'
import type { Domain } from '@/lib/types'

interface Props {
  domain: Domain
  metCount: number
  total: number
  ratings: { developing: number; meeting: number; exceeding: number }
  href: string
}

export default function DomainScorecard({ domain, metCount, total, ratings, href }: Props) {
  return (
    <Link href={href} className="block rounded-lg border bg-white p-4 hover:shadow-sm transition-shadow">
      <h3 className="font-semibold text-gray-900">{domain.name}</h3>
      <p className="mt-1 text-sm text-gray-600">
        {metCount} / {total}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {ratings.developing > 0 && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {ratings.developing} Developing
          </span>
        )}
        {ratings.meeting > 0 && (
          <span className="rounded-full bg-leapverse-10 px-2 py-0.5 text-xs text-leapverse-100">
            {ratings.meeting} Meeting
          </span>
        )}
        {ratings.exceeding > 0 && (
          <span className="rounded-full bg-leapverse-100 px-2 py-0.5 text-xs text-white">
            {ratings.exceeding} Exceeding
          </span>
        )}
      </div>
    </Link>
  )
}
