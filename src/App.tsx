import { useState, useCallback } from 'react'
import HomePage from './pages/HomePage'

export default function App() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleExpand = useCallback((id: string) => {
    setExpandedId(id)
  }, [])

  const handleCollapse = useCallback(() => {
    setExpandedId(null)
  }, [])

  return (
    <div className="flex justify-center">
      <HomePage
        expandedId={expandedId}
        onExpand={handleExpand}
        onCollapse={handleCollapse}
      />
    </div>
  )
}
