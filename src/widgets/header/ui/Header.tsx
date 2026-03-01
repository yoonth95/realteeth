import { SearchInput } from '@/features/search-by-address'
import { HeaderIcon } from './HeaderIcon'
import { useLocation, useNavigate, matchPath } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useBookmarkStore } from '@/entities/bookmark'

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { bookmarks } = useBookmarkStore()

  const match = matchPath({ path: '/bookmark/:id' }, location.pathname)
  const isBookmarkPage = !!match
  const id = match?.params.id

  const currentIndex = bookmarks.findIndex((b) => b.id === id)
  const hasMultipleBookmarks = bookmarks.length > 1

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/bookmark/${bookmarks[currentIndex - 1].id}`)
    } else {
      navigate(`/bookmark/${bookmarks[bookmarks.length - 1].id}`)
    }
  }

  const handleNext = () => {
    if (currentIndex < bookmarks.length - 1) {
      navigate(`/bookmark/${bookmarks[currentIndex + 1].id}`)
    } else {
      navigate(`/bookmark/${bookmarks[0].id}`)
    }
  }

  return (
    <header className="border-border/50 bg-background/30 sticky top-0 z-40 border-b backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {isBookmarkPage ? (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (window.history.length > 2) {
                  navigate(-1)
                } else {
                  navigate('/', { replace: true })
                }
              }}
              aria-label="이전 페이지로 돌아가기"
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <HeaderIcon />
          </div>
        ) : (
          <HeaderIcon />
        )}

        {isBookmarkPage ? (
          hasMultipleBookmarks && (
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground mr-2 hidden text-sm sm:inline-block">
                다른 장소 보기
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                aria-label="이전 즐겨찾기"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                aria-label="다음 즐겨찾기"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )
        ) : (
          <SearchInput />
        )}
      </div>
    </header>
  )
}
