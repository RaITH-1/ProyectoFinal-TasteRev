import { useState } from "react";
import { modificarResena } from "../../utilidades/redux/actions/resenasAction";
import { useDispatch, useSelector } from "react-redux";

function ModificarResenaFormulario({ regresar, resenaId }) {
    const dispatch = useDispatch();
    const { resenas } = useSelector(store => store.resenas);
    const res = resenas.find(x => x.id == resenaId);

    const [resena, setResena] = useState({
        id: res.id,
        calificacion: res.calificacion,
        comentario: res.comentario,
        usuarioId: res.usuarioId,
        serieId: res.serieId
    });

    function guardar() {
        if (resena.calificacion < 1 || resena.calificacion > 10) {
            return alert("La calificación debe estar entre 1 y 10.");
        }

        dispatch(modificarResena(resena)).then(() => {
            alert('Cambios guardados correctamente.');
            regresar();
        });
    }

    function onChange(e) {
        const { name, value } = e.target;
        const valorFinal = (name === 'calificacion' || name === 'usuarioId' || name === 'serieId') 
            ? parseInt(value) || 0 
            : value;

        setResena((estado) => ({ ...estado, [name]: valorFinal }));
    }

    return (
        <div className="mt-3">
            <label htmlFor="calificacion">Calificación (1-10):</label><br />
            <input type="number" name="calificacion" id="calificacion" min="1" max="10" onChange={onChange} value={resena.calificacion} className="form-control mb-2" />
            
            <label htmlFor="comentario">Comentario:</label><br />
            <textarea name="comentario" id="comentario" rows="3" onChange={onChange} value={resena.comentario} className="form-control mb-2" />
            
            <label htmlFor="usuarioId">ID del Usuario:</label><br />
            <input type="number" name="usuarioId" id="usuarioId" onChange={onChange} value={resena.usuarioId} className="form-control mb-2" />

            <label htmlFor="serieId">ID de la Serie:</label><br />
            <input type="number" name="serieId" id="serieId" onChange={onChange} value={resena.serieId} className="form-control mb-2" />
            
            <button className="btn btn-success" onClick={guardar}>Actualizar Cambios</button>
        </div>
    )
}
export default ModificarResenaFormulario;