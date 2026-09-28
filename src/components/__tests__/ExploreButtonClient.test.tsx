import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ExploreButtonClient from '../ExploreButtonClient'

describe('B-1: ExploreButtonClient', () => {
  it('renders a button with accessible text equal to label', () => {
    render(<ExploreButtonClient label="Explore" onClick={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Explore' })).toBeTruthy()
  })

  it('calls onClick exactly once on click', () => {
    const onClick = vi.fn()
    render(<ExploreButtonClient label="Go" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: 'Go' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
