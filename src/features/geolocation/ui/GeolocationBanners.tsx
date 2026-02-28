interface GeolocationBannersProps {
  isLoading: boolean
  error: string | null
  showSuccessBanner: boolean
}

export function GeolocationBanners({
  isLoading,
  error,
  showSuccessBanner,
}: GeolocationBannersProps) {
  return (
    <>
      {/* 권한 요청 중일 때의 안내 배너 */}
      {isLoading && (
        <div className="animate-in fade-in slide-in-from-top-2 rounded-md border border-blue-200 bg-blue-50 p-3 text-center text-sm text-blue-800 shadow-sm duration-300">
          현재 위치 날씨를 확인하려면 위치 권한을 허용해 주세요. (기본 위치
          날씨를 표시 중입니다)
        </div>
      )}

      {/* 권한 거부 또는 에러 발생 시의 배너 */}
      {error && (
        <div className="animate-in fade-in slide-in-from-top-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-center text-sm text-yellow-800 shadow-sm duration-300">
          위치 권한이 거부되어 기본 위치 날씨를 보여줍니다. 변경하시려면 검색을
          이용해주세요.
        </div>
      )}

      {/* 성공 시 잠깐 보여질 배너 */}
      {showSuccessBanner && (
        <div className="animate-in fade-in slide-in-from-top-2 rounded-md border border-green-200 bg-green-50 p-3 text-center text-sm text-green-800 shadow-sm duration-300">
          현재 위치 기반 날씨로 업데이트되었습니다.
        </div>
      )}
    </>
  )
}
