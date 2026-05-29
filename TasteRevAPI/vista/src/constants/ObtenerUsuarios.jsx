import axios from "axios"

function ObtenerUsuario(){
    const [usuario, setUsuario] = useState({});
    function Click(){
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            setUsuario(response.data.find(x => x.name == 'Glenna Reichert'));
        });
    }
    return (
        <>
            <button onClick={Click()}>Aplastame paro</button>
            <p>Nombre : {usuario.name}</p>
            <p>Nombre de usuario : {usuario.username}</p>
            <p>Correo : {usuario.email}</p>
        </>
    );
}

export default ObtenerUsuario

/*
TAREA 
Instalar una libreria para hacer tablas de datos
Realizar un componente con la aplicacion de la libreria de tablas
utilizando la informacion de la url de usuarios utilizada en clase
*/