import {
  ultraSrtNcstResponseSchema,
  vilageFcstResponseSchema,
  type UltraSrtNcstItem,
  type VilageFcstItem,
} from './zod-schemas'
import {
  getUltraSrtNcstBaseTime,
  getVilageFcstBaseTime,
  getMinMaxBaseTime,
} from '../lib/kma-time-utils'

const API_KEY = import.meta.env.VITE_KMA_API_KEY
if (!API_KEY) {
  console.warn('VITE_KMA_API_KEY is not defined in environment variables')
}

// 1. 초단기실황 (현재 날씨 - 기온, 습도, 풍속 등)
export async function getUltraSrtNcst(nx: number, ny: number) {
  const { baseDate, baseTime } = getUltraSrtNcstBaseTime()
  const url = new URL(
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst',
  )
  url.searchParams.append('ServiceKey', API_KEY)
  url.searchParams.append('pageNo', '1')
  url.searchParams.append('numOfRows', '1000')
  url.searchParams.append('dataType', 'JSON')
  url.searchParams.append('base_date', baseDate)
  url.searchParams.append('base_time', baseTime)
  url.searchParams.append('nx', nx.toString())
  url.searchParams.append('ny', ny.toString())

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`Failed to fetch UltraSrtNcst: ${response.status}`)
  }

  const json = await response.json()
  const parsed = ultraSrtNcstResponseSchema.parse(json)

  if (parsed.response.header.resultCode !== '00') {
    throw new Error(`API Error: ${parsed.response.header.resultMsg}`)
  }

  const items = parsed.response.body?.items.item || []

  // 필요한 데이터 추출
  const result = {
    temp: extractItemValue(items, 'T1H'), // 기온
    windSpeed: extractItemValue(items, 'WSD'), // 풍속
    humidity: extractItemValue(items, 'REH'), // 습도
    rainType: extractItemValue(items, 'PTY'), // 강수형태
  }

  return result
}

// 2. 단기예보 (최고/최저 기온, 시간대별 예보)
export async function getVilageFcst(nx: number, ny: number) {
  const { baseDate: currentBaseDate, baseTime: currentBaseTime } =
    getVilageFcstBaseTime()
  const { baseDate: minMaxBaseDate, baseTime: minMaxBaseTime } =
    getMinMaxBaseTime()

  const fetchFcst = async (
    bDate: string,
    bTime: string,
    numOfRows: string = '1000',
  ) => {
    const url = new URL(
      'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
    )
    url.searchParams.append('ServiceKey', API_KEY)
    url.searchParams.append('pageNo', '1')
    url.searchParams.append('numOfRows', numOfRows)
    url.searchParams.append('dataType', 'JSON')
    url.searchParams.append('base_date', bDate)
    url.searchParams.append('base_time', bTime)
    url.searchParams.append('nx', nx.toString())
    url.searchParams.append('ny', ny.toString())

    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error(`Failed to fetch VilageFcst: ${response.status}`)
    }

    const json = await response.json()
    const parsed = vilageFcstResponseSchema.parse(json)

    if (parsed.response.header.resultCode !== '00') {
      throw new Error(`API Error: ${parsed.response.header.resultMsg}`)
    }

    return parsed.response.body?.items.item || []
  }

  // 최신 예보와 최고/최저 기온 예보가 같은 시간대면 한 번만 호출, 다르면 병렬 호출
  const isSameBase =
    currentBaseDate === minMaxBaseDate && currentBaseTime === minMaxBaseTime

  const [items, minMaxItems] = await Promise.all([
    fetchFcst(currentBaseDate, currentBaseTime, '1000'),
    isSameBase
      ? Promise.resolve([])
      : fetchFcst(minMaxBaseDate, minMaxBaseTime, '300'),
  ])

  const targetMinMaxItems = isSameBase ? items : minMaxItems

  // 오늘 날짜 찾기
  const today = new Date()
  const tYear = today.getFullYear()
  const tMonth = String(today.getMonth() + 1).padStart(2, '0')
  const tDay = String(today.getDate()).padStart(2, '0')
  const todayStr = `${tYear}${tMonth}${tDay}`

  // 일 최저/최고 기온 (TMN, TMX)
  const minTempItem = targetMinMaxItems.find(
    (i) => i.category === 'TMN' && i.fcstDate === todayStr,
  )
  const maxTempItem = targetMinMaxItems.find(
    (i) => i.category === 'TMX' && i.fcstDate === todayStr,
  )

  const minTemp = minTempItem ? minTempItem.fcstValue : '--'
  const maxTemp = maxTempItem ? maxTempItem.fcstValue : '--'

  // 시간대별 예보 만들기
  const hourlyData = processHourlyForecast(items)

  return {
    minTemp,
    maxTemp,
    hourlyData,
  }
}

// 헬퍼 함수
function extractItemValue(items: UltraSrtNcstItem[], category: string) {
  const item = items.find((i) => i.category === category)
  return item ? item.obsrValue : '--'
}

interface HourlyForecastData {
  date: string
  time: string
  temp: string
  pop: number
  sky: string
  pty: string
}

function processHourlyForecast(items: VilageFcstItem[]) {
  // 현재 시간 구하기
  const now = new Date()

  // 시간에 따라 맵핑
  const hourlyMap = new Map<string, HourlyForecastData>()

  for (const item of items) {
    const key = `${item.fcstDate}${item.fcstTime}`
    if (!hourlyMap.has(key)) {
      hourlyMap.set(key, {
        date: item.fcstDate,
        time: item.fcstTime,
        temp: '--',
        pop: 0, // 강수확률
        sky: '1', // 맑음 기본
        pty: '0', // 강수형태
      })
    }
    const data = hourlyMap.get(key)!
    switch (item.category) {
      case 'TMP':
        data.temp = item.fcstValue
        break
      case 'POP':
        data.pop = parseInt(item.fcstValue, 10)
        break
      case 'SKY':
        data.sky = item.fcstValue
        break
      case 'PTY':
        data.pty = item.fcstValue
        break
    }
    hourlyMap.set(key, data)
  }

  // 앞서 정의한 시간순으로 정렬
  const sortedKeys = Array.from(hourlyMap.keys()).sort()

  // 현재 시간 이후 25개 추출 (24시간)
  const targetYear = now.getFullYear()
  const targetMonth = String(now.getMonth() + 1).padStart(2, '0')
  const targetDay = String(now.getDate()).padStart(2, '0')
  const targetHour = String(now.getHours()).padStart(2, '0') + '00'
  const targetDateStr = `${targetYear}${targetMonth}${targetDay}`

  const startIndex = sortedKeys.findIndex(
    (key) => key >= `${targetDateStr}${targetHour}`,
  )
  const resultKeys =
    startIndex !== -1
      ? sortedKeys.slice(startIndex, startIndex + 25)
      : sortedKeys.slice(0, 25)

  return resultKeys.map((k) => hourlyMap.get(k) as HourlyForecastData)
}
