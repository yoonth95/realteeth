import { Droplets, Wind, Thermometer } from 'lucide-react'

import type { WeatherDetailStatsProps } from './types'

export function WeatherDetailStats({
  feelsLike,
  humidity,
  windSpeed,
}: WeatherDetailStatsProps) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      <div className="bg-secondary/50 flex flex-col items-center gap-1 rounded-xl p-3">
        <div className="text-muted-foreground flex items-center gap-1">
          <Thermometer className="h-3.5 w-3.5" />
          <span className="text-xs">체감</span>
        </div>
        <span className="text-foreground text-sm font-semibold">
          {feelsLike}
        </span>
      </div>
      <div className="bg-secondary/50 flex flex-col items-center gap-1 rounded-xl p-3">
        <div className="text-muted-foreground flex items-center gap-1">
          <Droplets className="h-3.5 w-3.5" />
          <span className="text-xs">습도</span>
        </div>
        <span className="text-foreground text-sm font-semibold">
          {humidity}
        </span>
      </div>
      <div className="bg-secondary/50 flex flex-col items-center gap-1 rounded-xl p-3">
        <div className="text-muted-foreground flex items-center gap-1">
          <Wind className="h-3.5 w-3.5" />
          <span className="text-xs">바람</span>
        </div>
        <span className="text-foreground text-sm font-semibold">
          {windSpeed}
        </span>
      </div>
    </div>
  )
}
