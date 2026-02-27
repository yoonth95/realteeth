import type { ChartConfig } from '@/shared/ui/chart'
import type { WeatherDataItem } from './types'

export const weatherData: WeatherDataItem[] = [
  { time: '오후 4시', temp: 11, pop: 0, isDay: true, condition: 'cloud' },
  { time: '오후 5시', temp: 11, pop: 0, isDay: true, condition: 'moon' },
  { time: '오후 6시', temp: 10, pop: 0, isDay: true, condition: 'moon' },
  { time: '오후 7시', temp: 9, pop: 10, isDay: false, condition: 'sun' },
  { time: '오후 8시', temp: 9, pop: 20, isDay: false, condition: 'sun' },
  { time: '오후 9시', temp: 8, pop: 60, isDay: false, condition: 'rain' },
  { time: '오후 10시', temp: 7, pop: 60, isDay: false, condition: 'rain' },
  { time: '오후 11시', temp: 6, pop: 60, isDay: false, condition: 'rain' },
  { time: '오전 0시', temp: 5, pop: 60, isDay: false, condition: 'rain' },
  { time: '오전 1시', temp: 5, pop: 60, isDay: false, condition: 'rain' },
  { time: '오전 2시', temp: 4, pop: 60, isDay: false, condition: 'rain' },
  { time: '오전 3시', temp: 3, pop: 60, isDay: false, condition: 'rain' },
  { time: '오전 4시', temp: 2, pop: 60, isDay: false, condition: 'rain' },
  { time: '오전 5시', temp: 1, pop: 60, isDay: false, condition: 'rain' },
]

export const chartConfig = {
  temp: {
    label: 'Temperature',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig
