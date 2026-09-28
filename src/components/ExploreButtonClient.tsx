'use client'

interface ExploreButtonClientProps {
  label: string
  onClick: () => void
}

export default function ExploreButtonClient({ label, onClick }: ExploreButtonClientProps) {
  return (
    <button onClick={onClick} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
      {label}
    </button>
  )
}
