import { WeatherIcon } from '@/entities/weather'

import type { WeatherDisplayProps } from './types'

export function WeatherDisplay({
  temp,
  description,
  tempMin,
  tempMax,
  icon,
}: WeatherDisplayProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-foreground text-6xl font-bold tracking-tighter">
          {temp}
        </span>
        <span className="text-muted-foreground mt-1 text-sm font-semibold">
          {description}
        </span>
        <span className="text-muted-foreground mt-0.5 text-xs">
          최저 <b className="text-highlight-blue">{tempMin}</b> / 최고{' '}
          <b className="text-highlight-red">{tempMax}</b>
        </span>
      </div>
      <div className="bg-secondary/50 flex h-20 w-20 items-center justify-center rounded-2xl">
        <WeatherIcon icon={icon} className="h-12 w-12" />
      </div>
    </div>
  )
}
