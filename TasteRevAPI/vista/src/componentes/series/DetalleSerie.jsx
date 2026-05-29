import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listarSeries } from "../../utilidades/redux/actions/seriesAction";
import { listarResenas } from "../../utilidades/redux/actions/resenasAction";

function DetalleSerie() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { series } = useSelector(store => store.series);
    const { resenas } = useSelector(store => store.resenas);

    useEffect(() => {
        dispatch(listarSeries());
        dispatch(listarResenas());
    }, [dispatch]);


    const serie = series?.find(s => s.id === Number(id));
    const resenasSerie = resenas?.filter(r => r.serieId === Number(id)) || [];

    const promedio = resenasSerie.length > 0 
        ? (resenasSerie.reduce((acc, curr) => acc + curr.calificacion, 0) / resenasSerie.length).toFixed(1)
        : "Sin calificaciones";

    if (!serie) return <h2 className="text-center mt-5 text-white">Cargando serie...</h2>;

    return (
        <div className="container mt-4 text-white">
            <button className="btn btn-outline-light mb-4" onClick={() => navigate(-1)}>⬅ Volver</button>
            
            <div className="row">
                {/* COLUMNA IZQUIERDA: Portada */}
                <div className="col-md-4 mb-4">
                    <img 
                        src={serie.imagenUrl || "https://via.placeholder.com/300x400?text=Sin+Imagen"} 
                        alt={serie.titulo} 
                        className="img-fluid rounded shadow-lg w-100"
                        style={{objectFit: 'cover', maxHeight: '550px'}}
                    />
                </div>
                
                {/* COLUMNA DERECHA: Información y Reseñas */}
                <div className="col-md-8">
                    <h1 className="fw-bold display-5">{serie.titulo}</h1>
                    
                    <div className="d-flex flex-wrap gap-3 my-3">
                        <span className="badge bg-info text-dark fs-6 px-3 py-2">{serie.genero || "Sin Género"}</span>
                        <span className="badge bg-warning text-dark fs-6 px-3 py-2">⭐ Promedio: {promedio} / 10</span>
                    </div>
                    
                    <h4 className="mt-4 border-bottom border-secondary pb-2">Sinopsis</h4>
                    <p className="fs-5" style={{ lineHeight: '1.6' }}>{serie.sinopsis}</p>

                    <h4 className="mt-5 border-bottom border-secondary pb-2">
                        Reseñas de la Comunidad ({resenasSerie.length})
                    </h4>
                    
                    {resenasSerie.length === 0 ? (
                        <div className="alert alert-dark mt-3 border-secondary text-light">
                            Nadie ha reseñado esta serie todavía. ¡Sé el primero yendo al Catálogo de Series!
                        </div>
                    ) : (
                        <div className="list-group mt-3">
                            {resenasSerie.map(r => (
                                <div key={r.id} className="list-group-item bg-dark text-white border-secondary mb-2 rounded shadow-sm">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="text-warning m-0 fw-bold">⭐ {r.calificacion}/10</h5>
                                        <small className="text-muted">ID de Usuario: {r.usuarioId}</small>
                                    </div>
                                    <p className="mb-0 fs-6">{r.comentario}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetalleSerie;