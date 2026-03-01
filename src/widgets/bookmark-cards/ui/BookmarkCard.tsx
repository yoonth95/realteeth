import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/shared/ui/card'
import { EditDialog } from '@/shared/components/edit-dialog'
import { Button } from '@/shared/ui/button'
import { type Bookmark, useBookmarkStore } from '@/entities/bookmark'
import { useCombinedWeatherQuery } from '@/entities/weather'
import { BookmarkCardWeatherData } from './BookmarkCardWeatherData'
import { BookmarkCardSkeleton } from './BookmarkSkeleton'
import { Pencil, Trash2 } from 'lucide-react'

export function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const [showEditDialog, setShowEditDialog] = useState(false)

  const { removeBookmark, updateBookmarkAlias } = useBookmarkStore()
  const { data, isLoading, isError } = useCombinedWeatherQuery(
    bookmark.nx,
    bookmark.ny,
  )

  const handleEditStart = (newTitle: string) => {
    const oldTitle = bookmark.nickname
    if (oldTitle === newTitle) return
    updateBookmarkAlias(bookmark.id, newTitle)
  }

  if (isLoading || !data) {
    return <BookmarkCardSkeleton />
  }

  // 에러 발생 시 처리 (예: 스켈레톤 유지 또는 에러 메시지)
  if (isError) return null

  return (
    <>
      <Link
        key={bookmark.id}
        to={`/bookmark/${bookmark.id}`}
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
                  onClick={(e) => {
                    e.preventDefault()
                    setShowEditDialog(true)
                  }}
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
      <EditDialog
        title="장소 이름 변경"
        inputValue={bookmark.nickname}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onConfirm={handleEditStart}
      />
    </>
  )
}
