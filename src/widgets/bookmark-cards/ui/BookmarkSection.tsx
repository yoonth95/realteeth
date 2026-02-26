import { BookmarkCardList } from './BookmarkCardList'
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
    <aside className="w-full shrink-0 lg:w-80 xl:w-96">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-foreground text-sm font-semibold">즐겨찾기</h2>
        <span className="text-muted-foreground text-xs">
          {bookmarkList.length} / 6
        </span>
      </div>
      <BookmarkCardList bookmarkList={bookmarkList} />
    </aside>
  )
}
