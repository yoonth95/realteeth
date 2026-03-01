import { create } from 'zustand'

export interface Coordinates {
  lat: number
  lng: number
}

export interface GridCoordinates {
  nx: number
  ny: number
}

interface LocationState {
  coordinates: Coordinates | null
  grid: GridCoordinates | null
  error: string | null
  isLoading: boolean
  isResolved: boolean
  prompted: boolean

  setLocationData: (data: Partial<LocationState>) => void
}

export const useLocationStore = create<LocationState>((set) => ({
  coordinates: { lat: 37.5425, lng: 127.0521 }, // 기본값 (성동구)
  grid: { nx: 61, ny: 127 }, // 기본값 (성동구)
  error: null,
  isLoading: false,
  isResolved: false,
  prompted: false,

  setLocationData: (data) => set((state) => ({ ...state, ...data })),
}))
