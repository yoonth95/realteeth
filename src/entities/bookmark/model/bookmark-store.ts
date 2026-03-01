import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Bookmark {
  id: string
  name: string
  nickname: string
  nx: number
  ny: number
}

interface BookmarkState {
  bookmarks: Bookmark[]
  addBookmark: (bookmark: Bookmark) => void
  removeBookmark: (id: string) => void
  updateBookmarkAlias: (id: string, nickname: string) => void
}

const MAX_BOOKMARKS = 6

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set) => ({
      bookmarks: [],
      addBookmark: (bookmark) =>
        set((state) => {
          if (state.bookmarks.length >= MAX_BOOKMARKS) return state
          if (state.bookmarks.some((b) => b.id === bookmark.id)) return state
          return { bookmarks: [...state.bookmarks, bookmark] }
        }),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),
      updateBookmarkAlias: (id, nickname) =>
        set((state) => ({
          bookmarks: state.bookmarks.map((b) =>
            b.id === id ? { ...b, nickname } : b,
          ),
        })),
    }),
    {
      name: 'bookmark-storage',
    },
  ),
)
