import { BookmarkCardList } from './BookmarkCardList'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { useBookmarkStore } from '@/entities/bookmark'

export function BookmarkSection() {
  const { bookmarks } = useBookmarkStore()

  return (
    <aside className="flex w-full shrink-0 flex-col lg:min-h-0 lg:w-80 xl:w-96">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <h2 className="text-foreground text-sm font-semibold">즐겨찾기</h2>
        <span className="text-muted-foreground text-xs">
          {bookmarks.length} / 6
        </span>
      </div>
      <div className="relative flex-1">
        <div className="lg:absolute lg:inset-0">
          <ScrollArea className="h-full max-h-[500px] lg:max-h-none">
            <div className="pb-1 lg:pr-3">
              <BookmarkCardList bookmarkList={bookmarks} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </aside>
  )
}
