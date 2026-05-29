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
        <div className="card bg-dark text-white border-secondary shadow-sm p-4 mt-3" style={{ maxWidth: "600px" }}>
            
            <div className="mb-3">
                <label htmlFor="calificacion" className="form-label fw-bold text-info">Calificación (1-10):</label>
                <input 
                    type="number" 
                    name="calificacion" 
                    id="calificacion" 
                    min="1" 
                    max="10" 
                    onChange={onChange} 
                    value={resena.calificacion} 
                    className="form-control bg-dark text-white border-secondary" 
                />
            </div>
            
            <div className="mb-4">
                <label htmlFor="comentario" className="form-label fw-bold text-info">Comentario:</label>
                <textarea 
                    name="comentario" 
                    id="comentario" 
                    rows="4" 
                    onChange={onChange} 
                    value={resena.comentario} 
                    className="form-control bg-dark text-white border-secondary" 
                />
            </div>
            
            
            <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={guardar}>💾 Actualizar Cambios</button>
                <button className="btn btn-outline-light" onClick={regresar}>Cancelar</button>
            </div>
            
        </div>
    )
}
export default ModificarResenaFormulario;