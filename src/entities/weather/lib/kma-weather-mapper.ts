/**
 * 기상청(KMA) SKY, PTY 코드를 기반으로 UI 표시용 아이콘과 상태 설명 반환
 */
export function getKmaWeatherIcon(
  sky: string,
  pty: string,
  isDay: boolean = true,
) {
  // PTY 강수형태: 0(없음), 1(비), 2(비/눈), 3(눈), 4(소나기), 5(빗방울), 6(빗방울눈날림), 7(눈날림)
  // SKY 하늘상태: 1(맑음), 3(구름많음), 4(흐림)

  if (pty === '1' || pty === '4' || pty === '5') {
    return { icon: 'cloud-rain', description: '비' }
  }
  if (pty === '2' || pty === '6') {
    return { icon: 'cloud-rain', description: '비/눈' } // 비/눈 구분이 애매하므로 비눈 아이콘 혹은 비
  }
  if (pty === '3' || pty === '7') {
    return { icon: 'cloud-snow', description: '눈' }
  }

  // 강수가 없을 경우 SKY 상태 확인
  if (sky === '1') {
    return { icon: isDay ? 'sun' : 'moon', description: '맑음' }
  }
  if (sky === '3') {
    return {
      icon: isDay ? 'cloud-sun' : 'cloud-moon',
      description: '구름 많음',
    }
  }
  if (sky === '4') {
    return { icon: 'cloud', description: '흐림' }
  }

  return { icon: 'cloud', description: '알 수 없음' }
}
