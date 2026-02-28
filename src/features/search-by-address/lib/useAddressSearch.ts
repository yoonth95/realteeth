import { useRef, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import koreaDistricts from '@/shared/assets/data/korea_districts.json'
import { searchDistricts, type District } from '../lib/searchAddress'

/**
 * 주소 검색 상태 및 키보드 네비게이션 로직 관리
 */
export function useAddressSearch() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const results = useMemo(
    () => searchDistricts(search, koreaDistricts as District[]),
    [search],
  )

  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setFocusedIndex(-1)
  }, [])

  const handleSelect = useCallback(
    (district: District) => {
      setSearch(district.address)
      closeSearch()
      navigate(`/?q=${encodeURIComponent(district.address)}`)
    },
    [navigate, closeSearch],
  )

  const handleClear = useCallback(() => {
    setSearch('')
    closeSearch()
  }, [closeSearch])

  const handleChange = useCallback(
    (value: string) => {
      setSearch(value)
      if (value.trim()) {
        setIsOpen(true)
        setFocusedIndex(0)
        if (listRef.current) listRef.current.scrollTop = 0
      } else {
        closeSearch()
      }
    },
    [closeSearch],
  )

  const handleFocus = useCallback(() => {
    if (search.trim()) {
      setIsOpen(true)
      setFocusedIndex(0)
      if (listRef.current) listRef.current.scrollTop = 0
    }
  }, [search])

  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      if (containerRef.current?.contains(e.relatedTarget as Node)) return
      closeSearch()
    },
    [closeSearch],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // 엔터 키 처리
      if (e.key === 'Enter') {
        const query = search.trim()
        if (
          isOpen &&
          results.length > 0 &&
          focusedIndex >= 0 &&
          focusedIndex < results.length
        ) {
          e.preventDefault()
          handleSelect(results[focusedIndex])
          return
        } else if (query) {
          // 직접 입력한 검색어로 검색
          e.preventDefault()
          closeSearch()
          navigate(`/?q=${encodeURIComponent(query)}`)
          return
        } else {
          // 아무 값이 없을 때 엔터를 누르면 쿼리스트링 초기화
          e.preventDefault()
          closeSearch()
          navigate(`/`)
          return
        }
      }

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
        case 'Escape': {
          closeSearch()
          break
        }
      }
    },
    [
      isOpen,
      results,
      focusedIndex,
      search,
      handleSelect,
      navigate,
      closeSearch,
    ],
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
