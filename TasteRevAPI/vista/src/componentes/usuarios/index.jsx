import { useState } from "react";
import ObtencionUsuarios from "./ObtencionUsuarios";
import ModificarUsuarioFormulario from "./ModificarUsuario";
import { Button } from "react-bootstrap";
import { logout } from "../../utilidades/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import FormularioUsuario from "./GuardarUsuario";

function Usuarios() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { usuario } = useSelector(store => store.auth);
    const [verFormulario, setFormulario] = useState(false);
    const [usuarioId, setUsuarioId] = useState(0);

    const esAdmin = usuario?.id === 1;

    if (!esAdmin) {
        return (
            <div className="container mt-5 text-center">
                <h2 className="text-danger">Acceso Denegado</h2>
                <p>No tienes permisos de administrador para ver esta página.</p>
                <Link to="/inicio" className="btn btn-primary mt-3">Volver al Inicio</Link>
            </div>
        );
    }
    
    const handleCerrarSesion = () =>{
        dispatch(logout());
        navigate('/login');
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
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
            <Link to="/inicio" className="btn btn-secondary">🏠 Volver al Inicio</Link>
            <button className="btn btn-danger" onClick={handleCerrarSesion}>Cerrar Sesión</button>
        </div>
            { verFormulario ? (
                usuarioId > 0 ? (
                    <>
                        <h1>Modificar Usuario</h1>
                        <button 
                            id="mostrarTabla" 
                            name="mostrarTabla"
                            onClick={() => handleRegresar()}
                        > Regresar</button>
                        <ModificarUsuarioFormulario 
                            regresar={() => handleRegresar()}
                            usuarioId={usuarioId}
                        />
                    </>
                ) : (
                    <>
                        <h1>Guardar Usuario</h1>
                        <button 
                            id="mostrarTabla" 
                            name="mostrarTabla"
                            onClick={() => handleRegresar(false)}
                        > Regresar</button>
                        <FormularioUsuario regresar={() => handleRegresar(false)}/>
                    </>
                )
            ) : (
                <>
                    <h1>Tabla Usuarios</h1>
                    <button 
                        id="mostrarFormulario" 
                        name="mostrarFormulario"
                        onClick={() => setFormulario(true)}
                    > + Nuevo Usuario</button>
                    <ObtencionUsuarios 
                        usuarioId={(usuarioId) => handleEditar(usuarioId)}
                    />
                </>
            )}
        </>
    );
}

export default Usuarios;