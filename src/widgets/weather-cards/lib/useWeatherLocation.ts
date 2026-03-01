import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGeolocation } from '@/features/geolocation'
import {
  searchDistricts,
  type District,
} from '@/features/search-by-address/lib/searchAddress'
import type { Bookmark } from '@/entities/bookmark'
import koreaDistricts from '@/shared/assets/data/korea_districts.json'

export function useWeatherLocation(bookmark?: Bookmark) {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')

  const {
    grid: locationGrid,
    requestLocation,
    isLoading: isLocationLoading,
  } = useGeolocation()

  const resolved = useMemo(() => {
    if (bookmark) {
      return {
        grid: { nx: bookmark.nx, ny: bookmark.ny },
        locationName: bookmark.name,
        hasNoSearchResult: false,
      }
    }

    if (q) {
      const results = searchDistricts(q, koreaDistricts as District[], 1)
      if (results.length > 0) {
        return {
          grid: { nx: results[0].nx, ny: results[0].ny },
          locationName: results[0].address,
          hasNoSearchResult: false,
        }
      } else {
        return {
          grid: null,
          locationName: null,
          hasNoSearchResult: true,
        }
      }
    }

    return {
      grid: locationGrid,
      locationName: null,
      hasNoSearchResult: false,
    }
  }, [bookmark, q, locationGrid])

  return {
    grid: resolved.grid,
    locationName: resolved.locationName,
    hasNoSearchResult: resolved.hasNoSearchResult,
    requestLocation,
    isLocationLoading,
  }
}
