import { useState } from "react";
import ObtencionSeries from "./ObtencionSeries";
import ModificarSerieFormulario from "./ModificarSerie";
import FormularioSerie from "./GuardarSerie";
import ResenasDeSerie from "./ResenasDeSerie";
import FormularioResena from "../resenas/GuardarResena"; 

import { logout } from "../../utilidades/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Series() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [verFormulario, setFormulario] = useState(false);
    const [serieId, setSerieId] = useState(0);
    const [serieResenasId, setSerieResenasId] = useState(0); 
    
    const [crearResenaSerieId, setCrearResenaSerieId] = useState(0); 

    const handleCerrarSesion = () => { dispatch(logout()); navigate('/login'); }
    const handleRegresar = () => { setSerieId(0); setFormulario(false); }
    const handleRegresarResenas = () => setSerieResenasId(0);

    return(
        <>
            { crearResenaSerieId > 0 ? (
                <>
                    <h1>Escribir Reseña</h1>
                    <button className="btn btn-secondary mb-3" onClick={() => setCrearResenaSerieId(0)}>Cancelar</button>
                    <FormularioResena 
                        regresar={() => setCrearResenaSerieId(0)} 
                        serieIdParam={crearResenaSerieId} 
                    />
                </>
            ) : serieResenasId > 0 ? (
                <ResenasDeSerie serieId={serieResenasId} regresar={handleRegresarResenas} />
            ) : verFormulario ? (
                serieId > 0 ? (
                    <>
                        <h1>Modificar Serie</h1>
                        <button className="btn btn-secondary mb-3" onClick={handleRegresar}>Regresar</button>
                        <ModificarSerieFormulario regresar={handleRegresar} serieId={serieId}/>
                    </>
                ) : (
                    <>
                        <h1>Guardar Serie</h1>
                        <button className="btn btn-secondary mb-3" onClick={handleRegresar}>Regresar</button>
                        <FormularioSerie regresar={handleRegresar}/>
                    </>
                )
            ) : (
                <>
                    <h1>Catálogo de Series</h1>
                    <button className="btn btn-primary mb-3" onClick={() => setFormulario(true)}> + Nueva Serie</button>
                    <ObtencionSeries 
                        serieId={(id) => { setSerieId(id); setFormulario(true); }}
                        verResenas={(id) => setSerieResenasId(id)}
                        crearResena={(id) => setCrearResenaSerieId(id)} // 4. Pasamos la función al botón
                    />
                </>
            )}
        </>
    );
}

export default Series;