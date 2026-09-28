'use client'

import { useEffect } from 'react'
import { useLadderStore } from '@/lib/store'

export default function StoreHydration() {
  useEffect(() => {
    useLadderStore.persist.rehydrate()
  }, [])

  return null
}
