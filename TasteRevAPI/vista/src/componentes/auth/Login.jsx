import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../utilidades/redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();  
    
    const [logueo, setLogueo] = useState({
        nombreUsuario: '', 
        password: ''  
    });

    function onChange(e){
        const { name , value } = e.target;
        setLogueo( (estado) => ({ ...estado, [name] : value }));
    }

    const handleInicioSesion = async () => {
        const result = await dispatch(login(logueo));

        if (login.fulfilled.match(result)) {
            navigate('/inicio');
        } else {
            alert("Credenciales incorrectas o el servidor no está respondiendo.");
        }
    }

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <h1 className="mb-4 text-center">Iniciar Sesión</h1>
            <div className="mb-3">
                <label htmlFor="nombreUsuario">Nombre de usuario: </label><br/>
                <input 
                    type="text" 
                    onChange={onChange} 
                    name="nombreUsuario" 
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password"> Contraseña: </label><br/>
                <input 
                    type="password" 
                    onChange={onChange} 
                    name="password" 
                    className="form-control"
                />
            </div>
            <div className="d-grid mt-4">
                <button onClick={handleInicioSesion} className="btn btn-success">
                    Entrar al Sistema
                </button>
            </div>
        </Container>
    )
} 

export default Login;