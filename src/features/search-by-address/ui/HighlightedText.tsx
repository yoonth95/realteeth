import type { HighlightSegment } from '../lib/searchAddress'

interface HighlightedTextProps {
  segments: HighlightSegment[]
}

/**
 * 하이라이트 세그먼트를 렌더링하는 컴포넌트
 */
export function HighlightedText({ segments }: HighlightedTextProps) {
  return (
    <span>
      {segments.map((seg, i) =>
        seg.highlighted ? (
          <mark
            key={i}
            className="text-highlight-blue bg-transparent font-semibold"
          >
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </span>
  )
}
