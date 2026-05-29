import { useState } from "react";
import { guardarResena } from "../../utilidades/redux/actions/resenasAction";
import { useDispatch, useSelector } from "react-redux";

function FormularioResena({ regresar, serieIdParam}) {
    const dispatch = useDispatch();
    const { usuario } = useSelector(store => store.auth); // Sacamos el ID del usuario logueado

    const [resena, setResena] = useState({
        calificacion: 1,
        comentario: '',
        usuarioId: usuario?.id || 0,
        serieId: serieIdParam || 0
    });

    function guardar() {
        if (resena.calificacion < 1 || resena.calificacion > 10) {
            return alert("La calificación debe estar entre 1 y 10.");
        }
        dispatch(guardarResena(resena)).then(() => {
            alert('Reseña guardada correctamente.');
            regresar();
        });
    }

    function onChange(e) {
        const { name, value } = e.target;
        const valorFinal = (name === 'calificacion' || name === 'serieId') ? parseInt(value) || 0 : value;
        setResena((estado) => ({ ...estado, [name]: valorFinal }));
    }

    return (
        <div className="mt-3">
            <label htmlFor="calificacion">Calificación (1-10):</label><br />
            <input type="number" name="calificacion" id="calificacion" min="1" max="10" onChange={onChange} className="form-control mb-2" />
            
            <label htmlFor="comentario">Comentario:</label><br />
            <textarea name="comentario" id="comentario" rows="3" onChange={onChange} className="form-control mb-2" />
            
            <label htmlFor="serieId">ID de la Serie a reseñar:</label><br />
            <input type="number" name="serieId" id="serieId" onChange={onChange} className="form-control mb-2" />
            
            <button className="btn btn-primary" onClick={guardar}>Guardar Reseña</button>
        </div>
    )
}
export default FormularioResena;