import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DomainDetail from '../DomainDetail'
import { getTrack } from '@/lib/content'

describe('B-2: domain detail — live domain (dev/leadership)', () => {
  it('renders all competency names', () => {
    const track = getTrack('dev')!
    const domain = track.domains.find((d) => d.id === 'leadership')!
    render(<DomainDetail track={track} domain={domain} />)
    for (const competency of domain.competencies) {
      expect(screen.getByText(competency.name)).toBeTruthy()
    }
  })

  it('each competency card links to /{track}/{domain}/{competency-slug}', () => {
    const track = getTrack('dev')!
    const domain = track.domains.find((d) => d.id === 'leadership')!
    render(<DomainDetail track={track} domain={domain} />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(domain.competencies.length)
    for (const competency of domain.competencies) {
      const link = screen.getByRole('link', { name: new RegExp(competency.name, 'i') })
      expect(link.getAttribute('href')).toBe(`/dev/leadership/${competency.id}`)
    }
  })

  it('breadcrumb contains track name and domain name', () => {
    const track = getTrack('dev')!
    const domain = track.domains.find((d) => d.id === 'leadership')!
    render(<DomainDetail track={track} domain={domain} />)
    expect(screen.getByText(track.name)).toBeTruthy()
    expect(screen.getByText(domain.name)).toBeTruthy()
  })
})

describe('B-2: domain detail — coming-soon domain (qa/technical-skill)', () => {
  it('renders "Coming soon" text', () => {
    const track = getTrack('qa')!
    const domain = track.domains.find((d) => d.id === 'technical-skill')!
    render(<DomainDetail track={track} domain={domain} />)
    expect(screen.getByText(/coming soon/i)).toBeTruthy()
  })

  it('renders zero competency anchor links in DOM', () => {
    const track = getTrack('qa')!
    const domain = track.domains.find((d) => d.id === 'technical-skill')!
    const { container } = render(<DomainDetail track={track} domain={domain} />)
    // No anchors should point to a competency slug path
    const anchors = container.querySelectorAll('a[href*="/technical-skill/"]')
    expect(anchors).toHaveLength(0)
    // Also assert overall link count = 0 (breadcrumb links are ok if they're not competency links)
    const competencyLinks = container.querySelectorAll(`a[href^="/qa/technical-skill/"]`)
    expect(competencyLinks).toHaveLength(0)
  })
})
