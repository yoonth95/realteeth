import { useRef, useState, useMemo, useCallback } from 'react'
import koreaDistricts from '@/shared/assets/data/korea_districts.json'
import { searchDistricts } from '../lib/searchAddress'
import type { District } from '../lib/searchAddress'

/**
 * 주소 검색 상태 및 키보드 네비게이션 로직 관리
 */
export function useAddressSearch() {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const results = useMemo(
    () => searchDistricts(search, koreaDistricts as District[]),
    [search],
  )

  const handleSelect = useCallback((district: District) => {
    setSearch(district.address)
    setIsOpen(false)
    setFocusedIndex(-1)
  }, [])

  const handleClear = useCallback(() => {
    setSearch('')
    setIsOpen(false)
    setFocusedIndex(-1)
  }, [])

  const handleChange = useCallback((value: string) => {
    setSearch(value)
    setIsOpen(true)
    setFocusedIndex(-1)
  }, [])

  const handleFocus = useCallback(() => {
    if (search.trim()) setIsOpen(true)
  }, [search])

  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (containerRef.current?.contains(e.relatedTarget as Node)) return
    setIsOpen(false)
    setFocusedIndex(-1)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) return

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          const nextIndex =
            focusedIndex < results.length - 1 ? focusedIndex + 1 : 0
          setFocusedIndex(nextIndex)

          const buttons = listRef.current?.querySelectorAll('button')
          buttons?.[nextIndex]?.scrollIntoView({ block: 'nearest' })
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          const prevIndex =
            focusedIndex > 0 ? focusedIndex - 1 : results.length - 1
          setFocusedIndex(prevIndex)

          const buttons = listRef.current?.querySelectorAll('button')
          buttons?.[prevIndex]?.scrollIntoView({ block: 'nearest' })
          break
        }
        case 'Enter': {
          if (focusedIndex >= 0 && focusedIndex < results.length) {
            e.preventDefault()
            handleSelect(results[focusedIndex])
          }
          break
        }
        case 'Escape': {
          setIsOpen(false)
          setFocusedIndex(-1)
          break
        }
      }
    },
    [isOpen, results, focusedIndex, handleSelect],
  )

  return {
    search,
    isOpen,
    focusedIndex,
    results,
    containerRef,
    listRef,
    setFocusedIndex,
    handleSelect,
    handleClear,
    handleChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
  }
}
