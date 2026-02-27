import { memo } from 'react'
import { Line, LineChart, XAxis, YAxis } from 'recharts'

import { ChartContainer } from '@/shared/ui/chart'

import { weatherData, chartConfig } from './constants'
import { ChartTopTick, ChartBottomTick, ChartDot } from './chart-renderers'

interface HourlyChartProps {
  chartMinWidth: number
}

export const HourlyChart = memo(function HourlyChart({
  chartMinWidth,
}: HourlyChartProps) {
  return (
    <div style={{ minWidth: `${chartMinWidth}px` }} className="h-[200px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart
          data={weatherData}
          margin={{ top: 50, left: 20, right: 20, bottom: 25 }}
        >
          <defs>
            <linearGradient id="lineColorGradient" x1="0" y1="0" x2="1" y2="0">
              {weatherData.map((d, index) => {
                const offset = `${(index / (weatherData.length - 1)) * 100}%`
                const stopColor = d.isDay ? '#eab308' : '#3b82f6'
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
            tick={<ChartTopTick />}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <XAxis
            xAxisId="bottom"
            dataKey="time"
            orientation="bottom"
            tick={<ChartBottomTick />}
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
