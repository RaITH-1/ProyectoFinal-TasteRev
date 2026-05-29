import { useState } from "react";
import ObtencionUsuarios from "./ObtencionUsuarios";
import ModificarUsuarioFormulario from "./ModificarUsuario";
import FormularioUsuario from "./GuardarUsuario";

import { logout } from "../../utilidades/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Usuarios() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { usuario } = useSelector(store => store.auth);
    console.log("Datos del usuario en Redux:", usuario);

    const [verFormulario, setFormulario] = useState(false);
    const [usuarioId, setUsuarioId] = useState(0);

    const handleCerrarSesion = () => {
        dispatch(logout());
        navigate('/login');
    }

    const esAdmin = Number(usuario?.id) === 1;

    if (!esAdmin) {
        return (
            <div className="container mt-5 text-center">
                <h2 className="text-danger">Acceso Denegado</h2>
                <p>No tienes permisos de administrador para ver esta página, o tu sesión ha expirado.</p>
                <button className="btn btn-danger mt-3" onClick={handleCerrarSesion}>
                    Cerrar Sesión y volver al Login
                </button>
            </div>
        );
    }

    const handleEditar = (id) => {
        setUsuarioId(id);
        setFormulario(true);
    }
    
    const handleRegresar = () => {
        setUsuarioId(0);
        setFormulario(false);
    }

    return(
        <>
            { verFormulario ? (
                usuarioId > 0 ? (
                    <>
                        <h1>Modificar Usuario</h1>
                        <button className="btn btn-secondary mb-3" onClick={handleRegresar}> Regresar</button>
                        <ModificarUsuarioFormulario regresar={handleRegresar} usuarioId={usuarioId} />
                    </>
                ) : (
                    <>
                        <h1>Guardar Usuario</h1>
                        <button className="btn btn-secondary mb-3" onClick={handleRegresar}> Regresar</button>
                        <FormularioUsuario regresar={handleRegresar}/>
                    </>
                )
            ) : (
                <>
                    <h1>Catálogo de Usuarios</h1>
                    <button className="btn btn-primary mb-3" onClick={() => setFormulario(true)}> + Nuevo Usuario</button>
                    <ObtencionUsuarios usuarioId={handleEditar} />
                </>
            )}
        </>
    );
}

export default Usuarios;