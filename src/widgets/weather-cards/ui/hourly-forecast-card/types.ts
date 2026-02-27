export interface WeatherDataItem {
  time: string
  temp: number
  pop: number
  isDay: boolean
  condition: 'sun' | 'moon' | 'rain' | 'cloud'
}

export interface ChartTickProps {
  x?: number
  y?: number
  payload?: {
    value: string
    index: number
  }
}

export interface ChartDotProps {
  cx?: number
  cy?: number
  payload?: WeatherDataItem
}
