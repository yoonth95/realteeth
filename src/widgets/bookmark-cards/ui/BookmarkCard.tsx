import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import type { BookmarkLocation } from '@/entities/weather'
import { BookmarkCardWeatherData } from './BookmarkCardWeatherData'

export function BookmarkCard({ bookmark }: { bookmark: BookmarkLocation }) {
  return (
    <Link
      key={bookmark.id}
      to={`/detail?lat=${bookmark.lat}&lon=${bookmark.lon}&name=${encodeURIComponent(bookmark.nickname)}`}
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
                // onClick={(e) => {
                //   e.preventDefault()
                //   handleEditStart(bookmark)
                // }}
                aria-label="이름 수정"
              >
                <Pencil className="text-muted-foreground h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                // onClick={(e) => {
                //   e.preventDefault()
                //   setDeleteConfirmId(bookmark.id)
                // }}
                aria-label="즐겨찾기 삭제"
              >
                <Trash2 className="text-muted-foreground h-3 w-3" />
              </Button>
            </div>
          </div>
          <BookmarkCardWeatherData bookmark={bookmark} />
        </CardContent>
      </Card>
    </Link>
  )
}
