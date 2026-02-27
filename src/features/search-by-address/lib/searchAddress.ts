import { disassemble } from 'es-hangul'

export interface HighlightSegment {
  text: string
  highlighted: boolean
}

/**
 * korea_districts 배열에서 검색어에 매칭되는 주소를 최대 maxResults개 반환
 * disassemble을 사용해 자모 단위로 매칭하여 초성/불완전 음절도 지원
 */
export function searchDistricts(
  query: string,
  districts: string[],
  maxResults: number = 10,
): string[] {
  const trimmed = query.trim()
  if (!trimmed) return []

  const disassembledQuery = disassemble(trimmed)
  const results: string[] = []

  for (const district of districts) {
    if (results.length >= maxResults) break

    const disassembledDistrict = disassemble(district)
    if (disassembledDistrict.includes(disassembledQuery)) {
      results.push(district)
    }
  }

  return results
}

/**
 * 주소 문자열에서 검색어가 매칭된 부분을 하이라이트 세그먼트로 변환
 * 원본 문자를 자모 분해한 인덱스 매핑을 활용하여 하이라이트 범위 결정
 */
export function getHighlightedSegments(
  address: string,
  query: string,
): HighlightSegment[] {
  const trimmed = query.trim()
  if (!trimmed) return [{ text: address, highlighted: false }]

  const disassembledQuery = disassemble(trimmed)
  const disassembledAddress = disassemble(address)

  const matchIndex = disassembledAddress.indexOf(disassembledQuery)
  if (matchIndex === -1) return [{ text: address, highlighted: false }]

  // 원본 글자별 자모 길이를 계산하여 자모 인덱스 → 원본 글자 인덱스 매핑
  const charJamoLengths: number[] = []
  for (const char of address) {
    charJamoLengths.push(disassemble(char).length)
  }

  // 자모 누적 인덱스로 매칭 시작/끝 글자 위치 계산
  let jamoOffset = 0
  let startCharIndex = -1
  let endCharIndex = -1

  const matchEnd = matchIndex + disassembledQuery.length

  for (let i = 0; i < charJamoLengths.length; i++) {
    const jamoLen = charJamoLengths[i]
    const charJamoEnd = jamoOffset + jamoLen

    // 이 글자의 자모 범위가 매칭 범위와 겹치면 하이라이트 대상
    if (startCharIndex === -1 && charJamoEnd > matchIndex) {
      startCharIndex = i
    }
    if (charJamoEnd >= matchEnd && endCharIndex === -1) {
      endCharIndex = i + 1
    }

    jamoOffset = charJamoEnd
  }

  if (startCharIndex === -1 || endCharIndex === -1) {
    return [{ text: address, highlighted: false }]
  }

  const segments: HighlightSegment[] = []

  if (startCharIndex > 0) {
    segments.push({
      text: address.slice(0, startCharIndex),
      highlighted: false,
    })
  }

  segments.push({
    text: address.slice(startCharIndex, endCharIndex),
    highlighted: true,
  })

  if (endCharIndex < address.length) {
    segments.push({ text: address.slice(endCharIndex), highlighted: false })
  }

  return segments
}
