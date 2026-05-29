import { useState } from "react";
import { GuardarUsuario } from "../../utilidades/redux/actions/usuariosAction";
import { useDispatch } from "react-redux";

function FormularioUsuario({regresar}) {
    const dispatch = useDispatch();
    const [usuario, setUsuario] = useState({
        nombreUsuario: '',
        correo: '',
        passwordHash: ''
    });

    function guardarUsr() {
        dispatch(GuardarUsuario(usuario)).then(() => {
            alert('Usuario guardado correctamente.');
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
            <input type="text" name="nombreUsuario" id="nombreUsuario" onChange={onChange} className="form-control mb-2" />
            
            <label htmlFor="correo">Correo:</label><br />
            <input type="email" name="correo" id="correo" onChange={onChange} className="form-control mb-2" />
            
            <label htmlFor="passwordHash">Contraseña:</label><br />
            <input type="password" name="passwordHash" id="passwordHash" onChange={onChange} className="form-control mb-2" />
            
            <button className="btn btn-primary" onClick={guardarUsr}>Guardar Usuario</button>
        </div>
    )
}
export default FormularioUsuario;