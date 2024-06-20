import { Route, Routes } from 'react-router-dom'
import Navbar from '@/components/navbar/Navbar'
import LandingPage from '@/pages/landing-page/LandingPage'
import NotFound from '@/pages/NotFound'
import Search from '@/pages/search/Search'
import Admin from '@/pages/Admin'
import BookDetailPage from '@/pages/book-detail/BookDetailPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/books/:isbn" element={<BookDetailPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
