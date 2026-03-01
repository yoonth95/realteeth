import { Card, CardContent } from '@/shared/ui/card'
import { useQueryClient } from '@tanstack/react-query'
import { CurrentWeatherSkeleton, ErrorStateCard } from '../WeatherSkeleton'
import { useGeolocation } from '@/features/geolocation'
import { getAddressByNxNy } from '@/entities/weather/lib/address-utils'
import { getKmaWeatherIcon } from '@/entities/weather/lib/kma-weather-mapper'
import {
  useCurrentWeatherQuery,
  useHourlyForecastQuery,
} from '@/widgets/weather-cards/api/queries'

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
  const {
    grid,
    requestLocation,
    isLoading: isLocationLoading,
  } = useGeolocation()
  const queryClient = useQueryClient()

  const {
    data: currentData,
    isLoading: isCurrentLoading,
    isFetching: isCurrentFetching,
    isError: isCurrentError,
  } = useCurrentWeatherQuery()
  const {
    data: hourlyData,
    isLoading: isHourlyLoading,
    isFetching: isHourlyFetching,
    isError: isHourlyError,
  } = useHourlyForecastQuery()

  const handleRefreshLocation = async () => {
    // 위치 정보 재요청 (nx, ny 값 갱신)
    requestLocation()

    // 캐시 무효화로 백그라운드 재호출 유도
    await queryClient.invalidateQueries({ queryKey: ['currentWeather'] })
    await queryClient.invalidateQueries({ queryKey: ['hourlyForecast'] })
  }

  // Loading skeleton UI (초기 진입 로딩 시에만 표시)
  if (isCurrentLoading || isHourlyLoading) return <CurrentWeatherSkeleton />

  // Error UI
  if (isCurrentError || isHourlyError || !currentData || !hourlyData) {
    return <ErrorStateCard />
  }

  const currentDate = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date())

  const locationName = grid
    ? getAddressByNxNy(grid.nx, grid.ny) || '알 수 없는 위치'
    : '알 수 없는 위치'

  // 현재 시간과 가장 가까운 단기예보 데이터 찾기
  const nowHourStr = String(new Date().getHours()).padStart(2, '0') + '00'
  const currentHourlyFcst =
    hourlyData.hourlyData.find((d) => d.time === nowHourStr) ||
    hourlyData.hourlyData[0]

  const pty =
    currentData.rainType !== '0' && currentData.rainType !== '--'
      ? currentData.rainType
      : currentHourlyFcst?.pty || '0'
  const sky = currentHourlyFcst?.sky || '1'
  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18

  const { icon, description } = getKmaWeatherIcon(sky, pty, isDay)

  // 간단한 체감온도 계산 (여름/겨울 등 복잡한 체감온도 공식 대신 API 기온 사용)
  const feelsLike = currentData.temp

  return (
    <article className="w-full">
      <Card className="bg-card w-full overflow-hidden border-0 shadow-lg">
        <LocationHeader
          location={locationName}
          currentDate={currentDate}
          isBookmark={isBookmark}
          isFull={isFull}
          onToggleFavorite={onToggleFavorite}
          onRefreshLocation={handleRefreshLocation}
          isRefreshing={
            isLocationLoading || isCurrentFetching || isHourlyFetching
          }
        />
        <CardContent>
          <WeatherDisplay
            temp={`${currentData.temp}°`}
            description={description}
            tempMin={`${hourlyData.minTemp}°`}
            tempMax={`${hourlyData.maxTemp}°`}
            icon={icon}
          />
          <WeatherDetailStats
            feelsLike={`${feelsLike}°`}
            humidity={`${currentData.humidity}%`}
            windSpeed={`${currentData.windSpeed}m/s`}
          />
        </CardContent>
      </Card>
    </article>
  )
}
