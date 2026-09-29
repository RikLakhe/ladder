import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'
import { getTrack } from '@/lib/content'
import WorkshopWizard from '../WorkshopWizard'

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

describe('B-1: WorkshopWizard renders header with track name, counter, and progress bar', () => {
  it('shows track name, "1 of N" counter, and <progress> element', () => {
    const devTrack = getTrack('dev')!
    render(<WorkshopWizard track={devTrack} scope={null} />)
    expect(screen.getByText(/Engineering/)).toBeInTheDocument()
    expect(screen.getByText(/1 of \d+/)).toBeInTheDocument()
    expect(document.querySelector('progress')).not.toBeNull()
  })
})
