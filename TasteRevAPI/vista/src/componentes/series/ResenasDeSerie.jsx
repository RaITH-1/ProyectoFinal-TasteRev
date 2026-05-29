import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarResenas } from "../../utilidades/redux/actions/resenasAction";

function ResenasDeSerie({ serieId, regresar }) {
    const dispatch = useDispatch();
    const { resenas } = useSelector(store => store.resenas);
    
    useEffect(() => {
        dispatch(listarResenas());
    }, [dispatch]);

    const resenasSerie = resenas ? resenas.filter(r => r.serieId === serieId) : [];

    return (
        <div className="mt-4">
            <h2 className="mb-3">Reseñas de la Comunidad</h2>
            <button className="btn btn-secondary mb-4" onClick={regresar}>⬅ Regresar al Catálogo</button>
            
            {resenasSerie.length === 0 ? (
                <div className="alert alert-info">Aún no hay reseñas registradas para esta serie. ¡Sé el primero en calificarla!</div>
            ) : (
                <div className="list-group">
                    {resenasSerie.map(r => (
                        <div key={r.id} className="list-group-item list-group-item-action flex-column align-items-start mb-2 shadow-sm border-0 bg-light">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 text-primary">⭐ {r.calificacion}/10</h5>
                                <small className="text-muted">ID del Crítico: {r.usuarioId}</small>
                            </div>
                            <p className="mb-1 mt-2">{r.comentario}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default ResenasDeSerie;