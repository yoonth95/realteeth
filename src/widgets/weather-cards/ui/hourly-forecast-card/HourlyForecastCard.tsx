import { useRef } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { useIsMobile } from '@/shared/hooks/use-is-mobile'

import { getKmaWeatherIcon } from '@/entities/weather/lib/kma-weather-mapper'
import { HourlyChart, type HourlyChartDataItem } from './HourlyChart'
import { ScrollNavButtons } from './ScrollNavButtons'
import { useWeatherQueries } from '@/entities/weather'
import { useLocationStore } from '@/entities/location/model/store'
import { HourlyWeatherSkeleton, ErrorStateCard } from '../WeatherSkeleton'
import type { Bookmark } from '@/entities/bookmark'

export function HourlyForecastCard({ bookmark }: { bookmark?: Bookmark }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const startSentinelRef = useRef<HTMLDivElement>(null)
  const endSentinelRef = useRef<HTMLDivElement>(null)

  const { isMobile } = useIsMobile()
  const { grid: locationGrid } = useLocationStore()
  const grid = bookmark ? { nx: bookmark.nx, ny: bookmark.ny } : locationGrid
  const { forecastQuery } = useWeatherQueries(grid?.nx, grid?.ny)
  const { data, isLoading, isError } = forecastQuery

  if (isLoading) return <HourlyWeatherSkeleton />
  if (isError || !data) return <ErrorStateCard />

  // Map API hourly data to Chart data source
  const chartData: HourlyChartDataItem[] = data.hourlyData.map((d) => {
    // d.time: "1500"
    const hour = parseInt(d.time.substring(0, 2), 10)
    const ampm = hour < 12 ? '오전' : '오후'
    const displayHour = hour % 12 === 0 ? 12 : hour % 12
    const timeStr = `${ampm} ${displayHour}시`

    const isDay = hour >= 6 && hour < 18
    const { description } = getKmaWeatherIcon(d.sky, d.pty, isDay)

    let condition = 'cloud'
    if (description.includes('비') || description.includes('눈')) {
      condition = 'rain'
    } else if (description.includes('맑음')) {
      condition = isDay ? 'sun' : 'moon'
    } else {
      condition = 'cloud'
    }

    return {
      time: timeStr,
      temp: parseInt(d.temp, 10),
      pop: d.pop,
      isDay,
      condition,
    }
  })

  const chartMinWidth = chartData.length * 55

  return (
    <article className="w-full">
      <Card className="bg-card mt-6 w-full overflow-hidden border-0 shadow-lg lg:mt-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">시간대별 날씨</CardTitle>
          <CardDescription className="text-muted-foreground">
            오늘의 기온 및 강수 확률
          </CardDescription>
        </CardHeader>

        <CardContent className="relative px-0 pb-4">
          <ScrollNavButtons
            scrollRef={scrollRef}
            startSentinelRef={startSentinelRef}
            endSentinelRef={endSentinelRef}
            isMobile={isMobile}
          />

          <div
            ref={scrollRef}
            className="flex w-full overflow-x-auto overflow-y-hidden scroll-smooth px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div ref={startSentinelRef} className="w-px shrink-0" />
            <HourlyChart chartMinWidth={chartMinWidth} data={chartData} />
            <div ref={endSentinelRef} className="w-px shrink-0" />
          </div>
        </CardContent>
      </Card>
    </article>
  )
}
