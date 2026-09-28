import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from '../page'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

describe('B-2: home page', () => {
  it('renders exactly 4 track buttons', () => {
    render(<HomePage />)
    const trackButtons = screen.getAllByRole('button', { name: /engineering|quality assurance|data|ai/i })
    expect(trackButtons).toHaveLength(4)
  })

  it('renders exactly 6 level buttons', () => {
    render(<HomePage />)
    const levelButtons = screen.getAllByRole('button', { name: /^P[2-7]$/i })
    expect(levelButtons).toHaveLength(6)
  })

  it('clicking a track button updates store', () => {
    render(<HomePage />)
    const devButton = screen.getByRole('button', { name: /engineering/i })
    fireEvent.click(devButton)
    expect(useLadderStore.getState().currentTrack).toBe('dev')
  })

  it('clicking a level button updates store', () => {
    render(<HomePage />)
    const p5Button = screen.getByRole('button', { name: /^P5$/i })
    fireEvent.click(p5Button)
    expect(useLadderStore.getState().currentLevel).toBe('p5')
  })
})
