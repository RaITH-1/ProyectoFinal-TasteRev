import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listarResenas, eliminarResena } from "../../utilidades/redux/actions/resenasAction";
import { listarSeries } from "../../utilidades/redux/actions/seriesAction";
import { listarUsuarios } from "../../utilidades/redux/actions/usuariosAction";
import ModificarResenaFormulario from "../resenas/ModificarResena";

function Perfil() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [resenaIdEdit, setResenaIdEdit] = useState(0);

    const { usuarios } = useSelector(store => store.usuarios);
    const { resenas } = useSelector(store => store.resenas);
    const { series } = useSelector(store => store.series);
    const { usuario: usuarioActual } = useSelector(store => store.auth);

    useEffect(() => {
        dispatch(listarUsuarios());
        dispatch(listarResenas());
        dispatch(listarSeries());
    }, [dispatch]);

    const perfilUsuario = usuarios?.find(u => u.id === Number(id));
    const resenasUsuario = resenas?.filter(r => r.usuarioId === Number(id)) || [];
    
    const esMiPerfil = usuarioActual?.id === Number(id);

    const handleEliminar = (idResena) => {
        if(window.confirm("¿Seguro que deseas borrar esta reseña?")) {
            dispatch(eliminarResena(idResena)).then(() => dispatch(listarResenas()));
        }
    }

    const handleCambiarFoto = () => {
        const nuevaFoto = window.prompt("Pega el enlace (URL) de tu nueva foto de perfil:");
        if (nuevaFoto) {
            alert(`La URL capturada es: ${nuevaFoto}\nAsegúrate de tener un endpoint en tu backend para guardar este cambio.`);
        }
    }

    if (!perfilUsuario) return <h2 className="text-center text-white mt-5">Cargando perfil...</h2>;

    if (resenaIdEdit > 0) {
        return (
            <div className="container mt-4 text-white">
                <h2>Modificar Reseña</h2>
                <button className="btn btn-secondary mb-3" onClick={() => setResenaIdEdit(0)}>⬅ Cancelar y volver al perfil</button>
                <ModificarResenaFormulario regresar={() => setResenaIdEdit(0)} resenaId={resenaIdEdit} />
            </div>
        )
    }

    return (
        <div className="container mt-4 text-white">
            <div className="row g-4">
                
                {/* Tarjeta de Perfil*/}
                <div className="col-12 col-md-4 col-lg-3 text-center">
                    <div className="card bg-dark border-secondary shadow-sm p-4">
                        <img 
                            src={perfilUsuario.fotoPerfilUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                            alt="Perfil" 
                            className="rounded-circle img-fluid border border-secondary shadow mx-auto mb-3"
                            style={{ width: "160px", height: "160px", objectFit: "cover" }}
                        />
                        <h3 className="fw-bold text-info mb-1">{perfilUsuario.nombreUsuario}</h3>
                        <p className="text-muted small">📝 {resenasUsuario.length} reseñas publicadas</p>
                        
                        {esMiPerfil && (
                            <button className="btn btn-outline-light btn-sm mt-3 w-100" onClick={handleCambiarFoto}>
                                📷 Cambiar Foto
                            </button>
                        )}
                    </div>
                </div>

                {/*Lista de Reseñas*/}
                <div className="col-12 col-md-8 col-lg-9">
                    <h3 className="mb-4 border-bottom border-secondary pb-2">
                        {esMiPerfil ? "Mis Reseñas" : `Reseñas de ${perfilUsuario.nombreUsuario}`}
                    </h3>

                    {resenasUsuario.length === 0 ? (
                        <div className="alert alert-dark text-light border-secondary">
                            {esMiPerfil ? "No has escrito ninguna reseña aún. ¡Explora el catálogo!" : "Este usuario no tiene reseñas públicas."}
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {resenasUsuario.map(r => {
                                const serieInfo = series?.find(s => s.id === r.serieId);

                                return (
                                    <div key={r.id} className="card bg-dark text-white border-secondary shadow-sm overflow-hidden">
                                        <div className="row g-0">
                                            {/*Imagen de la Serie*/}
                                            <div 
                                                className="col-4 col-sm-3 col-md-3 bg-black text-center" 
                                                style={{ cursor: 'pointer', borderRight: '1px solid #495057' }}
                                                onClick={() => navigate(`/detalle/${serieInfo?.id}`)}
                                            >
                                                <img 
                                                    src={serieInfo?.imagenUrl || "https://via.placeholder.com/150"} 
                                                    alt={serieInfo?.titulo}
                                                    className="img-fluid w-100 h-100"
                                                    style={{ objectFit: 'cover', minHeight: '120px' }}
                                                />
                                            </div>
                                            
                                            {/*Contenido de la Reseña*/}
                                            <div className="col-8 col-sm-9 col-md-9">
                                                <div className="card-body d-flex flex-column h-100 p-3">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <h5 
                                                            className="mb-0 text-info fw-bold" 
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => navigate(`/detalle/${serieInfo?.id}`)}
                                                        >
                                                            {serieInfo?.titulo || 'Serie Eliminada'}
                                                        </h5>
                                                        <span className="badge bg-warning text-dark fs-6">⭐ {r.calificacion}/10</span>
                                                    </div>
                                                    
                                                    <p className="card-text text-light flex-grow-1 fs-6">{r.comentario}</p>

                                                    {/* Botones de acción (Solo visibles si es mi perfil) */}
                                                    {esMiPerfil && (
                                                        <div className="mt-2 text-end border-top border-secondary pt-2">
                                                            <button className="btn btn-warning btn-sm me-2" onClick={() => setResenaIdEdit(r.id)}>Editar</button>
                                                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(r.id)}>Borrar</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Perfil;