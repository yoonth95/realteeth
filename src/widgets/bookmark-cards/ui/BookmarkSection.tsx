import { BookmarkCardList } from './BookmarkCardList'
import { ScrollArea } from '@/shared/ui/scroll-area'
// import { BookmarkSkeleton } from './BookmarkSkeleton'

const bookmarkList = [
  {
    id: '1',
    name: '서울',
    nickname: '서울',
    lat: 37.5665,
    lon: 126.978,
    country: '대한민국',
    state: '서울특별시',
    current: {
      temp: 25,
      description: '맑음',
      icon: '01d',
      weatherCode: 0,
    },
    today: {
      temp_min: 20,
      temp_max: 30,
    },
  },
  {
    id: '2',
    name: '부산',
    nickname: '부산',
    lat: 35.1796,
    lon: 129.0756,
    country: '대한민국',
    state: '부산광역시',
    current: {
      temp: 25,
      description: '맑음',
      icon: '01d',
      weatherCode: 0,
    },
    today: {
      temp_min: 20,
      temp_max: 30,
    },
  },
]

export function BookmarkSection() {
  // if (isLoading) {
  // return <BookmarkSkeleton />
  // }

  return (
    <aside className="flex w-full shrink-0 flex-col lg:min-h-0 lg:w-80 xl:w-96">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <h2 className="text-foreground text-sm font-semibold">즐겨찾기</h2>
        <span className="text-muted-foreground text-xs">
          {bookmarkList.length} / 6
        </span>
      </div>
      <div className="relative flex-1">
        <div className="lg:absolute lg:inset-0">
          <ScrollArea className="h-full max-h-[500px] lg:max-h-none">
            <div className="pb-1 lg:pr-3">
              <BookmarkCardList bookmarkList={bookmarkList} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </aside>
  )
}
