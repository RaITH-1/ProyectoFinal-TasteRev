import { useState } from "react";
import { modificarSerie } from "../../utilidades/redux/actions/seriesAction";
import { useDispatch, useSelector } from "react-redux";

function ModificarSerieFormulario({ regresar, serieId }) {
    const dispatch = useDispatch();
    const { series } = useSelector(store => store.series);
    const srv = series.find(x => x.id == serieId);

    const [serie, setSerie] = useState({
        id: srv.id,
        titulo: srv.titulo,
        sinopsis: srv.sinopsis,
        imagenUrl: srv.imagenUrl,
        genero: srv.genero || ""
    });

    function guardar() {
        dispatch(modificarSerie(serie)).then(() => {
            alert('Cambios guardados correctamente.');
            regresar();
        });
    }

    function onChange(e) {
        const { name, value } = e.target;
        setSerie((estado) => ({ ...estado, [name]: value }));
    }

    return (
        <div className="card bg-dark text-white border-secondary shadow-sm p-4 mt-3" style={{ maxWidth: "600px" }}>
            
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label fw-bold text-info">Título de la Serie:</label>
                <input type="text" name="titulo" id="titulo" onChange={onChange} value={serie.titulo} className="form-control bg-dark text-white border-secondary" />
            </div>

            <div className="mb-3">
                <label htmlFor="genero" className="form-label fw-bold text-info">Género:</label>
                <select 
                    name="genero" 
                    id="genero" 
                    onChange={onChange} 
                    value={serie.genero} 
                    className="form-select bg-dark text-white border-secondary"
                >
                    <option value="">Selecciona un género...</option>
                    <option value="Acción">Acción</option>
                    <option value="Ciencia Ficción">Ciencia Ficción</option>
                    <option value="Comedia">Comedia</option>
                    <option value="Drama">Drama</option>
                    <option value="Fantasía">Fantasía</option>
                    <option value="Terror">Terror</option>
                    <option value="Romance">Romance</option>
                    <option value="Animación">Animación</option>
                </select>
            </div>
            
            <div className="mb-3">
                <label htmlFor="sinopsis" className="form-label fw-bold text-info">Sinopsis:</label>
                <textarea name="sinopsis" id="sinopsis" rows="4" onChange={onChange} value={serie.sinopsis} className="form-control bg-dark text-white border-secondary" />
            </div>
            
            <div className="mb-4">
                <label htmlFor="imagenUrl" className="form-label fw-bold text-info">URL de la Imagen:</label>
                <input type="text" name="imagenUrl" id="imagenUrl" onChange={onChange} value={serie.imagenUrl} className="form-control bg-dark text-white border-secondary" />
            </div>
            
            <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={guardar}>💾 Actualizar Cambios</button>
                <button className="btn btn-outline-light" onClick={regresar}>Cancelar</button>
            </div>
            
        </div>
    );
}

export default ModificarSerieFormulario;