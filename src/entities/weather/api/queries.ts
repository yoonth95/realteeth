import { useQuery } from '@tanstack/react-query'
import { getUltraSrtNcst, getVilageFcst } from './weather-api'

export const weatherQueryKeys = {
  current: (nx?: number, ny?: number) => ['currentWeather', nx, ny] as const,
  hourly: (nx?: number, ny?: number) => ['hourlyForecast', nx, ny] as const,
}

// 기본 위치 및 단일 날씨 조회를 위한 훅 (메인 카드용)
export function useWeatherQueries(nx?: number, ny?: number) {
  const enabled = nx !== undefined && ny !== undefined

  const currentQuery = useQuery({
    queryKey: weatherQueryKeys.current(nx, ny),
    queryFn: () => getUltraSrtNcst(nx!, ny!),
    enabled,
    staleTime: 1000 * 60 * 10, // 10분 캐시
  })

  const forecastQuery = useQuery({
    queryKey: weatherQueryKeys.hourly(nx, ny),
    queryFn: () => getVilageFcst(nx!, ny!),
    enabled,
    staleTime: 1000 * 60 * 60, // 1시간 캐시
  })

  return { currentQuery, forecastQuery }
}

// 편의를 위한 통합 날씨 조회 훅 (즐겨찾기 카드 등)
export function useCombinedWeatherQuery(nx: number, ny: number) {
  const { currentQuery, forecastQuery } = useWeatherQueries(nx, ny)

  return {
    data:
      currentQuery.data && forecastQuery.data
        ? {
            current: currentQuery.data,
            forecast: forecastQuery.data,
          }
        : undefined,
    isLoading: currentQuery.isLoading || forecastQuery.isLoading,
    isError: currentQuery.isError || forecastQuery.isError,
  }
}
