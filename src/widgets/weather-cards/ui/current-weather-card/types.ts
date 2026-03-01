import type { WeatherData } from '@/entities/weather'

export interface CurrentWeatherCardProps {
  data?: WeatherData
  isBookmark?: boolean
  isFull?: boolean
  onToggleFavorite?: () => void
}

export interface LocationHeaderProps {
  location: string
  alias?: string
  currentDate: string
  isBookmark?: boolean
  isFull?: boolean
  onToggleFavorite?: () => void
  onRefreshLocation?: () => void
  isRefreshing?: boolean
}

export interface WeatherDisplayProps {
  temp: string
  description: string
  tempMin: string
  tempMax: string
  icon: string
}

export interface WeatherDetailStatsProps {
  feelsLike: string
  humidity: string
  windSpeed: string
}
