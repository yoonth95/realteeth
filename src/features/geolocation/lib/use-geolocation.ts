import { useCallback } from 'react'
import { latLonToGrid } from '@/shared/lib/weather-grid-converter'
import { useLocationStore } from '@/entities/location/model/store'

export function useGeolocation() {
  const store = useLocationStore()
  const setLocationData = store.setLocationData

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: { lat: 37.5425, lng: 127.0521 },
        grid: { nx: 61, ny: 127 },
        error: '사용 중인 웹 브라우저가 위치 정보를 지원하지 않습니다.',
        isResolved: true,
      })
      return
    }

    const executeLocationRequest = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          const { nx, ny } = latLonToGrid(lat, lng)

          setLocationData({
            coordinates: { lat, lng },
            grid: { nx, ny },
            error: null,
            isLoading: false,
            isResolved: true,
          })
        },
        (error) => {
          let errorMessage =
            '위치 정보를 가져오는 중 알 수 없는 오류가 발생했습니다.'
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = '사용자가 위치 정보 제공을 거부했습니다.'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = '위치 정보를 사용할 수 없습니다.'
              break
            case error.TIMEOUT:
              errorMessage = '위치 정보 요청 시간이 초과되었습니다.'
              break
          }

          console.warn(
            `[Geolocation Error] ${errorMessage} - 기본 위치(성동구)를 반환`,
          )

          setLocationData({
            coordinates: { lat: 37.5425, lng: 127.0521 },
            grid: { nx: 61, ny: 127 },
            error: errorMessage,
            isLoading: false,
            isResolved: true,
          })
        },
        { enableHighAccuracy: true, maximumAge: 0 },
      )
    }

    // 만약 브라우저가 Permissions API를 지원한다면 권한 상태를 먼저 확인
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          // 'prompt' 상태일 때만 실제 사용자 대기 시간이 발생하므로 로딩 상태로 변경
          if (result.state === 'prompt') {
            setLocationData({
              isLoading: true,
              error: null,
              isResolved: false,
              prompted: true,
            })
          } else {
            // 이미 'granted' 거나 'denied' 인 경우 로딩 없이 진행
            setLocationData({
              isLoading: false,
              error: null,
              isResolved: false,
              prompted: false,
            })
          }
          executeLocationRequest()
        })
        .catch(() => {
          setLocationData({
            isLoading: true,
            error: null,
            isResolved: false,
            prompted: false,
          })
          executeLocationRequest()
        })
    } else {
      // Permissions API를 지원하지 않는 브라우저 바로 로딩 처리 후 진행
      setLocationData({
        isLoading: true,
        error: null,
        isResolved: false,
        prompted: false,
      })
      executeLocationRequest()
    }
  }, [setLocationData])

  return { ...store, requestLocation }
}
