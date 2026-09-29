/// <reference types="@testing-library/jest-dom/vitest" />
import { render } from '@testing-library/react'
import ProgressBar from '../ProgressBar'

describe('ProgressBar', () => {
  it('B-1: fill element width matches percentage prop', () => {
    const { container } = render(<ProgressBar percentage={60} />)
    const fill = container.querySelector('[data-testid="progress-fill"]')
    expect(fill).toBeTruthy()
    expect((fill as HTMLElement).style.width).toBe('60%')
  })

  it('clamps to 0 when percentage is 0', () => {
    const { container } = render(<ProgressBar percentage={0} />)
    const fill = container.querySelector('[data-testid="progress-fill"]')
    expect((fill as HTMLElement).style.width).toBe('0%')
  })

  it('renders 100% width at full completion', () => {
    const { container } = render(<ProgressBar percentage={100} />)
    const fill = container.querySelector('[data-testid="progress-fill"]')
    expect((fill as HTMLElement).style.width).toBe('100%')
  })
})
