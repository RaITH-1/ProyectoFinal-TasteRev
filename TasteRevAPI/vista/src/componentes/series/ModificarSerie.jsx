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
        imagenUrl: srv.imagenUrl
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
        <div className="mt-3">
            <label htmlFor="titulo">Título de la Serie:</label><br />
            <input type="text" name="titulo" id="titulo" onChange={onChange} value={serie.titulo} className="form-control mb-2" />
            
            <label htmlFor="sinopsis">Sinopsis:</label><br />
            <textarea name="sinopsis" id="sinopsis" rows="3" onChange={onChange} value={serie.sinopsis} className="form-control mb-2" />
            
            <label htmlFor="imagenUrl">URL de la Imagen:</label><br />
            <input type="text" name="imagenUrl" id="imagenUrl" onChange={onChange} value={serie.imagenUrl} className="form-control mb-2" />
            
            <button className="btn btn-success" onClick={guardar}>Actualizar Cambios</button>
        </div>
    )
}
export default ModificarSerieFormulario;