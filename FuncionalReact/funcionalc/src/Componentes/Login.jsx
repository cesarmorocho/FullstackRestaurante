import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Restaurante.css';

function Login({ onLogin }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/users/login', form);
      const userData = response.data;
      
      // Guardar datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      
      // Configurar axios para incluir el token en futuras peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      
      onLogin(userData);
      navigate('/Restaurantes');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fffbe6', padding: '30px', borderRadius: '10px' }}>
        <h2>Iniciar Sesión</h2>
        
        {error && (
          <div style={{ color: 'red', marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '5px' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Contraseña: </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
          <Link to="/home">Volver al inicio</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
