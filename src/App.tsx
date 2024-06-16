import { Route, Routes } from 'react-router-dom'
import Navbar from '@/components/navbar/Navbar'
import LandingPage from '@/pages/LandingPage'
import NotFound from '@/pages/NotFound'
import Admin from '@/pages/Admin'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
