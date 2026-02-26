import { CurrentWeatherCard } from './CurrentWeatherCard'
// import { HourlyForecastCard } from './HourlyForecastCard'

export function WeatherSection() {
  return (
    <div className="flex flex-col gap-6">
      <CurrentWeatherCard />
      {/* <HourlyForecastCard /> */}
    </div>
  )
}
