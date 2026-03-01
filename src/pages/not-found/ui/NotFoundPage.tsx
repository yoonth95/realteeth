import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <AlertCircle className="text-muted-foreground h-16 w-16" />
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-muted-foreground">
          요청하신 페이지가 존재하지 않거나 잘못된 주소입니다.
        </p>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          // 뒤로 가기 기록이 없을 수도 있으므로 로직 추가
          if (window.history.length > 2) {
            navigate(-1)
          } else {
            navigate('/', { replace: true })
          }
        }}
        className="mt-4 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        이전 페이지로 돌아가기
      </Button>
    </div>
  )
}
