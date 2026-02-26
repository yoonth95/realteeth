import { CloudSun } from 'lucide-react'

export function HeaderIcon() {
  return (
    <div className="flex items-center gap-2 pr-3 text-xl font-bold tracking-tight">
      <CloudSun className="text-primary h-6 w-6" />
      <span className="hidden sm:inline-block">WeatherNow</span>
    </div>
  )
}
