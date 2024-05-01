import { Route, Routes } from 'react-router-dom'
import Navbar from '@/components/navbar/Navbar'
import LandingPage from '@/pages/LandingPage'
import NotFound from '@/pages/NotFound'

const BASE_URL = import.meta.env.VITE_BASE_URL || '/mikbooks'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={`${BASE_URL}/`} element={<LandingPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
