import districtsData from '@/shared/assets/data/korea_districts.json'

interface District {
  address: string
  nx: number
  ny: number
}

const districts = districtsData as District[]

/**
 * nx, ny 좌표를 기반으로 가장 짧은(포괄적인) 주소를 반환
 * 매칭되는 주소가 없으면 null을 반환
 */
export function getAddressByNxNy(nx: number, ny: number): string | null {
  const matches = districts.filter((d) => d.nx === nx && d.ny === ny)

  if (matches.length === 0) return null

  // 가장 짧은 길이의 주소를 우선순위로 둠 (예: 은평구 vs 은평구 불광동 -> 은평구)
  matches.sort((a, b) => a.address.length - b.address.length)

  return matches[0].address
}
