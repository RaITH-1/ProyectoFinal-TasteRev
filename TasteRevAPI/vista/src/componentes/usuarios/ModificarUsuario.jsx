import { useState } from "react";
import { ModificarUsuario } from "../../utilidades/redux/actions/usuariosAction";
import { useDispatch, useSelector } from "react-redux";

function ModificarUsuarioFormulario({ regresar, usuarioId }) {
    const dispatch = useDispatch();
    const { usuarios } = useSelector(store => store.usuarios);
    const usr = usuarios.find(x => x.id == usuarioId);

    const [usuario, setUsuario] = useState({
        id: usr.id,
        nombreUsuario: usr.nombreUsuario,
        correo: usr.correo,
        passwordHash: ''
    });

    function guardarUsr() {
        dispatch(ModificarUsuario(usuario)).then(() => {
            alert('Cambios guardados correctamente.');
            regresar();
        });
    }

    function onChange(e) {
        const { name, value } = e.target;
        setUsuario((estado) => ({ ...estado, [name]: value }));
    }

    return (
        <div className="mt-3">
            <label htmlFor="nombreUsuario">Nombre de Usuario:</label><br />
            <input type="text" name="nombreUsuario" id="nombreUsuario" onChange={onChange} value={usuario.nombreUsuario} className="form-control mb-2" />
            
            <label htmlFor="correo">Correo:</label><br />
            <input type="email" name="correo" id="correo" onChange={onChange} value={usuario.correo} className="form-control mb-2" />
            
            <label htmlFor="passwordHash">Nueva Contraseña:</label><br />
            <input type="password" name="passwordHash" id="passwordHash" onChange={onChange} className="form-control mb-2" />
            
            <button className="btn btn-success" onClick={guardarUsr}>Actualizar Cambios</button>
        </div>
    )
}
export default ModificarUsuarioFormulario;