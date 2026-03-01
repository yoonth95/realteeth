export function getUltraSrtNcstBaseTime(date: Date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  let hours = date.getHours()
  const minutes = date.getMinutes()

  // 초단기실황은 매시간 40분에 생성됨
  if (minutes < 40) {
    hours -= 1
  }

  // 자정 이전으로 넘어가면 전날로 계산해야 함
  if (hours < 0) {
    const prevDate = new Date(date)
    prevDate.setDate(prevDate.getDate() - 1)
    const pYear = prevDate.getFullYear()
    const pMonth = String(prevDate.getMonth() + 1).padStart(2, '0')
    const pDay = String(prevDate.getDate()).padStart(2, '0')
    return {
      baseDate: `${pYear}${pMonth}${pDay}`,
      baseTime: '2300',
    }
  }

  return {
    baseDate: `${year}${month}${day}`,
    baseTime: `${String(hours).padStart(2, '0')}00`,
  }
}

export function getVilageFcstBaseTime(date: Date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // 단기예보는 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10 에 제공됨
  const timeNum = hours * 100 + minutes

  let baseTime = '2300'
  let baseDateStr = `${year}${month}${day}`

  if (timeNum < 210) {
    // 02:10 이전이면 전날 23:00 발표 데이터 사용
    const prevDate = new Date(date)
    prevDate.setDate(prevDate.getDate() - 1)
    const pYear = prevDate.getFullYear()
    const pMonth = String(prevDate.getMonth() + 1).padStart(2, '0')
    const pDay = String(prevDate.getDate()).padStart(2, '0')
    baseDateStr = `${pYear}${pMonth}${pDay}`
    baseTime = '2300'
  } else if (timeNum < 510) {
    baseTime = '0200'
  } else if (timeNum < 810) {
    baseTime = '0500'
  } else if (timeNum < 1110) {
    baseTime = '0800'
  } else if (timeNum < 1410) {
    baseTime = '1100'
  } else if (timeNum < 1710) {
    baseTime = '1400'
  } else if (timeNum < 2010) {
    baseTime = '1700'
  } else if (timeNum < 2310) {
    baseTime = '2000'
  } else {
    baseTime = '2300'
  }

  return {
    baseDate: baseDateStr,
    baseTime,
  }
}

export function getMinMaxBaseTime(date: Date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // 02:10 을 기준으로 계산
  const timeNum = hours * 100 + minutes

  if (timeNum < 210) {
    // 02:10 이전에는 당일 02:00 데이터가 없으므로, 전날 23:00 발표 데이터를 사용
    const prevDate = new Date(date)
    prevDate.setDate(prevDate.getDate() - 1)
    const pYear = prevDate.getFullYear()
    const pMonth = String(prevDate.getMonth() + 1).padStart(2, '0')
    const pDay = String(prevDate.getDate()).padStart(2, '0')
    return {
      baseDate: `${pYear}${pMonth}${pDay}`,
      baseTime: '2300',
    }
  }

  // 02:10 이후에는 당일 02:00 발표 데이터를 사용하면 당일 최저/최고 기온을 정확히 얻음
  return {
    baseDate: `${year}${month}${day}`,
    baseTime: '0200',
  }
}
