// WMO Weather interpretation codes
export const WMO_CODES: Record<number, { description: string; icon: string }> =
  {
    0: { description: '맑음', icon: 'sun' },
    1: { description: '대체로 맑음', icon: 'sun' },
    2: { description: '구름 조금', icon: 'cloud-sun' },
    3: { description: '흐림', icon: 'cloud' },
    45: { description: '안개', icon: 'cloud-fog' },
    48: { description: '짙은 안개', icon: 'cloud-fog' },
    51: { description: '약한 이슬비', icon: 'cloud-drizzle' },
    53: { description: '이슬비', icon: 'cloud-drizzle' },
    55: { description: '강한 이슬비', icon: 'cloud-drizzle' },
    56: { description: '약한 빗방울(결빙)', icon: 'cloud-drizzle' },
    57: { description: '빗방울(결빙)', icon: 'cloud-drizzle' },
    61: { description: '약한 비', icon: 'cloud-rain' },
    63: { description: '비', icon: 'cloud-rain' },
    65: { description: '강한 비', icon: 'cloud-rain' },
    66: { description: '약한 얼어붙는 비', icon: 'cloud-rain' },
    67: { description: '얼어붙는 비', icon: 'cloud-rain' },
    71: { description: '약한 눈', icon: 'cloud-snow' },
    73: { description: '눈', icon: 'cloud-snow' },
    75: { description: '강한 눈', icon: 'cloud-snow' },
    77: { description: '싸라기눈', icon: 'cloud-snow' },
    80: { description: '약한 소나기', icon: 'cloud-rain' },
    81: { description: '소나기', icon: 'cloud-rain' },
    82: { description: '강한 소나기', icon: 'cloud-rain' },
    85: { description: '약한 눈보라', icon: 'cloud-snow' },
    86: { description: '눈보라', icon: 'cloud-snow' },
    95: { description: '뇌우', icon: 'cloud-lightning' },
    96: { description: '우박 동반 뇌우', icon: 'cloud-lightning' },
    99: { description: '강한 우박 동반 뇌우', icon: 'cloud-lightning' },
  }

export function getWeatherInfo(code: number) {
  return WMO_CODES[code] || { description: '알 수 없음', icon: 'cloud' }
}
