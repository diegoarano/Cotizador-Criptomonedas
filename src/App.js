import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled'
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';



const Contenedor= styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media (min-width: 992px){
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
    }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5px;
`;

const Heading = styled.h1 `
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700px;
  font-size: 50px;
  margin-top:80px;
  margin-bottom:50px;

  &::after{
    content:'';
    width:100px;
    height: 6px;
    background-color:#66a2fe;
    display: block;
  }
`;

function App() {

  const [moneda , guardarMoneda]= useState('');
  const [criptomoneda , guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState ({});
  const [cargando , guardarCargando] = useState(false);


  useEffect (()=>{
   

    const cotizarCriptomoneda = async () =>{

      if(moneda === '') return;

      //consultar la API

    const url =  `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    const resultado = await axios.get(url);

    //mostrar el Spinner

    guardarCargando(true);

    //ocultal spinner y mostrar resultado
    setTimeout(()=>{

        //cambiar el state de guardarcargando
        guardarCargando(false);

        //guardar cotizacion
      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])

    }, 3000);

    
  }
  cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  //mostrar Spinner o Resultado

  const componente = (cargando) ? <Spinner/> : <Cotizacion  resultado={resultado} />

 

  return (
  <Contenedor>
    <div>
      <Imagen
      src={imagen}
      alt="imagen cripto"
      />
    </div>
    <div>
    <Heading>Cotiza Criptomonedas al instante</Heading>

    <Formulario 
    guardarMoneda={guardarMoneda}
    guardarCriptomoneda={guardarCriptomoneda}
    />

    {componente}
    
    </div>


  </Contenedor>
  );
}

export default App;
