import { useEffect, useState } from 'react'
import { WeatherSection } from '@/widgets/weather-cards'
import { BookmarkSection } from '@/widgets/bookmark-cards'
import { useGeolocation, GeolocationBanners } from '@/features/geolocation'

export function HomePage() {
  const { requestLocation, error, isLoading, isResolved, prompted } =
    useGeolocation()
  const [successTimerFinished, setSuccessTimerFinished] = useState(false)

  // 처음 마운트 시 위치 권한 요청
  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  // 권한을 성공적으로 받아온 경우 3초 뒤 배너 숨김 처리
  useEffect(() => {
    if (isResolved && !error && prompted) {
      const timer = setTimeout(() => setSuccessTimerFinished(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [isResolved, error, prompted])

  // 사용자가 방금 권한을 허용한 상태일 때 배너 띄우기
  const showSuccessBanner = Boolean(
    isResolved && !error && prompted && !successTimerFinished,
  )

  return (
    <div className="flex flex-col gap-6">
      <GeolocationBanners
        isLoading={isLoading}
        error={error}
        showSuccessBanner={showSuccessBanner}
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <section className="flex min-w-0 flex-1 flex-col gap-6">
          <WeatherSection />
        </section>
        <BookmarkSection />
      </div>
    </div>
  )
}
