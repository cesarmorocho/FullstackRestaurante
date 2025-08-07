import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado local
import "./Restaurante.css"; // Importa los estilos CSS para este componente
import { Link } from "react-router-dom";
// Componente funcional Restaurante que recibe props
const Restaurante = (props) => {
    // Desestructura las props recibidas desde App.js
    const {nombre, direccion, tipo, imagen, valoracion, userId, onlike, handlerDislikeTotales, onEliminar, user} = props;

    // Estado local para likes y dislikes individuales de este restaurante
    const [preferencia, setPreferencia] = useState({
        likes: 0,      // Inicializa los likes en 0
        dislikes: 0    // Inicializa los dislikes en 0
    });

    // Función que maneja el evento de dar like
    const handlerLike = () => {
        setPreferencia((prevState) => ({
            ...prevState,                // Mantiene el resto del estado igual
            likes: prevState.likes + 1   // Suma 1 a los likes
        }));
        onlike(); // Llama a la función que viene de App.js para aumentar el contador global de likes
    }

    // Obtiene los valores actuales de likes y dislikes del estado local
    const likes = preferencia.likes;
    const dislikes = preferencia.dislikes;

    // Verificar si el usuario actual es el creador del restaurante
    const isOwner = user && userId && user.id === userId;

    // Función que maneja el evento de dar dislike
    const handlerDislike = () => {
        setPreferencia((prevState) => ({
            ...prevState,                   // Mantiene el resto del estado igual
            dislikes: prevState.dislikes - 1 // Resta 1 a los dislikes
        }));
        handlerDislikeTotales(); // Llama a la función que viene de App.js para disminuir el contador global de likes
    }

    // Renderiza el componente Restaurante
    return (
        <div> {/* Contenedor principal del restaurante */}
            <div id="restaurante"> {/* Contenedor con estilos específicos */}
                <h1>Nombre: {nombre}</h1> {/* Muestra el nombre del restaurante */}
                <h3>Direccion: {direccion}</h3> {/* Muestra la dirección */}
                <h4>Tipo: {tipo}</h4> {/* Muestra el tipo de restaurante */}
                <img src={imagen} alt={nombre} /> {/* Muestra la imagen */}
                {valoracion && <h4>Valoración: {valoracion}</h4>} {/* Si hay valoración, la muestra */}
                <h4>Likes: {likes}</h4> {/* Muestra los likes individuales */}
                <button onClick={handlerLike}>Like</button> {/* Botón para dar like */}
                <h4>Dislike: {dislikes}</h4> {/* Muestra los dislikes individuales */}
                <button onClick={handlerDislike}>Dislike</button> {/* Botón para dar dislike */}
                
                {/* Solo mostrar botones de eliminar y editar si el usuario es el creador */}
                {isOwner && (
                    <>
                        <button onClick={onEliminar} style={{marginLeft: "10px", backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px"}}>
                            Eliminar
                        </button>
                        <Link to={`/EditarRestaurante/${props.id}`}>
                            <button style={{marginLeft: "10px", backgroundColor: "#007bff", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px"}}>
                                Editar
                            </button>
                        </Link>
                    </>
                )}
                
                {userId && (
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                        Creado por: Usuario ID {userId}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Restaurante; // Exporta el componente para que pueda ser usado en App.js