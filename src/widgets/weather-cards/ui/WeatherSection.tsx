import { CurrentWeatherCard } from './current-weather-card'
import { HourlyForecastCard } from './hourly-forecast-card'
// import { WeatherSkeleton } from './WeatherSkeleton'

export function WeatherSection() {
  return (
    <>
      {/* <WeatherSkeleton /> */}
      <CurrentWeatherCard />
      <HourlyForecastCard />
    </>
  )
}
