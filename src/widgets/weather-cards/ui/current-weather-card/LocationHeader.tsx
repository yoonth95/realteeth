import { CardHeader } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Crosshair, Star, StarOff } from 'lucide-react'

import type { LocationHeaderProps } from './types'

export function LocationHeader({
  location,
  currentDate,
  isBookmark,
  isFull,
  onToggleFavorite,
  onRefreshLocation,
  isRefreshing,
}: LocationHeaderProps) {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <span className="font-bold">{location}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={onRefreshLocation}
              disabled={isRefreshing}
              aria-label="현재 위치 및 날씨 새로고침"
            >
              <Crosshair
                className={`h-3.5 w-3.5 ${isRefreshing ? 'text-muted-foreground animate-spin' : ''}`}
              />
            </Button>
          </div>
          <span className="text-muted-foreground text-xs font-medium">
            {currentDate}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggleFavorite}
          disabled={!isBookmark && isFull}
          aria-label={isBookmark ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          {isBookmark ? (
            <Star className="fill-primary text-primary h-4 w-4" />
          ) : (
            <StarOff className="text-muted-foreground h-4 w-4" />
          )}
        </Button>
      </div>
    </CardHeader>
  )
}
