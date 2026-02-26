import { SearchInput } from '@/features/search-by-address'
import { HeaderIcon } from './HeaderIcon'

export function Header() {
  return (
    <header className="border-border/50 bg-background/30 sticky top-0 z-40 border-b backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <HeaderIcon />
        <SearchInput />
      </div>
    </header>
  )
}
