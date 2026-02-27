export interface Location {
  id: string
  name: string
  country: string
  admin1?: string
  latitude: number
  longitude: number
}

export interface CurrentWeather {
  temperature: number
  weatherCode: number
  isDay: boolean
  minTemp: number
  maxTemp: number
}

export interface HourlyWeather {
  time: string
  temperature: number
  weatherCode: number
}

export interface MockWeatherData {
  current: CurrentWeather
  hourly: HourlyWeather[]
}

// Simulated search results
export const MOCK_SEARCH_RESULTS: Location[] = [
  {
    id: '1',
    name: 'Seoul',
    country: 'South Korea',
    admin1: 'Seoul',
    latitude: 37.566,
    longitude: 126.9784,
  },
  {
    id: '2',
    name: 'Busan',
    country: 'South Korea',
    admin1: 'Busan',
    latitude: 35.1028,
    longitude: 129.0403,
  },
  {
    id: '3',
    name: 'Jeju City',
    country: 'South Korea',
    admin1: 'Jeju-do',
    latitude: 33.5097,
    longitude: 126.5219,
  },
  {
    id: '4',
    name: 'Incheon',
    country: 'South Korea',
    admin1: 'Incheon',
    latitude: 37.4563,
    longitude: 126.7052,
  },
  {
    id: '5',
    name: 'Daegu',
    country: 'South Korea',
    admin1: 'Daegu',
    latitude: 35.8714,
    longitude: 128.6014,
  },
  {
    id: '6',
    name: 'Seongnam-si',
    country: 'South Korea',
    admin1: 'Gyeonggi-do',
    latitude: 37.4386,
    longitude: 127.1378,
  },
  {
    id: '7',
    name: 'Suwon-si',
    country: 'South Korea',
    admin1: 'Gyeonggi-do',
    latitude: 37.2636,
    longitude: 127.0286,
  },
  {
    id: '8',
    name: 'Goyang-si',
    country: 'South Korea',
    admin1: 'Gyeonggi-do',
    latitude: 37.6584,
    longitude: 126.832,
  },
  {
    id: '9',
    name: 'Daejeon',
    country: 'South Korea',
    admin1: 'Daejeon',
    latitude: 36.3214,
    longitude: 127.4197,
  },
  {
    id: '10',
    name: 'Gwangju',
    country: 'South Korea',
    admin1: 'Gwangju',
    latitude: 35.1595,
    longitude: 126.8526,
  },
]

export interface Bookmark extends Location {
  alias?: string
}

// Simulated User Bookmarks (max 6)
export const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: '1',
    name: 'Seoul',
    country: 'South Korea',
    admin1: 'Seoul',
    latitude: 37.566,
    longitude: 126.9784,
    alias: 'My Home',
  },
  {
    id: '3',
    name: 'Jeju City',
    country: 'South Korea',
    admin1: 'Jeju-do',
    latitude: 33.5097,
    longitude: 126.5219,
    alias: 'Vacation Spot',
  },
  {
    id: '2',
    name: 'Busan',
    country: 'South Korea',
    admin1: 'Busan',
    latitude: 35.1028,
    longitude: 129.0403,
  },
  {
    id: '4',
    name: 'Incheon',
    country: 'South Korea',
    admin1: 'Incheon',
    latitude: 37.4563,
    longitude: 126.7052,
  },
]

// Helper to generate mock hourly data representing a typical day
const generateMockHourly = (): HourlyWeather[] => {
  const hours = []
  const now = new Date()
  for (let i = 0; i < 24; i++) {
    const time = new Date(now)
    time.setHours(now.getHours() + i)
    const baseTemp = 20
    const tempVar = Math.sin(((time.getHours() - 6) * Math.PI) / 12) * 8
    hours.push({
      time: time.toISOString(),
      temperature: Math.round(baseTemp + tempVar),
      weatherCode: Math.random() > 0.8 ? 3 : 0,
    })
  }
  return hours
}

// Simulated weather data mapping for specific locations
export const MOCK_WEATHER_DATA: Record<string, MockWeatherData> = {
  '1': {
    current: {
      temperature: 22,
      weatherCode: 0,
      isDay: true,
      minTemp: 16,
      maxTemp: 26,
    },
    hourly: generateMockHourly(),
  },
  '2': {
    current: {
      temperature: 25,
      weatherCode: 1,
      isDay: true,
      minTemp: 18,
      maxTemp: 27,
    },
    hourly: generateMockHourly(),
  },
  '3': {
    current: {
      temperature: 28,
      weatherCode: 2,
      isDay: true,
      minTemp: 22,
      maxTemp: 30,
    },
    hourly: generateMockHourly(),
  },
  '4': {
    current: {
      temperature: 21,
      weatherCode: 0,
      isDay: true,
      minTemp: 15,
      maxTemp: 25,
    },
    hourly: generateMockHourly(),
  },
  default: {
    current: {
      temperature: 18,
      weatherCode: 3,
      isDay: false,
      minTemp: 12,
      maxTemp: 20,
    },
    hourly: generateMockHourly(),
  },
}

export const getMockWeatherForLocation = (id: string): MockWeatherData => {
  return MOCK_WEATHER_DATA[id] || MOCK_WEATHER_DATA['default']
}
