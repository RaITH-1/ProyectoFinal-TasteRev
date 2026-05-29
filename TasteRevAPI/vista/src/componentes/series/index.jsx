import { useState } from "react";
import ObtencionSeries from "./ObtencionSeries";
import ModificarSerieFormulario from "./ModificarSerie";
import FormularioSerie from "./GuardarSerie";
import ResenasDeSerie from "./ResenasDeSerie";

import { logout } from "../../utilidades/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Series() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [verFormulario, setFormulario] = useState(false);
    const [serieId, setSerieId] = useState(0);
    const [serieResenasId, setSerieResenasId] = useState(0);

    const handleCerrarSesion = () => { dispatch(logout()); navigate('/login'); }
    
    const handleEditar = (id) => { setSerieId(id); setFormulario(true); }
    const handleRegresar = () => { setSerieId(0); setFormulario(false); }

    // Controladores del nuevo botón
    const handleVerResenas = (id) => setSerieResenasId(id);
    const handleRegresarResenas = () => setSerieResenasId(0);

    return(
        <>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                <Link to="/inicio" className="btn btn-secondary">🏠 Volver al Inicio</Link>
                <button className="btn btn-danger" onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </div>

            {/* LÓGICA DE PANTALLAS */}
            { serieResenasId > 0 ? (
                // 1. Si presionaron "Ver Reseñas", mostramos la lista de la comunidad
                <ResenasDeSerie 
                    serieId={serieResenasId} 
                    regresar={handleRegresarResenas} 
                />
            ) : verFormulario ? (
                // 2. Si están editando o creando una serie
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
                // 3. Pantalla principal: La tabla de Series
                <>
                    <h1>Catálogo de Series</h1>
                    <button className="btn btn-primary mb-3" onClick={() => setFormulario(true)}> + Nueva Serie</button>
                    <ObtencionSeries 
                        serieId={handleEditar}
                        verResenas={handleVerResenas}
                    />
                </>
            )}
        </>
    );
}

export default Series;