import { WeatherIcon } from '@/entities/weather'
import { getKmaWeatherIcon } from '@/entities/weather/lib/kma-weather-mapper'

interface WeatherData {
  current: {
    temp: string | number
    rainType: string
  }
  forecast: {
    minTemp: string | number
    maxTemp: string | number
    hourlyData: Array<{
      time: string
      sky: string
      pty: string
    }>
  }
}

interface Props {
  data: WeatherData
}
export function BookmarkCardWeatherData({ data }: Props) {
  // 현재 시간과 가장 가까운 단기예보 데이터 찾기
  const nowHourStr = String(new Date().getHours()).padStart(2, '0') + '00'
  const currentHourlyFcst =
    data.forecast.hourlyData.find((d) => d.time === nowHourStr) ||
    data.forecast.hourlyData[0]

  const pty =
    data.current.rainType !== '0' && data.current.rainType !== '--'
      ? data.current.rainType
      : currentHourlyFcst?.pty || '0'
  const sky = currentHourlyFcst?.sky || '1'
  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18

  const { icon, description } = getKmaWeatherIcon(sky, pty, isDay)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-foreground text-2xl font-bold">
          {data.current.temp}°
        </span>
        <span className="text-muted-foreground text-xs">
          최저 <b className="text-highlight-blue">{data.forecast.minTemp}°</b> /
          최고 <b className="text-highlight-red">{data.forecast.maxTemp}°</b>
        </span>
        <span className="text-muted-foreground mt-0.5 text-xs">
          {description}
        </span>
      </div>
      <div className="bg-secondary/70 flex h-10 w-10 items-center justify-center rounded-xl">
        <WeatherIcon icon={icon} className="h-6 w-6" />
      </div>
    </div>
  )
}
