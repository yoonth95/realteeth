import { useRef } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { useIsMobile } from '@/shared/hooks/use-is-mobile'

import { weatherData } from './constants'
import { HourlyChart } from './HourlyChart'
import { ScrollNavButtons } from './ScrollNavButtons'

export function HourlyForecastCard() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const startSentinelRef = useRef<HTMLDivElement>(null)
  const endSentinelRef = useRef<HTMLDivElement>(null)

  const { isMobile } = useIsMobile()
  const chartMinWidth = weatherData.length * 55

  return (
    <article>
      <Card className="bg-card overflow-hidden border-0 shadow-lg">
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
            <HourlyChart chartMinWidth={chartMinWidth} />
            <div ref={endSentinelRef} className="w-px shrink-0" />
          </div>
        </CardContent>
      </Card>
    </article>
  )
}
