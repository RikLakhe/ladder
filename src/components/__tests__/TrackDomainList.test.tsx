import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import TrackDomainList from '../TrackDomainList'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'
import { getTrack } from '@/lib/content'

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

const devTrack = getTrack('dev')!

describe('B-2: TrackDomainList — dev track', () => {
  it('renders leadership and delivery domain names', () => {
    render(<TrackDomainList track={devTrack} />)
    expect(screen.getByText('Leadership')).toBeTruthy()
    expect(screen.getByText('Delivery')).toBeTruthy()
  })

  it('renders at least 4 progress ring percentage elements', () => {
    render(<TrackDomainList track={devTrack} />)
    const rings = screen.getAllByTestId('progress-ring')
    expect(rings.length).toBeGreaterThanOrEqual(4)
  })

  it('non-coming-soon domains are wrapped in links', () => {
    render(<TrackDomainList track={devTrack} />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('coming-soon domain (technical-skill in qa track) shows no ring and no link', () => {
    const qaTrack = getTrack('qa')!
    render(<TrackDomainList track={qaTrack} />)
    const rings = screen.getAllByTestId('progress-ring')
    expect(rings).toHaveLength(4)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
  })
})
