import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';
import { TfiMedallAlt } from 'react-icons/tfi';
import { CgProfile } from 'react-icons/cg';
import HomePage from './HomePage';
import WinnersPage from './WinnersPage';
import ProfilePage from './ProfilePage';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const currentPath = location.pathname;
    
    if (!username && !['/login', '/register'].includes(currentPath)) {
      navigate('/login');
    }
    
    setAuthChecked(true);
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    // Limpiar todos los datos de usuario
    localStorage.removeItem('username');
    localStorage.removeItem('userCategory');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (!authChecked) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="inicio" element={<HomePage />} />
        <Route path="ganadores" element={<WinnersPage />} />
        <Route 
          path="perfil" 
          element={
            localStorage.getItem('username') ? (
              <ProfilePage handleLogout={handleLogout} />
            ) : (
              <div className="p-4 text-center">
                <h2 className="text-xl font-bold mb-4">Debes iniciar sesión para ver tu perfil</h2>
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Ir a Login
                </button>
              </div>
            )
          } 
        />
      </Routes>

      {/* Barra de navegación*/}
      {localStorage.getItem('username') && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
          <div className="flex justify-around py-2 px-2 w-full">
            <Link
              to="/home/inicio"
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                location.pathname.includes('/inicio')
                  ? 'text-[#83cd87] bg-green-50'
                  : 'text-[#729E7E] hover:text-[#83cd87] hover:bg-gray-50'
              }`}
            >
              <RiHome2Line size={24} />
              <span className="text-xs sm:text-sm font-medium">Inicio</span>
            </Link>

            <Link
              to="/home/ganadores"
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                location.pathname.includes('/ganadores')
                  ? 'text-[#83cd87] bg-green-50'
                  : 'text-[#729E7E] hover:text-[#83cd87] hover:bg-gray-50'
              }`}
            >
              <TfiMedallAlt size={24} />
              <span className="text-xs sm:text-sm font-medium">Ganadores</span>
            </Link>

            <Link
              to="/home/perfil"
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                location.pathname.includes('/perfil')
                  ? 'text-[#83cd87] bg-green-50'
                  : 'text-[#729E7E] hover:text-[#83cd87] hover:bg-gray-50'
              }`}
            >
              <CgProfile size={24} />
              <span className="text-xs sm:text-sm font-medium">Perfil</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Home;
