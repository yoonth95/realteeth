import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ScrollNavButtonsProps {
  scrollRef: React.RefObject<HTMLDivElement | null>
  startSentinelRef: React.RefObject<HTMLDivElement | null>
  endSentinelRef: React.RefObject<HTMLDivElement | null>
  isMobile: boolean
}

/**
 * 스크롤 네비게이션 버튼 컴포넌트
 * isAtStart/isAtEnd 상태를 자체적으로 관리하여,
 * 스크롤 위치 변경 시 이 컴포넌트만 리렌더링됩니다.
 */
export function ScrollNavButtons({
  scrollRef,
  startSentinelRef,
  endSentinelRef,
  isMobile,
}: ScrollNavButtonsProps) {
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  useEffect(() => {
    const scrollEl = scrollRef.current
    const startEl = startSentinelRef.current
    const endEl = endSentinelRef.current

    if (!scrollEl || !startEl || !endEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === startEl) {
            setIsAtStart(entry.isIntersecting)
          }
          if (entry.target === endEl) {
            setIsAtEnd(entry.isIntersecting)
          }
        })
      },
      {
        root: scrollEl,
        threshold: 0,
      },
    )

    observer.observe(startEl)
    observer.observe(endEl)

    return () => observer.disconnect()
  }, [scrollRef, startSentinelRef, endSentinelRef])

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const scrollAmount = 250
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        })
      }
    },
    [scrollRef],
  )

  if (isMobile) return null

  return (
    <>
      {!isAtStart && (
        <button
          onClick={() => scroll('left')}
          className="bg-secondary/80 text-secondary-foreground hover:bg-secondary absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full p-1.5 shadow-lg backdrop-blur-sm transition"
          aria-label="이전 시간"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {!isAtEnd && (
        <button
          onClick={() => scroll('right')}
          className="bg-secondary/80 text-secondary-foreground hover:bg-secondary absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full p-1.5 shadow-lg backdrop-blur-sm transition"
          aria-label="다음 시간"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </>
  )
}
