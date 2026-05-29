import { useState } from "react";
import { guardarResena } from "../../utilidades/redux/actions/resenasAction";
import { useDispatch, useSelector } from "react-redux";

function FormularioResena({ regresar, serieIdParam }) {
    const dispatch = useDispatch();
    const { usuario } = useSelector(store => store.auth);

    const [resena, setResena] = useState({
        calificacion: 10, // Por defecto empezará en 10
        comentario: '',
        usuarioId: usuario?.id || 0,
        serieId: serieIdParam || 0 
    });

    function guardar() {
        dispatch(guardarResena(resena)).then(() => {
            alert('Reseña publicada correctamente.');
            regresar();
        });
    }

    function onChange(e) {
        const { name, value } = e.target;
        const valorFinal = name === 'calificacion' ? parseInt(value) || 0 : value;
        setResena((estado) => ({ ...estado, [name]: valorFinal }));
    }

    return (
        <div className="mt-3">
            <label htmlFor="calificacion">Calificación:</label><br />
            <select 
                name="calificacion" 
                id="calificacion" 
                onChange={onChange} 
                className="form-select mb-3" 
                value={resena.calificacion}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                ))}
            </select>
            
            <label htmlFor="comentario">Comentario:</label><br />
            <textarea 
                name="comentario" 
                id="comentario" 
                rows="4" 
                onChange={onChange} 
                className="form-control mb-4" 
                placeholder="Escribe tu opinión sobre esta serie..."
            />
            
            <button className="btn btn-primary" onClick={guardar}>Publicar Reseña</button>
        </div>
    )
}

export default FormularioResena;