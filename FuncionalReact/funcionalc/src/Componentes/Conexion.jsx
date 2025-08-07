
import {useState} from "react"
import axios from 'axios';

function Conection() {

  const [restauranteList, setRestaurantesList] = useState([]);
  const [clientesList, setClientesList] = useState([]);

  const clickHandler = (e) => {
    axios.get('http://localhost:8000/restaurantes').then(response=>{
      setRestaurantesList(response.data)
      //console.log(response.data);
      console.log(response)
    })
    axios.get('http://localhost:8000/clientes').then(response=>{
      setClientesList(response.data)
      //console.log(response.data);
      console.log(response)
    })

  };
  

  return (
    <div>
      <button onClick={clickHandler}>Fetch Obtnener Restaurantes</button>
      <ul className="App">
        <h4>Lista de nombres de los restaurante</h4>
      {
        
        restauranteList.map((item, idx) =>{
          return <li key={idx}>
            {(item.nombre)}</li>
        })
      }
      <h4>Lista de nombres de los Clientes</h4>
      {
        clientesList.map((item, idx) =>{
          return <li key={idx}>
            {(item.nombre)}</li>
        })
      }
      </ul>
    </div>
  );
}

export default Conection;
