import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Inicio({ user, onLogout }) {
  const navigate = useNavigate();

  const handleIrLista = () => {
    navigate('/Restaurantes');
  };

  const handleIrFormulario = () => {
    navigate('/AgregarRestaurante');
  };

  const handleLogout = () => {
    onLogout();
    navigate('/home');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bienvenidos al Sistema de Restaurantes</h1>
      
      {user ? (
        <div>
          <h3>¡Hola, {user.username}!</h3>
          <div style={{ margin: '20px 0' }}>
            <Link to="/Restaurantes" style={{ margin: '0 10px' }}>Ver Restaurantes</Link>
            <Link to="/AgregarRestaurante" style={{ margin: '0 10px' }}>Agregar Restaurante</Link>
          </div>
          <div style={{ margin: '20px 0' }}>
            <button onClick={handleIrLista} style={{ margin: '5px' }}>Ir a Lista Restaurantes</button>
            <button onClick={handleIrFormulario} style={{ margin: '5px' }}>Ir al Formulario de Registro</button>
          </div>
          <button 
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div>
          <p>Para acceder a todas las funcionalidades, necesitas iniciar sesión</p>
          <div style={{ margin: '20px 0' }}>
            <Link to="/login" style={{ margin: '0 10px' }}>Iniciar Sesión</Link>
            <Link to="/registro" style={{ margin: '0 10px' }}>Registrarse</Link>
          </div>
          <Link to="/Restaurantes" style={{ margin: '0 10px' }}>Ver Restaurantes (Solo lectura)</Link>
        </div>
      )}
    </div>
  );
}

export default Inicio;