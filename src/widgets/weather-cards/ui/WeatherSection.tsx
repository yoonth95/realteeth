import { CurrentWeatherCard } from './current-weather-card'
import { HourlyForecastCard } from './hourly-forecast-card'
import type { Bookmark } from '@/entities/bookmark'

export function WeatherSection({ bookmark }: { bookmark?: Bookmark }) {
  return (
    <>
      {/* <WeatherSkeleton /> */}
      <CurrentWeatherCard bookmark={bookmark} />
      <HourlyForecastCard bookmark={bookmark} />
    </>
  )
}
