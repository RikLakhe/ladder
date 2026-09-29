import Link from 'next/link'
import type { Competency, Domain } from '@/lib/types'

interface Props {
  competency: Competency
  domain: Domain
  metCount: number
  total: number
  href: string
}

export default function FocusAreaCard({ competency, domain, metCount, total, href }: Props) {
  return (
    <div data-testid="focus-area-card" className="rounded-lg border bg-white p-4">
      <Link href={href} className="block">
        <h4 className="font-medium text-gray-900">{competency.name}</h4>
        <p className="mt-1 text-sm text-gray-500">{domain.name}</p>
        <p className="mt-1 text-sm font-medium text-leapverse-100">
          {metCount} / {total}
        </p>
      </Link>
    </div>
  )
}
