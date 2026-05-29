import { useState } from "react";
import ObtencionResenas from "./ObtencionResenas";
import ModificarResenaFormulario from "./ModificarResena";

import { logout } from "../../utilidades/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Resenas() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [verFormulario, setFormulario] = useState(false);
    const [resenaId, setResenaId] = useState(0);

    const handleCerrarSesion = () => { dispatch(logout()); navigate('/login'); }
    const handleEditar = (id) => { setResenaId(id); setFormulario(true); }
    const handleRegresar = () => { setResenaId(0); setFormulario(false); }

    return(
        <>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                <Link to="/inicio" className="btn btn-secondary">🏠 Volver al Inicio</Link>
                <button className="btn btn-danger" onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </div>

            { verFormulario && resenaId > 0 ? (
                <>
                    <h1>Modificar Reseña</h1>
                    <button className="btn btn-secondary mb-3" onClick={handleRegresar}> Regresar</button>
                    <ModificarResenaFormulario regresar={handleRegresar} resenaId={resenaId} />
                </>
            ) : (
                <>
                    <h1>Mis Reseñas</h1>
                    {/* Botón modificado: Ahora lleva a las Series */}
                    <button className="btn btn-primary mb-3" onClick={() => navigate('/series')}> 
                        🔍 Explorar Series para Reseñar
                    </button>
                    <ObtencionResenas resenaId={handleEditar} />
                </>
            )}
        </>
    );
}
export default Resenas;