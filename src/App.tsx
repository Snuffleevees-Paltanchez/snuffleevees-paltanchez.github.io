import { Route, Routes } from 'react-router-dom'
import Navbar from '@/components/navbar/Navbar'
import LandingPage from '@/pages/landing-page/LandingPage'
import NotFound from '@/pages/NotFound'
import Search from '@/pages/search/Search'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
