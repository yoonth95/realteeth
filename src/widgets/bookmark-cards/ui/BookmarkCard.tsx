import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import type { Bookmark } from '@/entities/bookmark'
import { useBookmarkStore } from '@/entities/bookmark'
import { BookmarkCardWeatherData } from './BookmarkCardWeatherData'
import { useCombinedWeatherQuery } from '@/entities/weather'
import { BookmarkCardSkeleton } from './BookmarkSkeleton'

export function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const { removeBookmark } = useBookmarkStore()
  const { data, isLoading, isError } = useCombinedWeatherQuery(
    bookmark.nx,
    bookmark.ny,
  )

  if (isLoading || !data) {
    return <BookmarkCardSkeleton />
  }

  // 에러 발생 시 처리 (예: 스켈레톤 유지 또는 에러 메시지)
  if (isError) {
    return null // 임시로 숨김
  }

  return (
    <Link
      key={bookmark.id}
      to={`/detail?nx=${bookmark.nx}&ny=${bookmark.ny}&name=${encodeURIComponent(bookmark.nickname)}`}
      className="group block"
    >
      <Card className="bg-card h-full cursor-pointer border-0 p-0 shadow-md transition-all duration-200 group-hover:-translate-y-0.5 hover:shadow-lg">
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="mr-2 flex min-w-0 flex-1 flex-col">
              <span className="text-foreground truncate text-sm font-semibold">
                {bookmark.nickname}
              </span>
              {bookmark.nickname !== bookmark.name && (
                <span className="text-muted-foreground truncate text-xs">
                  {bookmark.name}
                </span>
              )}
            </div>
            <div
              className="flex shrink-0 items-center gap-0.5"
              onClick={(e) => e.preventDefault()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                // 이름 수정은 추후 연동 (예: handleEditStart 로직 호출)
                aria-label="이름 수정"
              >
                <Pencil className="text-muted-foreground h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.preventDefault()
                  removeBookmark(bookmark.id)
                }}
                aria-label="즐겨찾기 삭제"
              >
                <Trash2 className="text-muted-foreground h-3 w-3" />
              </Button>
            </div>
          </div>
          <BookmarkCardWeatherData data={data} />
        </CardContent>
      </Card>
    </Link>
  )
}
