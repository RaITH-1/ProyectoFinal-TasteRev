import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../utilidades/redux/slices/authSlice";

function Inicio() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCerrarSesion = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className="container mt-5 text-center">
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-danger" onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </div>
            
            <h1 className="mb-4">Bienvenido a TasteRev</h1>
            <p className="lead mb-5">Selecciona el catálogo que deseas administrar:</p>
            
            <div className="row justify-content-center gap-3">
                {/* Tarjeta de Usuarios */}
                <div className="col-md-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">👥 Usuarios</h5>
                            <p className="card-text flex-grow-1">Gestiona los accesos, correos y cuentas del sistema.</p>
                            <button className="btn btn-primary w-100 mt-auto" onClick={() => navigate('/usuarios')}>Ir a Usuarios</button>
                        </div>
                    </div>
                </div>
                
                {/* Tarjeta de Series */}
                <div className="col-md-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">📺 Series</h5>
                            <p className="card-text flex-grow-1">Administra el catálogo de series, portadas y sinopsis.</p>
                            <button className="btn btn-success w-100 mt-auto" onClick={() => navigate('/series')}>Ir a Series</button>
                        </div>
                    </div>
                </div>

                {/* Tarjeta de Reseñas */}
                <div className="col-md-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">⭐ Reseñas</h5>
                            <p className="card-text flex-grow-1">Modera las calificaciones y opiniones de la comunidad.</p>
                            <button className="btn btn-warning w-100 mt-auto" onClick={() => navigate('/resenas')}>Ir a Reseñas</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inicio;