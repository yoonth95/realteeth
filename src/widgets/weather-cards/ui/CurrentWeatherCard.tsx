import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { WeatherIcon } from '@/entities/weather'
import type { WeatherData } from '@/entities/weather'
import {
  Crosshair,
  Star,
  StarOff,
  Droplets,
  Wind,
  Thermometer,
} from 'lucide-react'

interface CurrentWeatherCardProps {
  data?: WeatherData
  isBookmark?: boolean
  isFull?: boolean
  onToggleFavorite?: () => void
}

export function CurrentWeatherCard({
  // data,
  isBookmark,
  isFull,
  onToggleFavorite,
}: CurrentWeatherCardProps) {
  const currentDate = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date())

  return (
    <Card className="bg-card overflow-hidden border-0 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <span className="font-bold">
                {/* {data.location}
                {data.country ? `, ${data.country}` : ''} */}
                인천광역시
              </span>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Crosshair className="h-3.5 w-3.5" />
              </Button>
            </div>
            <span className="text-muted-foreground text-xs font-medium">
              {currentDate}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleFavorite}
            disabled={!isBookmark && isFull}
            aria-label={isBookmark ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          >
            {isBookmark ? (
              <Star className="fill-primary text-primary h-4 w-4" />
            ) : (
              <StarOff className="text-muted-foreground h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-foreground text-6xl font-bold tracking-tighter">
              {/* {data.current.temp} */}25°
            </span>
            <span className="text-muted-foreground mt-1 text-sm font-semibold">
              {/* {data.current.description} */}대체로 맑음
            </span>
            <span className="text-muted-foreground mt-0.5 text-xs">
              {/* 최저 {data.today.temp_min}° / 최고 {data.today.temp_max}° */}
              최저 <b className="text-blue-600">20°</b> / 최고{' '}
              <b className="text-red-600">30°</b>
            </span>
          </div>
          <div className="bg-secondary/50 flex h-20 w-20 items-center justify-center rounded-2xl">
            <WeatherIcon
              icon="sun"
              // icon={data.current.icon}
              className="text-primary h-12 w-12"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-secondary/50 flex flex-col items-center gap-1 rounded-xl p-3">
            <div className="text-muted-foreground flex items-center gap-1">
              <Thermometer className="h-3.5 w-3.5" />
              <span className="text-xs">체감</span>
            </div>
            <span className="text-foreground text-sm font-semibold">
              {/* {data.current.feels_like}°C */}
            </span>
          </div>
          <div className="bg-secondary/50 flex flex-col items-center gap-1 rounded-xl p-3">
            <div className="text-muted-foreground flex items-center gap-1">
              <Droplets className="h-3.5 w-3.5" />
              <span className="text-xs">습도</span>
            </div>
            <span className="text-foreground text-sm font-semibold">
              {/* {data.current.humidity}% */}
            </span>
          </div>
          <div className="bg-secondary/50 flex flex-col items-center gap-1 rounded-xl p-3">
            <div className="text-muted-foreground flex items-center gap-1">
              <Wind className="h-3.5 w-3.5" />
              <span className="text-xs">바람</span>
            </div>
            <span className="text-foreground text-sm font-semibold">
              {/* {data.current.wind_speed}km/h */}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentWeatherCard
