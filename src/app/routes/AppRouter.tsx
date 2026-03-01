import { Routes, Route } from 'react-router-dom'
import { PageLayout } from './PageLayout'
import { HomePage } from '@/pages/home'
import { BookmarkPage } from '@/pages/bookmark'
import { NotFoundPage } from '@/pages/not-found'

export function AppRouter() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookmark/:id" element={<BookmarkPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageLayout>
  )
}
