import { useNavigate } from 'react-router-dom'
import { CloudSun } from 'lucide-react'

export function HeaderIcon() {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/')}
      className="flex cursor-pointer items-center gap-2 pr-3 text-xl font-bold tracking-tight"
    >
      <CloudSun className="text-primary h-6 w-6" />
      <span className="hidden sm:inline-block">Weather App</span>
    </div>
  )
}
