import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado local del formulario
import "./Restaurante.css"; // Importa los estilos CSS para el formulario
import { Link, useNavigate } from 'react-router-dom';


// Componente funcional para agregar un nuevo restaurante
function FormularioAgregarRestaurante({ onAgregar, user }) { // Recibe la función onAgregar como prop desde App.js
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Estado local para almacenar los valores de los campos del formulario
    const [form, setForm] = useState({
        nombre: "",      // Campo para el nombre del restaurante
        direccion: "",   // Campo para la dirección
        tipo: "",        // Campo para el tipo de restaurante (combo box)
        imagen: "",      // Campo para la URL de la imagen (opcional)
        valoracion: ""   // Campo para la valoración (puntuación)
    });

    // Verificar si el usuario está logueado
    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target; // Extrae el nombre y valor del campo modificado
        setForm(prev => ({                // Actualiza el estado del formulario
            ...prev,                      // Mantiene los valores anteriores
            [name]: value                 // Actualiza solo el campo modificado
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
        setLoading(true);
        setError('');
        
        // Verifica que los campos obligatorios estén completos
        if (form.nombre && form.direccion && form.tipo && form.valoracion) {
            try {
                await onAgregar({ // Llama a la función onAgregar (del padre) para agregar el nuevo restaurante
                    ...form, // Pasa todos los valores del formulario
                    imagen: form.imagen || "https://via.placeholder.com/150" // Si no se ingresa imagen, usa una por defecto
                });
                setForm({ // Limpia el formulario después de agregar
                    nombre: "",
                    direccion: "",
                    tipo: "",
                    imagen: "",
                    valoracion: ""
                });
                navigate('/Restaurantes'); // Redirigir a la lista después de agregar
            } catch (error) {
                setError(error.response?.data?.message || 'Error al agregar el restaurante');
            }
        }
        setLoading(false);
    };

    // Si el usuario no está logueado, no mostrar el formulario
    if (!user) {
        return <div>Redirigiendo al login...</div>;
    }

    // Renderiza el formulario
    return (
        <form 
            onSubmit={handleSubmit} // Asocia el evento de envío al manejador handleSubmit
            style={{ marginTop: "30px", background: "#fffbe6", padding: "20px", borderRadius: "10px" }} // Estilos en línea
        >
            <h2>Agregar Restaurante</h2>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '5px' }}>
                    {error}
                </div>
            )}
            
            <div>
                <label>Nombre: </label>
                <input 
                    name="nombre" // Nombre del campo (clave en el estado)
                    value={form.nombre} // Valor actual del campo
                    onChange={handleChange} // Manejador de cambio
                    required // Campo obligatorio
                />
            </div>
            <div>
                <label>Dirección: </label>
                <input 
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Tipo: </label>
                <select 
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione...</option> {/* Opción por defecto */}
                    <option value="Tradicional">Tradicional</option>
                    <option value="Comida Rápida">Comida Rápida</option>
                    <option value="Parrillada">Parrillada</option>
                </select>
            </div>
            <div>
                <label>Imagen (URL): </label>
                <input 
                    name="imagen"
                    value={form.imagen}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Valoración: </label>
                <input 
                    name="valoracion"
                    type="number" // Solo permite números
                    min="1"      // Valor mínimo permitido
                    max="5"      // Valor máximo permitido
                    value={form.valoracion}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Agregando...' : 'Agregar'}
            </button> {/* Botón para enviar el formulario */}<br /><br />
            <Link to="/home">Inicio</Link><br /><br />
            <Link to="/Restaurantes">Lista Restaurantes </Link><br /><br />
        </form>
        
    );
}

// Exporta el componente para que pueda ser usado en App.js
//export { FormularioAgregarRestaurante }; // Exportación nombrada (opcional, puedes eliminarla si no la usas)
export default FormularioAgregarRestaurante; // Exportación por defecto