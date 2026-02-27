import { Cloud, CloudRain, Sun, Moon } from 'lucide-react'

import type { ChartTickProps, ChartDotProps } from './types'
import { weatherData } from './constants'

// 시간, 아이콘, 온도 표시
export const ChartTopTick = ({ x = 0, y = 0, payload }: ChartTickProps) => {
  if (!payload) return null

  const data = weatherData[payload.index]
  const renderIcon = () => {
    switch (data.condition) {
      case 'sun':
        return <Sun size={18} color="#eab308" />
      case 'moon':
        return <Moon size={18} color="#94a3b8" />
      case 'rain':
        return <CloudRain size={18} color="#3b82f6" />
      default:
        return <Cloud size={18} color="#cbd5e1" />
    }
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={-55}
        textAnchor="middle"
        fill="var(--color-foreground)"
        fontSize={11}
        className="font-medium"
      >
        {data.time}
      </text>
      <foreignObject x={-9} y={-45} width={18} height={18}>
        {renderIcon()}
      </foreignObject>
      <text
        x={0}
        y={-8}
        textAnchor="middle"
        fill="var(--color-foreground)"
        fontSize={14}
        fontWeight="bold"
      >
        {data.temp}°
      </text>
    </g>
  )
}

// 강수확률 표시
export const ChartBottomTick = ({ x = 0, y = 0, payload }: ChartTickProps) => {
  if (!payload) return null

  const data = weatherData[payload.index]
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={15}
        textAnchor="middle"
        fill="var(--color-muted-foreground)"
        fontSize={11}
      >
        💧 {data.pop}%
      </text>
    </g>
  )
}

// 온도 그래프 점 표시
export const ChartDot = ({ cx, cy, payload }: ChartDotProps) => {
  if (!payload) return null

  const dotColor = payload.isDay ? '#eab308' : '#3b82f6'
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill={dotColor}
      stroke="var(--color-card)"
      strokeWidth={2}
    />
  )
}
