'use client'

import { useLadderStore } from '@/lib/store'
import RadarChart from '@/components/RadarChart'
import DomainScorecard from '@/components/DomainScorecard'
import FocusAreaCard from '@/components/FocusAreaCard'
import type { Track, LevelId } from '@/lib/types'

const LEVEL_ORDER: LevelId[] = ['p2', 'p3', 'p4', 'p5', 'p6', 'p7']

function nextLevel(level: LevelId): LevelId | null {
  const idx = LEVEL_ORDER.indexOf(level)
  return idx >= 0 && idx < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[idx + 1] : null
}

interface Props {
  track: Track
}

export default function ResultsDashboard({ track }: Props) {
  const { currentLevel, assessments } = useLadderStore()

  const liveDomains = track.domains.filter((d) => !d.comingSoon)

  // Compute domain stats
  const domainStats = liveDomains.map((domain) => {
    let metCount = 0
    let total = 0
    const ratings = { developing: 0, meeting: 0, exceeding: 0 }

    for (const competency of domain.competencies) {
      const key = `${track.id}/${domain.id}/${competency.id}`
      const assessment = assessments[key]
      const checkedIds = assessment?.criteriaChecked ?? []
      const ld = competency.levels.find((l) => l.level === currentLevel)
      if (!ld) continue
      total += ld.criteria.length
      metCount += ld.criteria.filter((c) => checkedIds.includes(c.id)).length
      if (assessment?.selfRating === 'developing') ratings.developing++
      else if (assessment?.selfRating === 'meeting') ratings.meeting++
      else if (assessment?.selfRating === 'exceeding') ratings.exceeding++
    }

    const metPct = total === 0 ? 0 : Math.round((metCount / total) * 100)
    const exceedingPct =
      domain.competencies.length === 0
        ? 0
        : Math.round((ratings.exceeding / domain.competencies.length) * 100)

    return { domain, metCount, total, ratings, metPct, exceedingPct }
  })

  // Focus areas: all competencies across live domains, sorted by metCount/total asc, then name asc
  interface CompetencyScore {
    competency: (typeof liveDomains)[number]['competencies'][number]
    domain: (typeof liveDomains)[number]
    metCount: number
    total: number
  }

  const allCompetencyScores: CompetencyScore[] = []
  for (const domain of liveDomains) {
    for (const competency of domain.competencies) {
      const key = `${track.id}/${domain.id}/${competency.id}`
      const assessment = assessments[key]
      const checkedIds = assessment?.criteriaChecked ?? []
      const ld = competency.levels.find((l) => l.level === currentLevel)
      const total = ld?.criteria.length ?? 0
      const metCount = ld ? ld.criteria.filter((c) => checkedIds.includes(c.id)).length : 0
      allCompetencyScores.push({ competency, domain, metCount, total })
    }
  }

  const focusAreas = [...allCompetencyScores]
    .sort((a, b) => {
      const ratioA = a.total === 0 ? 0 : a.metCount / a.total
      const ratioB = b.total === 0 ? 0 : b.metCount / b.total
      if (ratioA !== ratioB) return ratioA - ratioB
      return a.competency.name.localeCompare(b.competency.name)
    })
    .slice(0, 3)

  // Nudge condition
  const next = nextLevel(currentLevel)
  const showNudge = next !== null && domainStats.every((s) => s.metPct >= 80)

  // Radar data
  const radarData = domainStats.map((s) => ({
    domain: s.domain.name,
    metPct: s.metPct,
    exceedingPct: s.exceedingPct,
  }))

  return (
    <div className="space-y-8">
      {/* Nudge */}
      {showNudge && (
        <div className="rounded-lg bg-leapverse-10 p-4 text-center">
          <p className="font-semibold text-leapverse-100">Ready for {next!.toUpperCase()}?</p>
          <p className="mt-1 text-sm text-gray-600">All domains are ≥ 80% complete at your current level.</p>
        </div>
      )}

      {/* Radar chart */}
      <div className="flex justify-center">
        <RadarChart data={radarData} />
      </div>

      {/* Export */}
      <div className="flex justify-end">
        <button
          onClick={() => window.print()}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-leapverse-100 print:hidden"
        >
          Export summary
        </button>
      </div>

      {/* Domain scorecards */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Domains</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domainStats.map(({ domain, metCount, total, ratings }) => (
            <DomainScorecard
              key={domain.id}
              domain={domain}
              metCount={metCount}
              total={total}
              ratings={ratings}
              href={`/${track.id}/${domain.id}`}
            />
          ))}
        </div>
      </section>

      {/* Focus areas */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Focus Areas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {focusAreas.map(({ competency, domain, metCount, total }) => (
            <FocusAreaCard
              key={`${domain.id}/${competency.id}`}
              competency={competency}
              domain={domain}
              metCount={metCount}
              total={total}
              href={`/${track.id}/${domain.id}/${competency.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
