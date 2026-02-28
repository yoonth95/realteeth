import { getHighlightedSegments } from '../lib/searchAddress'
import type { District } from '../lib/searchAddress'
import { HighlightedText } from './HighlightedText'
import { MapPin } from 'lucide-react'

interface SearchSuggestionListProps {
  results: District[]
  query: string
  focusedIndex: number
  listRef: React.RefObject<HTMLUListElement | null>
  onSelect: (district: District) => void
  onHover: (index: number) => void
}

/**
 * 검색 결과 드롭다운 리스트 컴포넌트
 */
export function SearchSuggestionList({
  results,
  query,
  focusedIndex,
  listRef,
  onSelect,
  onHover,
}: SearchSuggestionListProps) {
  if (results.length === 0) {
    return (
      <div className="bg-popover border-border/50 text-muted-foreground absolute z-50 mt-1 w-full rounded-xl border px-3 py-4 text-center text-sm shadow-lg">
        검색 결과가 없습니다
      </div>
    )
  }

  return (
    <ul
      ref={listRef}
      className="bg-popover border-border/50 absolute z-50 mt-1 w-full overflow-hidden rounded-xl border shadow-lg"
    >
      {results.map((district, index) => {
        const segments = getHighlightedSegments(district.address, query)
        return (
          <li key={district.address}>
            <button
              type="button"
              className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
                index === focusedIndex ? 'bg-accent' : 'hover:bg-accent'
              }`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSelect(district)}
              onMouseEnter={() => onHover(index)}
            >
              <MapPin className="text-muted-foreground h-4 w-4 shrink-0" />
              <HighlightedText segments={segments} />
            </button>
          </li>
        )
      })}
    </ul>
  )
}
