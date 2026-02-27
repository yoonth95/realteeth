import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

export function WeatherSkeleton() {
  return (
    <>
      {/* CurrentWeatherCard 스켈레톤 */}
      <article>
        <Card className="bg-card overflow-hidden border-0 shadow-lg">
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
                <Skeleton className="h-16 w-28" />
                <Skeleton className="mt-1 h-5 w-20" />
                <Skeleton className="mt-0.5 h-4 w-32" />
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

      {/* HourlyForecastCard 스켈레톤 */}
      <article>
        <Card className="bg-card overflow-hidden border-0 shadow-lg">
          <CardHeader className="pb-3">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent className="px-0 pb-4">
            <Skeleton className="mx-4 h-[200px] w-auto rounded-lg" />
          </CardContent>
        </Card>
      </article>
    </>
  )
}
