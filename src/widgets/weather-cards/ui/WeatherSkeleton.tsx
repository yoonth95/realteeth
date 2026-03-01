import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

export function CurrentWeatherSkeleton() {
  return (
    <article>
      <Card className="bg-card animate-pulse overflow-hidden border-0 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-5 rounded-md" />
              </div>
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Skeleton className="h-15 w-35" />
              <Skeleton className="mt-1 h-5 w-20" />
              <Skeleton className="mt-0.5 h-4 w-30" />
            </div>
            <Skeleton className="h-20 w-20 rounded-2xl" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-secondary/50 flex flex-col items-center gap-1 rounded-xl p-3"
              >
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-5 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </article>
  )
}

export function HourlyWeatherSkeleton() {
  return (
    <article>
      <Card className="bg-card animate-pulse overflow-hidden border-0 shadow-lg">
        <CardHeader className="pb-3">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="px-0 pb-4">
          <Skeleton className="mx-4 h-[200px] w-auto rounded-lg" />
        </CardContent>
      </Card>
    </article>
  )
}

export function WeatherSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      <CurrentWeatherSkeleton />
      <HourlyWeatherSkeleton />
    </div>
  )
}

export function ErrorStateCard({ message }: { message?: string }) {
  return (
    <Card className="bg-card mt-6 flex h-[280px] w-full items-center justify-center border-0 shadow-lg">
      <div className="text-muted-foreground text-sm font-medium">
        {message || '해당 장소의 정보가 제공되지 않습니다.'}
      </div>
    </Card>
  )
}
