import { CurrentWeatherCard } from './current-weather-card'
import { HourlyForecastCard } from './hourly-forecast-card'
import type { Bookmark } from '@/entities/bookmark'
import { useWeatherLocation } from '../lib/useWeatherLocation'
import { ErrorStateCard } from './WeatherSkeleton'

export function WeatherSection({ bookmark }: { bookmark?: Bookmark }) {
  const { hasNoSearchResult } = useWeatherLocation(bookmark)

  if (hasNoSearchResult) {
    return <ErrorStateCard message="해당 장소의 정보가 제공되지 않습니다." />
  }

  return (
    <>
      <CurrentWeatherCard bookmark={bookmark} />
      <HourlyForecastCard bookmark={bookmark} />
    </>
  )
}
