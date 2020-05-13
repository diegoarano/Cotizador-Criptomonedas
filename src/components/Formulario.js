import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import Error from './Error';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';



const Boton = styled.input `
    margin-top: 20px;
    font-size:20px;
    font-weight: bold;
    padding:10px;
    background-color:#66a2fe;
    border: none;
    width:100%;
    border-radius:10px;
    color:#fff;
    transition: background-color .3s ease;

        &:hover{
            background-color: #326ac0;
            cursor: pointer;
        }

`;


const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //state del listado de criptomonedas

    const [listadoCripto, guardarCriptomonedas] = useState([]);

    const [error , guardarError] = useState (false);


    const MONEDAS = [

        {codigo: 'USD' , nombre : 'Dolar USA'},
        {codigo: 'EUR' , nombre : 'Euro'},
        {codigo: 'ARS' , nombre : 'Peso'},
        {codigo: 'GBP' , nombre : 'Libra Esterlina'}
    ]


    //utilizar useMoneda

    const [moneda, SelectMonedas] = useMoneda ('Elige tu Moneda' , '', MONEDAS);

    //utilizar useCriptomoneda

    const [ criptomoneda , SelectCripto ] = useCriptomoneda ('Elige tu Cpriptomoneda', '' ,listadoCripto );

    //ejecutar llamado a la API

    useEffect (() =>{
            const consultarAPI = async() =>{
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

                const resultado = await Axios.get(url);

                guardarCriptomonedas(resultado.data.Data)
            }

            consultarAPI();
    }, []);

    //cuando el usuario hace submit

    const cotizarMoneda = (e) =>{
        e.preventDefault()

        //validar si ambos campos estan llenos
        if( moneda === '' || criptomoneda === ' '){
            guardarError(true);
            return;
        }
        //pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda)
    }

    return ( 

        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMonedas />


            <SelectCripto/>

            <Boton
                type="submit"
                value="calcular"
            />

        </form>
     );
}
 
export default Formulario;