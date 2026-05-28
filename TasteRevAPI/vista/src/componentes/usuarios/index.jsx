import { useState } from "react";
import ObtencionUsuarios from "./ObtencionUsuarios";
import ModificarUsuarioFormulario from "./ModificarUsuario";
import { Button } from "react-bootstrap";
import { logout } from "../../utilidades/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormularioUsuario from "./GuardarUsuario";

function Usuarios() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [verFormulario, setFormulario] = useState(false);
    const [usuarioId, setUsuarioId] = useState(0);

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
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            <button style={{color: "red"}} onClick={handleCerrarSesion}>Cerrar Sesion</button>
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