import { useState } from "react";
import { guardarSerie } from "../../utilidades/redux/actions/seriesAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function FormularioSerie({ regresar }) {
    const dispatch = useDispatch();
    const { usuario } = useSelector(store => store.auth);
    const [serie, setSerie] = useState({
        titulo: '',
        sinopsis: '',
        imagenUrl: '',
        usuarioId: usuario?.id || 0
    });

    function guardar() {
        dispatch(guardarSerie(serie)).then(() => {
            alert('Serie guardada correctamente.');
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
            <input type="text" name="titulo" id="titulo" onChange={onChange} className="form-control mb-2" />
            
            <label htmlFor="sinopsis">Sinopsis:</label><br />
            <textarea name="sinopsis" id="sinopsis" rows="3" onChange={onChange} className="form-control mb-2" />
            
            <label htmlFor="imagenUrl">URL de la Imagen:</label><br />
            <input type="text" name="imagenUrl" id="imagenUrl" onChange={onChange} className="form-control mb-2" placeholder="https://..." />
            
            <button className="btn btn-primary" onClick={guardar}>Guardar Serie</button>
        </div>
    )
}
export default FormularioSerie;