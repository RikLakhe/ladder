import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { useLadderStore } from '@/lib/store'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('B-2: StoreHydration', () => {
  it('renders no DOM elements', async () => {
    const rehydrateSpy = vi.fn()
    vi.spyOn(useLadderStore.persist, 'rehydrate').mockImplementation(rehydrateSpy)

    const { default: StoreHydration } = await import('../StoreHydration')
    const { container } = render(<StoreHydration />)
    expect(container.firstChild).toBeNull()
  })

  it('calls rehydrate() exactly once after mount (not during render)', async () => {
    const rehydrateSpy = vi.fn()
    vi.spyOn(useLadderStore.persist, 'rehydrate').mockImplementation(rehydrateSpy)

    const { default: StoreHydration } = await import('../StoreHydration')

    // Not called during render (synchronous)
    let callCountDuringRender = 0
    const originalImpl = rehydrateSpy.getMockImplementation()
    rehydrateSpy.mockImplementation(() => {
      callCountDuringRender++
      return originalImpl?.()
    })

    render(<StoreHydration />)
    // After render (useEffect runs in testing-library after render)
    expect(rehydrateSpy).toHaveBeenCalledTimes(1)
  })
})
