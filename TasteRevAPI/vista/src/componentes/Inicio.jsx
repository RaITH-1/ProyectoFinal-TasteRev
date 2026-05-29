import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarSeries } from "../utilidades/redux/actions/seriesAction";
import { listarResenas } from "../utilidades/redux/actions/resenasAction";
import { useNavigate } from "react-router-dom";

function Inicio() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { series } = useSelector(store => store.series);
    const { resenas } = useSelector(store => store.resenas);
    const { usuario } = useSelector(store => store.auth);

    useEffect(() => {
        dispatch(listarSeries());
        dispatch(listarResenas());
    }, [dispatch]);

    const verDetalle = (id) => {
        navigate(`/detalle/${id}`);
    }

    const obtenerPromedio = (idSerie) => {
        const resSerie = resenas?.filter(r => r.serieId === idSerie) || [];
        if (resSerie.length === 0) return "--"; // Si no hay reseñas
        const suma = resSerie.reduce((acc, curr) => acc + curr.calificacion, 0);
        return (suma / resSerie.length).toFixed(1);
    }

    return (
        <div className="container-fluid">
            <h2 className="mb-4 fw-bold">
                Recomendaciones para ti, <span className="text-primary">{usuario?.nombreUsuario}</span>
            </h2>
            
            {(!series || series.length === 0) ? (
                <div className="alert alert-secondary">No hay series registradas aún. ¡Ve a la pestaña de Series y agrega algunas!</div>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {series.map(serie => (
                        <div className="col" key={serie.id}>
                            <div 
                                className="card h-100 bg-dark text-white border-secondary shadow-sm"
                                onClick={() => verDetalle(serie.id)}
                                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img 
                                    src={serie.imagenUrl || "https://via.placeholder.com/300x400?text=Sin+Imagen"} 
                                    className="card-img-top" 
                                    alt={serie.titulo}
                                    style={{ aspectRatio: "3/4", objectFit: "cover", width: "100%" }}
                                />
                                
                                <div className="card-body d-flex flex-column p-3">
                                    <h5 className="card-title fw-bold text-truncate mb-3" title={serie.titulo}>
                                        {serie.titulo}
                                    </h5>
                                    
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <span className="badge bg-info text-dark">
                                            {serie.genero || "Sin Género"}
                                        </span>
                                        <span className="badge bg-warning text-dark fs-6">
                                            ⭐ {obtenerPromedio(serie.id)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Inicio;