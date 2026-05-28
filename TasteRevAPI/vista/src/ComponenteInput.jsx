import axios from "axios";
import { useEffect, useState } from "react";

function ComponenteInput({ valorInicial }) {
    const [valor, setValor] = useState(valorInicial ?? '');
    
    useEffect(() => {
       let longitud = valor.length;
       let nuevoCaracter = valor.slice(longitud-1, longitud); 
       if(nuevoCaracter == 'e'){
            setValor(valor.slice(0,-1));
        }
    }, [valor]);

    
    return (
        <>
            <input type="text" value={valor} onChange={e => setValor(e.target.value)}/>
        </>
    );
}

export default ComponenteInput