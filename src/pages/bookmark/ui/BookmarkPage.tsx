import { useParams, Navigate } from 'react-router-dom'
import { useBookmarkStore } from '@/entities/bookmark'
import { WeatherSection } from '@/widgets/weather-cards'

export function BookmarkPage() {
  const { id } = useParams<{ id: string }>()
  const { bookmarks } = useBookmarkStore()

  const bookmark = bookmarks.find((b) => b.id === id)

  if (!bookmark) {
    if (bookmarks.length > 0) {
      return <Navigate to={`/bookmark/${bookmarks[0].id}`} replace />
    }
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <section className="flex min-w-0 flex-1 flex-col gap-6">
          <WeatherSection bookmark={bookmark} />
        </section>
      </div>
    </div>
  )
}
