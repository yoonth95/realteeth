import { BookmarkCard } from './BookmarkCard'
import type { BookmarkLocation } from '@/entities/weather'
import { Star } from 'lucide-react'

interface Props {
  bookmarkList: BookmarkLocation[]
}
export function BookmarkCardList({ bookmarkList }: Props) {
  if (!bookmarkList.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8">
        <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-full">
          <Star className="text-muted-foreground h-5 w-5" />
        </div>
        <p className="text-muted-foreground text-sm">
          즐겨찾기한 장소가 없습니다.
        </p>
        <p className="text-muted-foreground text-xs">
          검색 후 별 아이콘을 눌러 추가해보세요 (최대 6개)
        </p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
      {bookmarkList.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  )
}
