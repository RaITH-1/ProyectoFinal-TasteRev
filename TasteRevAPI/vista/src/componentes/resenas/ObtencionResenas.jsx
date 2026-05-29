import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarResenas, eliminarResena } from "../../utilidades/redux/actions/resenasAction";
import { listarSeries } from "../../utilidades/redux/actions/seriesAction"; 
import { useNavigate } from "react-router-dom";

function ObtencionResenas({ resenaId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { resenas } = useSelector(store => store.resenas);
    const { series } = useSelector(store => store.series);
    const { usuario } = useSelector(store => store.auth);

    useEffect(() => {
        dispatch(listarResenas());
        dispatch(listarSeries());
    }, [dispatch]);

    const handleEliminado = (id) => {
        dispatch(eliminarResena(id)).then(() => {
            dispatch(listarResenas());
        });
    }

    const misResenas = resenas?.filter(r => r.usuarioId === usuario?.id) || [];

    if (!misResenas || misResenas.length === 0)
        return <div className="alert alert-dark border-secondary text-light mt-4">Aún no has escrito ninguna reseña. ¡Anímate a calificar una serie!</div>;

    return (
        <div className="mt-4">
            <div className="row g-4">
                {misResenas.map(r => {
                    const serieInfo = series?.find(s => s.id === r.serieId);

                    return (
                        <div className="col-12 col-md-6" key={r.id}>
                            <div className="card bg-dark text-light border-secondary shadow-sm h-100">
                                <div className="card-header border-secondary d-flex justify-content-between align-items-center">
                                    <h5 
                                        className="mb-0 text-info fw-bold text-truncate" 
                                        style={{ cursor: 'pointer', maxWidth: '75%' }} 
                                        onClick={() => navigate(`/detalle/${r.serieId}`)}
                                        title={serieInfo?.titulo}
                                    >
                                        📺 {serieInfo?.titulo || 'Serie Desconocida'}
                                    </h5>
                                    <span className="badge bg-warning text-dark fs-6">⭐ {r.calificacion}/10</span>
                                </div>
                                
                                <div className="card-body">
                                    <p className="card-text mb-0 fs-5">{r.comentario}</p>
                                </div>
                                
                                <div className="card-footer border-secondary text-end pb-3">
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => resenaId(r.id)}>Editar</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminado(r.id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ObtencionResenas;