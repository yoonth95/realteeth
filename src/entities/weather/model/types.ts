// 공통 타입
export interface Coordinates {
  lat: number
  lon: number
}

export interface WeatherCondition {
  description: string
  icon: string
  weatherCode: number
}

export interface DailyTemperature {
  temp_min: number
  temp_max: number
}

export interface LocationInfo extends Coordinates {
  name: string
  country: string
  state?: string
}

// 날씨 데이터
export interface WeatherData extends Coordinates {
  location: string
  country: string
  current: WeatherCondition & {
    temp: number
    feels_like: number
    humidity: number
    wind_speed: number
  }
  today: DailyTemperature
  hourly: HourlyForecast[]
}

export interface HourlyForecast extends WeatherCondition {
  time: string
  hour: number
  temp: number
}

// 위치 데이터
export interface GeoLocation extends LocationInfo {
  admin1?: string
  country_code?: string
}

export interface BookmarkLocation extends LocationInfo {
  id: string
  nickname: string
  current: WeatherCondition & {
    temp: number
  }
  today: DailyTemperature
}
