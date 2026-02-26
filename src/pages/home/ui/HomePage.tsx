import { WeatherSection } from '@/widgets/weather-cards'
import { BookmarkSection } from '@/widgets/bookmark-cards'

export function HomePage() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <WeatherSection />
      </div>
      <BookmarkSection />
    </div>
  )
}
