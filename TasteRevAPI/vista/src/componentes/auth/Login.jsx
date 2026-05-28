import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../utilidades/redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()  
    const [logueo, setLogueo] = useState({
        nombreUsuario: '',
        contraseña: ''
    });

    function onChange(e){
        const { name , value } = e.target;

        setLogueo( (estado) => ({
            ...estado,
            [name] : value
        })) 
    }

    const handleInicioSesion = async () => {
        const result = await dispatch(login(logueo))

        if (login.fulfilled.match(result)) {
            navigate('/usuarios');
        }
    }

    return (
        <Container>
            <h1>Log in</h1>
            <div>
                <label htmlFor="nombreUsuario">Nombre de usuario: </label><br/>
                <input type="text" onChange={onChange} name="nombreUsuario"/>
            </div>
            <div>
                <label htmlFor="contraseña"> Contraseña: </label><br/>
                <input type="password" onChange={onChange} name="contraseña"/>
            </div>
            <div style={{padding: "10px"}}>
                <button onClick={handleInicioSesion} className="btn btn-success">Iniciar sesion</button>
            </div>
        </Container>
    )
} 

export default Login;