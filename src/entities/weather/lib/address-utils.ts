import districtsData from '@/shared/assets/data/korea_districts.json'

interface District {
  address: string
  nx: number
  ny: number
}

const districts = districtsData as District[]

/**
 * nx, ny 좌표를 기반으로 가장 짧은(포괄적인) 주소를 반환
 * 매칭되는 주소가 없으면 가장 가까운 거리에 있는 주소를 반환
 */
export function getAddressByNxNy(nx: number, ny: number): string | null {
  const matches = districts.filter((d) => d.nx === nx && d.ny === ny)

  if (matches.length > 0) {
    // 가장 짧은 길이의 주소를 우선순위로 둠 (예: 은평구 vs 은평구 불광동 -> 은평구)
    matches.sort((a, b) => a.address.length - b.address.length)
    return matches[0].address
  }

  // 정확히 일치하는 좌표가 없는 경우, 가장 가까운 위치(유클리드 거리 기준)를 찾음
  let nearestDistrict = districts[0]
  let minDistanceSq = Infinity

  for (const d of districts) {
    const distSq = (d.nx - nx) ** 2 + (d.ny - ny) ** 2
    if (distSq < minDistanceSq) {
      minDistanceSq = distSq
      nearestDistrict = d
    }
  }

  if (!nearestDistrict) return null

  // 가장 가까운 거리를 가진 모든 지역을 찾아서 주소 길이가 짧은 것을 선택
  const nearestMatches = districts.filter(
    (d) => (d.nx - nx) ** 2 + (d.ny - ny) ** 2 === minDistanceSq,
  )
  nearestMatches.sort((a, b) => a.address.length - b.address.length)

  return nearestMatches.length > 0 ? nearestMatches[0].address : null
}
