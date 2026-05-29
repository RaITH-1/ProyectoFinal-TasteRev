import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarResenas } from "../../utilidades/redux/actions/resenasAction";
import { listarUsuarios } from "../../utilidades/redux/actions/usuariosAction";

function ResenasDeSerie({ serieId, regresar }) {
    const dispatch = useDispatch();
    const { resenas } = useSelector(store => store.resenas);
    const { usuarios } = useSelector(store => store.usuarios);
    
    useEffect(() => {
        dispatch(listarResenas());
        dispatch(listarUsuarios());
    }, [dispatch]);

    const resenasSerie = resenas ? resenas.filter(r => r.serieId === serieId) : [];

    return (
        <div className="mt-4 text-white">
            <h2 className="mb-3 fw-bold">Reseñas de la Comunidad</h2>
            <button className="btn btn-outline-light mb-4" onClick={regresar}>⬅ Volver al Catálogo</button>
            
            {resenasSerie.length === 0 ? (
                <div className="alert alert-dark border-secondary text-light">Aún no hay reseñas registradas para esta serie. ¡Sé el primero en calificarla!</div>
            ) : (
                <div className="list-group">
                    {resenasSerie.map(r => (
                        <div key={r.id} className="list-group-item bg-dark text-white border-secondary mb-2 rounded shadow-sm">
                            <div className="d-flex w-100 justify-content-between align-items-center mb-2">
                                <h5 className="mb-1 text-warning fw-bold">⭐ {r.calificacion}/10</h5>
                                
                                {/* Mostrar Nombre en lugar de ID */}
                                <small className="text-muted">
                                    Por: <span 
                                            className="text-info fw-bold" 
                                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                            onClick={() => navigate(`/perfil/${r.usuarioId}`)}
                                        >
                                        {usuarios?.find(u => u.id === r.usuarioId)?.nombreUsuario || `Usuario Desconocido`}
                                    </span>
                                </small>

                            </div>
                            <p className="mb-1 mt-2 fs-6">{r.comentario}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default ResenasDeSerie;