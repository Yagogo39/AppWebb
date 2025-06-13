import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaGraduationCap,
  FaBookOpen,
  FaUser,
  FaIdBadge,
  FaVenus,
  FaEnvelope,
  FaSignOutAlt
} from 'react-icons/fa';

const FIELD_CONFIGS = {
  estudiantil: [
    { label: "Matrícula", key: "matricula", icon: <FaGraduationCap className="text-green-600" /> },
    { label: "Carrera", key: "carrera", icon: <FaBookOpen className="text-green-600" /> },
    { label: "Nombre", key: "nombre", icon: <FaUser className="text-green-600" /> },
    { label: "Apellido", key: "apellido", icon: <FaIdBadge className="text-green-600" /> },
    { label: "Género", key: "genero", icon: <FaVenus className="text-green-600" /> },
    { label: "Correo", key: "email", isUserData: true },
    { label: "Semestre", key: "semestre", icon: <FaEnvelope className="text-green-600" /> },
  ],
  administrativo: [
    { label: "Nombre", key: "nombre", icon: <FaUser className="text-green-600" /> },
    { label: "Apellido", key: "apellido", icon: <FaIdBadge className="text-green-600" /> },
    { label: "Género", key: "genero", icon: <FaVenus className="text-green-600" /> },
    { label: "Puesto", key: "puesto", icon: <FaEnvelope className="text-green-600" /> },
    { label: "Departamento", key: "departamento", icon: <FaEnvelope className="text-green-600" /> },
    { label: "Domicilio", key: "domicilio", icon: <FaEnvelope className="text-green-600" /> },
  ],
  libre: [
    { label: "Nombre", key: "nombre", icon: <FaUser className="text-green-600" /> },
    { label: "Apellido", key: "apellido", icon: <FaIdBadge className="text-green-600" /> },
    { label: "Género", key: "genero", icon: <FaVenus className="text-green-600" /> },
    { label: "Domicilio", key: "domicilio", icon: <FaEnvelope className="text-green-600" /> },
  ]
};

const ProfileCard = ({ userData, fields, isVisible }) => (
  <div
    role="region"
    aria-label="Tarjeta de perfil de usuario"
    tabIndex={0}
    className={`w-full max-w-md bg-white rounded-xl shadow-lg p-6 my-8 mx-auto
      transition-all duration-700 ease-out
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
  >
    <div className="flex flex-col items-center mb-6">
      <div
        aria-label="Avatar del usuario"
        className="w-24 h-24 md:w-28 md:h-28 
        bg-gradient-to-tr from-green-400 to-green-600 
        rounded-full flex items-center justify-center 
        text-3xl font-extrabold text-white 
        border-4 border-green-700 shadow-lg mb-4"
      >
        {userData.categoriaData?.nombre?.[0] || 'E'}.{userData.categoriaData?.apellido?.[0] || 'S'}
      </div>
      <h2 className="text-xl font-bold text-gray-800">
        {userData.categoriaData?.nombre || 'Nombre no disponible'} {userData.categoriaData?.apellido || ''}
      </h2>
      <p className="text-green-600">@{userData.username}</p>
    </div>

    <div className="space-y-4">
      {fields
        .filter(field => {
          const value = field.isUserData 
            ? userData[field.key]
            : userData.categoriaData?.[field.key];
          return value;
        })
        .map((field) => {
          const value = field.isUserData 
            ? userData[field.key]
            : userData.categoriaData?.[field.key];
            
          return (
            <div key={field.label} className="flex items-start gap-4">
              <div className="mt-1">{field.icon || <FaEnvelope className="text-green-600" />}</div>
              <div className="flex-1">
                <p className="font-semibold text-green-700">{field.label}</p>
                <div className="bg-gray-50 px-4 py-2 rounded-md text-gray-800">
                  {value || 'No especificado'}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  </div>
);

const useUserData = (username) => {
  const [state, setState] = useState({
    userData: null,
    loading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    if (!username) {
      setState({
        userData: null,
        loading: false,
        error: 'No se encontró usuario autenticado'
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/auth/user-data?username=${username}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Error al obtener datos del usuario');
      }

      setState({
        userData: data.user,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error:', error);
      setState({
        userData: null,
        loading: false,
        error: error.message
      });
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
};

const ProfilePage = ({ handleLogout }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const { userData, loading, error, refetch } = useUserData(username);

  useEffect(() => {
    setIsVisible(true);
  }, [userData]);

  if (!username) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">No se encontró usuario autenticado</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          aria-label="Ir a la página de inicio de sesión"
        >
          Ir a Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#A4C3A2] flex items-center justify-center">
        <div className="text-center py-4" aria-live="polite">
          Cargando perfil...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#A4C3A2] flex items-center justify-center">
        <div className="text-red-500 py-4" aria-live="assertive">
          Error: {error}
          <button 
            onClick={refetch}
            className="ml-4 bg-blue-500 text-white px-3 py-1 rounded"
            aria-label="Reintentar carga de perfil"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#A4C3A2] flex items-center justify-center">
        <div className="text-center py-4">
          No se encontraron datos del usuario
        </div>
      </div>
    );
  }

  const fields = FIELD_CONFIGS[userData.categoria] || [];

  return (
    <div className='min-h-screen bg-[#A4C3A2] flex items-center justify-center flex-col'>
      <ProfileCard 
        userData={userData} 
        fields={fields} 
        isVisible={isVisible} 
      />
      
      <div className="mt-8 mb-8 text-center">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors mx-auto"
          aria-label="Cerrar sesión"
        >
          <FaSignOutAlt />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;