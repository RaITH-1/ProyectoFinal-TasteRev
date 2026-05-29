import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../utilidades/redux/actions/authAction";
import { GuardarUsuario } from "../../utilidades/redux/actions/usuariosAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();  
    
    const [esRegistro, setEsRegistro] = useState(false);

    const [logueo, setLogueo] = useState({
        nombreUsuario: '',
        correo: '', 
        password: ''  
    });

    function onChange(e){
        const { name , value } = e.target;
        setLogueo( (estado) => ({ ...estado, [name] : value }));
    }

    const handleSubmit = async () => {
        if (esRegistro) {
            // Lógica de Registro
            const nuevoUsuario = {
                nombreUsuario: logueo.nombreUsuario,
                correo: logueo.correo,
                passwordHash: logueo.password
            };
            
            dispatch(GuardarUsuario(nuevoUsuario)).then(() => {
                alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
                setEsRegistro(false);
            }).catch(() => {
                alert("Hubo un error al registrar el usuario.");
            });
            
        } else {
            // Lógica de Inicio de Sesión
            const result = await dispatch(login({
                nombreUsuario: logueo.nombreUsuario,
                password: logueo.password
            }));

            if (login.fulfilled.match(result)) {
                navigate('/inicio');
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        }
    }

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <h1 className="mb-4 text-center">{esRegistro ? "Crear Cuenta" : "Iniciar Sesión"}</h1>
            
            <div className="mb-3">
                <label htmlFor="nombreUsuario">Nombre de usuario: </label><br/>
                <input type="text" onChange={onChange} name="nombreUsuario" className="form-control" />
            </div>
            
            {/* Solo mostramos el correo si estamos en modo registro */}
            {esRegistro && (
                <div className="mb-3">
                    <label htmlFor="correo">Correo electrónico: </label><br/>
                    <input type="email" onChange={onChange} name="correo" className="form-control" />
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="password"> Contraseña: </label><br/>
                <input type="password" onChange={onChange} name="password" className="form-control" />
            </div>
            
            <div className="d-grid mt-4">
                <button onClick={handleSubmit} className="btn btn-success">
                    {esRegistro ? "Registrarse" : "Entrar al Sistema"}
                </button>
            </div>

            <div className="text-center mt-3">
                <button className="btn btn-link" onClick={() => setEsRegistro(!esRegistro)}>
                    {esRegistro ? "¿Ya tienes cuenta? Inicia sesión aquí" : "¿No tienes cuenta? Regístrate aquí"}
                </button>
            </div>
        </Container>
    )
}

export default Login;