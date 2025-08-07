import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Restaurante.css';

function Registro() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users', {
        username: form.username,
        email: form.email,
        password: form.password
      });
      
      const userData = response.data;
      
      // Guardar datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      
      // Configurar axios para incluir el token en futuras peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      
      navigate('/Restaurantes');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fffbe6', padding: '30px', borderRadius: '10px' }}>
        <h2>Registro de Usuario</h2>
        
        {error && (
          <div style={{ color: 'red', marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '5px' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label>Nombre de usuario: </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

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

        <div style={{ marginBottom: '15px' }}>
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

        <div style={{ marginBottom: '20px' }}>
          <label>Confirmar contraseña: </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
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
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
          <Link to="/home">Volver al inicio</Link>
        </div>
      </form>
    </div>
  );
}

export default Registro;
