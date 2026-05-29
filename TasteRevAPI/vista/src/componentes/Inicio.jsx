import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarSeries } from "../utilidades/redux/actions/seriesAction";
import { useNavigate } from "react-router-dom";

function Inicio() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { series } = useSelector(store => store.series);
    const { usuario } = useSelector(store => store.auth);

    useEffect(() => {
        dispatch(listarSeries());
    }, [dispatch]);

    const verDetalle = (id) => {
        navigate(`/detalle/${id}`);
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
                                    style={{ height: "350px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold text-truncate" title={serie.titulo}>{serie.titulo}</h5>
                                    <span className="badge bg-info text-dark mt-auto align-self-start">
                                        {serie.genero || "Sin Género"}
                                    </span>
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