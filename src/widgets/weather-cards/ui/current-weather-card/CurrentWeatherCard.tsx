import { Card, CardContent } from '@/shared/ui/card'

import type { CurrentWeatherCardProps } from './types'
import { LocationHeader } from './LocationHeader'
import { WeatherDisplay } from './WeatherDisplay'
import { WeatherDetailStats } from './WeatherDetailStats'

export function CurrentWeatherCard({
  // data,
  isBookmark,
  isFull,
  onToggleFavorite,
}: CurrentWeatherCardProps) {
  const currentDate = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date())

  return (
    <article>
      <Card className="bg-card overflow-hidden border-0 shadow-lg">
        <LocationHeader
          location="인천광역시"
          currentDate={currentDate}
          isBookmark={isBookmark}
          isFull={isFull}
          onToggleFavorite={onToggleFavorite}
        />
        <CardContent>
          <WeatherDisplay
            temp="25°"
            description="대체로 맑음"
            tempMin="20°"
            tempMax="30°"
            icon="sun"
          />
          <WeatherDetailStats
            feelsLike="25°"
            humidity="80%"
            windSpeed="10km/h"
          />
        </CardContent>
      </Card>
    </article>
  )
}
