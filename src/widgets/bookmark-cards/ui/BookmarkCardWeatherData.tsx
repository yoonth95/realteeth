import type { BookmarkLocation } from '@/entities/weather'
import { WeatherIcon } from '@/entities/weather'

interface Props {
  bookmark: BookmarkLocation
}
export function BookmarkCardWeatherData({ bookmark }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-foreground text-2xl font-bold">
          {bookmark.current.temp}°
        </span>
        <span className="text-muted-foreground text-xs">
          최저 <b className="text-highlight-blue">{bookmark.today.temp_min}°</b>{' '}
          / 최고{' '}
          <b className="text-highlight-red">{bookmark.today.temp_max}°</b>
        </span>
        <span className="text-muted-foreground mt-0.5 text-xs">
          {bookmark.current.description}
        </span>
      </div>
      <div className="bg-secondary/70 flex h-10 w-10 items-center justify-center rounded-xl">
        <WeatherIcon
          icon={bookmark.current.icon}
          className="text-primary h-6 w-6"
        />
      </div>
    </div>
  )
}
