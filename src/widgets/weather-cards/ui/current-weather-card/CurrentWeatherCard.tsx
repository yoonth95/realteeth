import { Card, CardContent } from '@/shared/ui/card'
import { useQueryClient } from '@tanstack/react-query'
import { CurrentWeatherSkeleton, ErrorStateCard } from '../WeatherSkeleton'
import { useGeolocation } from '@/features/geolocation'
import { getAddressByNxNy } from '@/entities/weather/lib/address-utils'
import { getKmaWeatherIcon } from '@/entities/weather/lib/kma-weather-mapper'
import { useWeatherQueries, weatherQueryKeys } from '@/entities/weather'

import { LocationHeader } from './LocationHeader'
import { WeatherDisplay } from './WeatherDisplay'
import { WeatherDetailStats } from './WeatherDetailStats'
import { useBookmarkStore, type Bookmark } from '@/entities/bookmark'

export function CurrentWeatherCard({ bookmark }: { bookmark?: Bookmark }) {
  const {
    grid: locationGrid,
    requestLocation,
    isLoading: isLocationLoading,
  } = useGeolocation()
  const queryClient = useQueryClient()

  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore()

  const grid = bookmark ? { nx: bookmark.nx, ny: bookmark.ny } : locationGrid

  const { currentQuery, forecastQuery } = useWeatherQueries(grid?.nx, grid?.ny)

  const {
    data: currentData,
    isLoading: isCurrentLoading,
    isFetching: isCurrentFetching,
    isError: isCurrentError,
  } = currentQuery

  const {
    data: hourlyData,
    isLoading: isHourlyLoading,
    isFetching: isHourlyFetching,
    isError: isHourlyError,
  } = forecastQuery

  const handleRefreshLocation = async () => {
    if (bookmark) return
    // 위치 정보 재요청 (nx, ny 값 갱신)
    requestLocation()

    // 캐시 무효화로 백그라운드 재호출 유도
    if (grid) {
      await queryClient.invalidateQueries({
        queryKey: weatherQueryKeys.current(grid.nx, grid.ny),
      })
      await queryClient.invalidateQueries({
        queryKey: weatherQueryKeys.hourly(grid.nx, grid.ny),
      })
    }
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

  const locationName = bookmark
    ? bookmark.name
    : grid
      ? getAddressByNxNy(grid.nx, grid.ny) || '알 수 없는 위치'
      : '알 수 없는 위치'

  const aliasName = bookmark ? bookmark.nickname : undefined

  // 현재 위치에 대한 즐겨찾기 여부 확인
  const bookmarkId = grid ? `${grid.nx}-${grid.ny}` : ''
  const isBookmarked = bookmarks.some((b) => b.id === bookmarkId)
  const isBookmarkFull = bookmarks.length >= 6

  const handleToggleFavorite = () => {
    if (!grid) return

    if (isBookmarked) {
      removeBookmark(bookmarkId)
    } else {
      if (bookmarks.length >= 6) return
      addBookmark({
        id: bookmarkId,
        name: locationName,
        nickname: locationName,
        nx: grid.nx,
        ny: grid.ny,
      })
    }
  }

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
          alias={aliasName}
          currentDate={currentDate}
          isBookmark={isBookmarked}
          isFull={isBookmarkFull}
          onToggleFavorite={handleToggleFavorite}
          onRefreshLocation={bookmark ? undefined : handleRefreshLocation}
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
