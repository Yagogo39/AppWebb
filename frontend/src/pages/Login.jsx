import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: values.username,
        password: values.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        validateStatus: (status) => status < 500
      });

      console.log('Respuesta del servidor:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Error en el login');
      }

      if (!response.data.user?.username) {
        throw new Error('Datos de usuario no recibidos correctamente');
      }

      // Guardar datos de autenticación
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('userData', JSON.stringify(response.data.user));

      // Redirigir a home
      navigate('/home/');

    } catch (error) {
      console.error('Error en login:', error);
      setError(error.response?.data?.message || error.message || 'Error desconocido');
      // Limpiar en caso de error
      localStorage.removeItem('username');
      localStorage.removeItem('userData');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4'>
      <div className='shadow-lg px-6 py-8 border w-full max-w-md bg-white rounded-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Iniciar Sesión</h2>

        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className='block text-gray-700 mb-2 font-medium'>Usuario</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChanges}
              disabled={loading}
              placeholder='Ingresa tu usuario'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className='block text-gray-700 mb-2 font-medium'>Contraseña</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChanges}
              disabled={loading}
              placeholder='Ingresa tu contraseña'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : 'Ingresar'}
          </button>
        </form>

        <div className="text-center mt-6">
          <span className='text-gray-600'>¿No tienes una cuenta? </span>
          <Link to='/register' className='text-blue-500 hover:text-blue-700 font-medium'>
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;