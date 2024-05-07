
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Page/Home'
import Navbar from './Component/Navbar'
import Search from './Page/Search'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
