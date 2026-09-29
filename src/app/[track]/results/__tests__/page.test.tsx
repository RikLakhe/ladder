import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'

vi.mock('next/navigation', () => ({ notFound: vi.fn() }))

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

describe('B-5: /[track]/results route renders ResultsDashboard for valid track', () => {
  it('renders radar SVG and focus-area-card elements for dev track', async () => {
    const { default: ResultsPage } = await import('../page')
    const jsx = await ResultsPage({
      params: Promise.resolve({ track: 'dev' }),
    })
    render(jsx as React.ReactElement)
    expect(document.querySelector('svg')).not.toBeNull()
    const cards = screen.getAllByTestId('focus-area-card')
    expect(cards).toHaveLength(3)
  })
})
