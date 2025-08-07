import { useEffect, useState } from "react"; // Importa React y los hooks useEffect y useState para manejar estado y efectos secundarios
import { useParams, useNavigate } from "react-router-dom"; // Importa useParams para obtener parámetros de la URL y useNavigate para redirigir
import { Link } from 'react-router-dom'; // Importa Link para navegación interna
import "./Restaurante.css"; // Importa los estilos CSS

// Componente funcional para editar un restaurante
function EditarRestaurante({ restaurantes, onActualizar, user }) {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL (el id del restaurante a editar)
  const navigate = useNavigate(); // Usa useNavigate
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",      // Campo para el nombre del restaurante
    direccion: "",   // Campo para la dirección
    tipo: "",        // Campo para el tipo de restaurante
    imagen: "",      // Campo para la URL de la imagen
    valoracion: ""   // Campo para la valoración
  });

  // useEffect se ejecuta cuando cambian 'id' o 'restaurantes'
  useEffect(() => {
    // Verificar si el usuario está logueado
    if (!user) {
      navigate('/login');
      return;
    }

    const restaurante = restaurantes.find(r => String(r._id) === String(id)); // Cambia r.id por r._id
    if (restaurante) {
      // Verificar si el usuario es el creador del restaurante
      if (restaurante.userId && restaurante.userId !== user.id) {
        setError('No tienes permisos para editar este restaurante');
        return;
      }
      setForm(restaurante); // Si lo encuentra, llena el formulario con sus datos
    } else {
      // Si no está en el estado, podrías hacer una petición a la API para obtenerlo (comentado aquí)
      // axios.get(`http://localhost:3000/restaurante/${id}`).then(res => setForm(res.data));
    }
  }, [id, restaurantes, user, navigate]); // Dependencias: se ejecuta cuando cambian 'id' o 'restaurantes'

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; //desestructurar objetos Extrae el nombre y valor del campo modificado
    setForm(prev => ({
      ...prev,         // Mantiene los valores anteriores
      [name]: value    // Actualiza solo el campo modificado
    }));
  };

  // Envía la actualización del restaurante
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await onActualizar(id, form); // Espera a que termine la actualización
      navigate("/Restaurantes"); // Navega a la lista
    } catch (error) {
      setError(error.response?.data?.message || 'Error al actualizar el restaurante');
    } finally {
      setLoading(false);
    }
  };

  // Si no hay usuario logueado o hay un error de permisos
  if (!user) {
    return <div>Redirigiendo al login...</div>;
  }

  if (error && error.includes('permisos')) {
    return (
      <div style={{ textAlign: 'center', margin: '50px', color: 'red' }}>
        <h3>{error}</h3>
        <Link to="/Restaurantes">Volver a la lista</Link>
      </div>
    );
  }

  // Renderiza el formulario de edición
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px", background: "#fffbe6", padding: "20px", borderRadius: "10px" }}>
      <h2>Editar Restaurante</h2>
      
      {error && !error.includes('permisos') && (
        <div style={{ color: 'red', marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '5px' }}>
          {error}
        </div>
      )}
      
      <div>
        <label>Nombre: </label>
        <input name="nombre" value={form.nombre} onChange={handleChange} required />
      </div>
      <div>
        <label>Dirección: </label>
        <input name="direccion" value={form.direccion} onChange={handleChange} required />
      </div>
      <div>
        <label>Tipo: </label>
        <select name="tipo" value={form.tipo} onChange={handleChange} required>
          <option value="">Seleccione...</option>
          <option value="Tradicional">Tradicional</option>
          <option value="Comida Rápida">Comida Rápida</option>
          <option value="Parrillada">Parrillada</option>
        </select>
      </div>
      <div>
        <label>Imagen (URL): </label>
        <input name="imagen" value={form.imagen} onChange={handleChange} />
      </div>
      <div>
        <label>Valoración: </label>
        <input name="valoracion" type="number" min="1" max="5" value={form.valoracion} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar Cambios'}
      </button><br /><br />
      <Link to="/home">Inicio</Link><br /><br />
      <Link to="/Restaurantes">Lista Restaurantes </Link><br /><br />
    </form>
  );
}

export default EditarRestaurante; // Exporta el componente para su uso en App.js