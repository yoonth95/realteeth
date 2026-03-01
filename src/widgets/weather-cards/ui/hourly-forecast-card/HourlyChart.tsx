import { memo } from 'react'
import { Line, LineChart, XAxis, YAxis } from 'recharts'

import { ChartContainer } from '@/shared/ui/chart'

import { chartConfig } from './constants'
import { ChartTopTick, ChartBottomTick, ChartDot } from './chart-renderers'
import type { ChartTickProps } from './types'

export interface HourlyChartDataItem {
  time: string
  temp: number
  pop: number
  isDay: boolean
  condition: string
}

interface HourlyChartProps {
  chartMinWidth: number
  data: HourlyChartDataItem[]
}

export const HourlyChart = memo(function HourlyChart({
  chartMinWidth,
  data,
}: HourlyChartProps) {
  return (
    <div style={{ minWidth: `${chartMinWidth}px` }} className="h-[200px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart
          data={data}
          margin={{ top: 50, left: 20, right: 20, bottom: 25 }}
        >
          <defs>
            <linearGradient id="lineColorGradient" x1="0" y1="0" x2="1" y2="0">
              {data.map((d, index) => {
                const offset = `${(index / (data.length - 1)) * 100}%`
                const stopColor = d.isDay
                  ? 'var(--color-weather-sun)'
                  : 'var(--color-weather-rain)'
                return (
                  <stop key={index} offset={offset} stopColor={stopColor} />
                )
              })}
            </linearGradient>
          </defs>
          <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
          <XAxis
            dataKey="time"
            orientation="top"
            tick={(props: unknown) => (
              <ChartTopTick {...(props as ChartTickProps)} data={data} />
            )}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <XAxis
            xAxisId="bottom"
            dataKey="time"
            orientation="bottom"
            tick={(props: unknown) => (
              <ChartBottomTick {...(props as ChartTickProps)} data={data} />
            )}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="url(#lineColorGradient)"
            strokeWidth={3}
            dot={<ChartDot />}
            isAnimationActive={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
})
