import { useQuery } from '@tanstack/react-query'
import {
  getUltraSrtNcst,
  getVilageFcst,
} from '@/entities/weather/api/weather-api'
import { useLocationStore } from '@/entities/location/model/store'

export function useCurrentWeatherQuery() {
  const { grid } = useLocationStore()

  return useQuery({
    queryKey: ['currentWeather', grid?.nx, grid?.ny],
    queryFn: () => getUltraSrtNcst(grid!.nx, grid!.ny),
    enabled: !!grid,
    staleTime: 1000 * 60 * 10, // 10분 캐시
  })
}

export function useHourlyForecastQuery() {
  const { grid } = useLocationStore()

  return useQuery({
    queryKey: ['hourlyForecast', grid?.nx, grid?.ny],
    queryFn: () => getVilageFcst(grid!.nx, grid!.ny),
    enabled: !!grid,
    staleTime: 1000 * 60 * 60, // 1시간 캐시
  })
}
