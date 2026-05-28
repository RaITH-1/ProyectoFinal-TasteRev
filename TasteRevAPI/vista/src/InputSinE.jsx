import { useEffect, useState } from "react";

function InputSinE(){
    const [cadena, setCadena] = useState('');
    
    // useEffect(() => {
    //     var longitud = cadena.length;
    //     var caracter = cadena.slice(longitud-1, longitud);
    //     if(caracter === 'e'){
    //         setCadena(cadena.slice(0, longitud-1));
    //     }
    // }, [cadena])

    const palabraCambio = (e) => {
        setCadena(e.target.value)
        var longitud = cadena.length;
        var caracter = cadena.slice(longitud-1, longitud);
        if(caracter === 'e'){
            setCadena(cadena.slice(0, longitud-1));
        }
    }

    return(
        <>
            <input 
                type="text" 
                onChange={(e) => palabraCambio(e)}
                value={cadena}
            />
        </>
    );
}
export default InputSinE