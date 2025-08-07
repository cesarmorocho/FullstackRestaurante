import './App.css';
import FormularioAgregarRestaurante from './Componentes/FormularioAgregarRestaurante';
import Inicio from './Componentes/Inicio';
import ListaRestaurantes from './Componentes/ListaRestaurantes';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Conexion from './Componentes/Conexion';
import axios from 'axios';
import EditarRestaurante from './Componentes/EditarRestaurante';

function App() {
  const [restaurantes, setRestaurantes] = useState([]);//variable de estado que Guarda el valor actual de la lista de restaurantes
  const [user, setUser] = useState(null); // Estado para el usuario logueado
  const [loading, setLoading] = useState(true); // Estado de carga

  // Verificar si hay un usuario logueado al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      // Configurar axios para incluir el token en las peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  // GET: Leer restaurantes al cargar
  useEffect(() => {
    if (!loading) {
      axios.get('http://localhost:8000/restaurantes')
        .then(response => setRestaurantes(response.data))
        .catch(error => console.error('Error al cargar restaurantes: ', error));
    }
  }, [loading]);

  // POST: Agregar restaurante
  const agregarRestaurante = async (nuevoRestaurante) => {
    try {
      const response = await axios.post('http://localhost:8000/restaurantes', nuevoRestaurante);
      setRestaurantes(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error al agregar restaurante: ', error);
      throw error;
    }
  };

  // DELETE: Eliminar restaurante
  const eliminarRestaurante = async (id) => {
    try {
      console.log("Eliminando restaurante con id:", id);
      await axios.delete(`http://localhost:8000/restaurantes/${id}`);
      setRestaurantes(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      console.error('Error al eliminar restaurante: ', error);
      throw error;
    }
  };

  // PUT: actualizar un restaurante existente
  const actualizarRestaurante = async (id, datosActualizados) => {
    try {
      const response = await axios.put(`http://localhost:8000/restaurantes/${id}`, datosActualizados);
      setRestaurantes(prev =>
        prev.map(r => String(r._id) === String(id) ? response.data : r)
      );
      return response.data;
    } catch (error) {
      console.error('Error al actualizar restaurante:', error);
      throw error;
    }
  };

  // Función para manejar el login
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };


  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio user={user} onLogout={handleLogout} />} />
          <Route path="/home" element={<Inicio user={user} onLogout={handleLogout} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/Servidor" element={<Conexion />} />
          <Route path="/Restaurantes" element={<ListaRestaurantes restaurantes={restaurantes} onEliminar={eliminarRestaurante} user={user} />}/>
          <Route path="/AgregarRestaurante" element={<FormularioAgregarRestaurante onAgregar={agregarRestaurante} user={user} />}/>
          <Route path="/EditarRestaurante/:id" element={<EditarRestaurante restaurantes={restaurantes} onActualizar={actualizarRestaurante} user={user}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
