import { Card, CardContent } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

export function BookmarkSkeleton() {
  return (
    <aside className="w-full shrink-0 lg:w-80 xl:w-96">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-foreground text-sm font-semibold">즐겨찾기</h2>
        <span className="text-muted-foreground flex items-center gap-1 text-xs">
          <Skeleton className="h-3 w-3" /> / 6
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="block">
            <Card className="bg-card h-full border-0 p-0 shadow-md">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="mr-2 flex min-w-0 flex-1 flex-col gap-1">
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Skeleton className="h-7 w-7 rounded-md" />
                    <Skeleton className="h-7 w-7 rounded-md" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-7 w-16" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="mt-0.5 h-3 w-12" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </aside>
  )
}
