import { useState } from "react"

function ComponenteContador({ numeroInicial }) {
    const [contador, setContador] = useState(numeroInicial ?? 0);

    return (
    <>
        <button 
            onClick={() => setContador(contador + 1)}
        > 
        Numero Actual {contador} 
        </button>
    </>
  )
}

export default ComponenteContador