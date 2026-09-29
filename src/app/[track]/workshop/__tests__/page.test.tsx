import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'

// Mock next/navigation notFound
vi.mock('next/navigation', () => ({ notFound: vi.fn() }))

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

describe('B-8: /[track]/workshop route — renders WorkshopWizard for valid track', () => {
  it('renders the WorkshopWizard progress bar and counter for dev track', async () => {
    const { default: WorkshopPage } = await import('../page')
    const jsx = await WorkshopPage({
      params: Promise.resolve({ track: 'dev' }),
      searchParams: Promise.resolve({}),
    })
    render(jsx as React.ReactElement)
    expect(document.querySelector('progress')).not.toBeNull()
    expect(screen.getByText(/1 of \d+/)).toBeInTheDocument()
  })
})
