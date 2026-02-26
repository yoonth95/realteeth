import { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { SearchIcon, CircleX } from 'lucide-react'

export function SearchInput() {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-1 items-center justify-end gap-4 sm:flex-none">
      <div className="relative w-full max-w-sm sm:w-96">
        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

          <Input
            placeholder="장소 검색 (시, 구, 동)"
            className="bg-card border-border/50 focus-visible:ring-primary/30 h-10 rounded-full px-9 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="group absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer"
              onClick={() => setSearch('')}
            >
              <CircleX className="text-muted-foreground group-hover:text-muted-foreground transition-colors duration-300" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
