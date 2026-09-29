'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLadderStore } from '@/lib/store'
import type { Track, LevelId } from '@/lib/types'

interface CriterionStep {
  criterionId: string
  criterionText: string
  domainId: string
  domainName: string
  competencyId: string
  competencyName: string
  assessmentKey: string
}

function buildSequence(track: Track, level: LevelId, scope: string | null): CriterionStep[] {
  const steps: CriterionStep[] = []
  for (const domain of track.domains) {
    if (domain.comingSoon) continue
    for (const competency of domain.competencies) {
      if (scope !== null && competency.id !== scope) continue
      const ld = competency.levels.find((l) => l.level === level)
      if (!ld) continue
      for (const criterion of ld.criteria) {
        steps.push({
          criterionId: criterion.id,
          criterionText: criterion.text,
          domainId: domain.id,
          domainName: domain.name,
          competencyId: competency.id,
          competencyName: competency.name,
          assessmentKey: `${track.id}/${domain.id}/${competency.id}`,
        })
      }
    }
  }
  return steps
}

interface Props {
  track: Track
  scope: string | null
}

export default function WorkshopWizard({ track, scope }: Props) {
  const { currentLevel, assessments, workshopPosition, setWorkshopPosition, toggleCriterion, setRating } =
    useLadderStore()

  const sequence = buildSequence(track, currentLevel, scope)
  const total = sequence.length

  const resumeIndex =
    workshopPosition &&
    workshopPosition.track === track.id &&
    workshopPosition.level === currentLevel &&
    workshopPosition.scope === scope
      ? workshopPosition.criterionIndex
      : null

  const [index, setIndex] = useState(resumeIndex ?? 0)
  const [showResume, setShowResume] = useState(resumeIndex !== null && resumeIndex > 0)
  const [done, setDone] = useState(false)

  const pointerStartX = useRef<number | null>(null)

  useEffect(() => {
    if (!done && total > 0) {
      setWorkshopPosition({
        track: track.id,
        level: currentLevel,
        scope,
        criterionIndex: index,
        totalCriteria: total,
        startedAt: workshopPosition?.startedAt ?? new Date().toISOString(),
      })
    }
  }, [index, done])

  function advance() {
    if (index + 1 >= total) {
      setDone(true)
      setWorkshopPosition(null)
    } else {
      setIndex(index + 1)
    }
  }

  function goBack() {
    if (index > 0) setIndex(index - 1)
  }

  function skip() {
    advance()
  }

  function handlePointerDown(e: React.PointerEvent) {
    pointerStartX.current = e.clientX
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (pointerStartX.current === null) return
    const delta = e.clientX - pointerStartX.current
    pointerStartX.current = null
    if (delta > 60) goBack()
    else if (delta < -60) advance()
  }

  if (done || total === 0) {
    const checkedCount = Object.values(assessments).reduce(
      (acc, a) => acc + a.criteriaChecked.length,
      0
    )
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Workshop complete</h1>
        <p className="text-gray-500">{checkedCount} criteria marked as practiced</p>
        <div className="flex gap-4">
          <Link
            href={`/${track.id}/results`}
            className="rounded-full bg-leapverse-100 px-5 py-2 text-sm font-medium text-white"
          >
            See my results
          </Link>
          <Link
            href={`/${track.id}`}
            className="rounded-full border border-leapverse-100 px-5 py-2 text-sm font-medium text-leapverse-100"
          >
            Review by domain
          </Link>
        </div>
      </div>
    )
  }

  const step = sequence[index]
  const assessment = assessments[step.assessmentKey]
  const isChecked = assessment?.criteriaChecked.includes(step.criterionId) ?? false
  const currentRating = assessment?.selfRating

  return (
    <div
      className="flex flex-col gap-6 select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Resume banner */}
      {showResume && (
        <div className="rounded-lg bg-leapverse-10 p-4 flex items-center justify-between">
          <span className="text-sm text-gray-700">
            You left off at criterion {index + 1} of {total}. Continue?
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowResume(false)}
              className="text-sm font-medium text-leapverse-100"
            >
              Continue
            </button>
            <button
              onClick={() => { setIndex(0); setShowResume(false) }}
              className="text-sm font-medium text-gray-500"
            >
              Restart
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">{track.name}</h1>
          <span className="text-sm text-gray-500">{index + 1} of {total}</span>
        </div>
        <progress
          value={index}
          max={total}
          className="w-full h-2 rounded-full"
          aria-label="Workshop progress"
        />
      </div>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-400">
        <span>{step.domainName}</span>
        <span className="mx-1">·</span>
        <span>{step.competencyName}</span>
        <span className="mx-1">·</span>
        <span>{currentLevel.toUpperCase()}</span>
      </div>

      {/* Criterion card */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-base font-medium text-gray-800">{step.criterionText}</p>
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => toggleCriterion(step.assessmentKey, step.criterionId)}
          className="h-5 w-5 rounded border-gray-300 text-leapverse-100"
        />
        <span className="text-sm font-medium text-gray-700">I do this regularly</span>
      </label>

      {/* Rating */}
      <div className="flex gap-3">
        {(['developing', 'meeting', 'exceeding'] as const).map((value) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={`rating-${step.criterionId}`}
              value={value}
              checked={currentRating === value}
              onChange={() => setRating(step.assessmentKey, value)}
              className="text-leapverse-100"
            />
            <span className="text-sm text-gray-700 capitalize">{value}</span>
          </label>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={goBack}
          disabled={index === 0}
          className="rounded-full border px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          onClick={skip}
          className="rounded-full border px-4 py-2 text-sm font-medium text-gray-500"
        >
          Skip
        </button>
        <button
          onClick={advance}
          className="rounded-full bg-leapverse-100 px-4 py-2 text-sm font-medium text-white"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
