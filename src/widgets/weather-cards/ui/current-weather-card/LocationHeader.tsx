import { CardHeader } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { Crosshair, Star, StarOff } from 'lucide-react'

import type { LocationHeaderProps } from './types'

export function LocationHeader({
  location,
  alias,
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
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-2">
              <span className="font-bold">{alias || location}</span>
              {alias && alias !== location && (
                <span className="text-muted-foreground text-sm font-normal">
                  {location}
                </span>
              )}
            </div>
            {onRefreshLocation && (
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>현재 위치로 새로고침</p>
                </TooltipContent>
              </Tooltip>
            )}
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
            <Star className="fill-weather-sun text-weather-sun h-4 w-4" />
          ) : (
            <StarOff className="text-muted-foreground h-4 w-4" />
          )}
        </Button>
      </div>
    </CardHeader>
  )
}
