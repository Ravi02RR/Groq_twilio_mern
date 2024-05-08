
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Page/Home';
import Navbar from './Component/Navbar';
import Search from './Page/Search';
import Error from './Page/Error';
import Login from './Page/Login';

function App() {
  const isAdmin = localStorage.getItem('isAdmin');
 

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={isAdmin ? <Home /> : <Navigate to="/error" />} />
          <Route path="/search" element={isAdmin ? <Search /> : <Navigate to="/error" />} />
          <Route path="/error" element={<Error />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
