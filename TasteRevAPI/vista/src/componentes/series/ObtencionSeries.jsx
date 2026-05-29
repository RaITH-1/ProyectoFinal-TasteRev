import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listarSeries, eliminarSerie } from "../../utilidades/redux/actions/seriesAction"; 
import { listarResenas } from "../../utilidades/redux/actions/resenasAction";

function ObtencionSeries({ serieId, verResenas, crearResena }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { series } = useSelector(store => store.series);
    const { resenas } = useSelector(store => store.resenas);
    const { usuario } = useSelector(store => store.auth);
    
    useEffect(() => {
        dispatch(listarSeries());
        dispatch(listarResenas());
    }, [dispatch]);

    const handleEliminado = (id) => {
        dispatch(eliminarSerie(id)).then(()=>{
            dispatch(listarSeries());
        })
    }

    const calcularStats = (idSerie) => {
        const resSerie = resenas?.filter(r => r.serieId === idSerie) || [];
        const cantidad = resSerie.length;
        const promedio = cantidad > 0 
            ? (resSerie.reduce((acc, curr) => acc + curr.calificacion, 0) / cantidad).toFixed(1) 
            : 0;
        return { cantidad, promedio };
    }

    if(!series || series.length === 0)
        return <h4 className="mt-4 text-white">Cargando catálogo...</h4>

    return (
        <div className="mt-4">
            <div className="row g-4">
                {series.map(serie => {
                    const esAdmin = Number(usuario?.id) === 1;
                    const esCreador = Number(serie.usuarioId) === Number(usuario?.id);
                    const tienePermisos = esAdmin || esCreador;
                    const stats = calcularStats(serie.id);

                    return (
                        <div className="col-12 col-xl-10 offset-xl-1" key={serie.id}>
                            <div className="card bg-dark text-white border-secondary shadow-sm overflow-hidden h-100">
                                <div className="row g-0">
                                    
                                    <div 
                                        className="col-12 col-md-4 col-lg-3 bg-black text-center" 
                                        style={{ cursor: 'pointer', borderRight: '1px solid #495057' }} 
                                        onClick={() => navigate(`/detalle/${serie.id}`)}
                                    >
                                        <img 
                                            src={serie.imagenUrl || "https://via.placeholder.com/300x400?text=Sin+Imagen"} 
                                            className="img-fluid w-100 h-100" 
                                            style={{ objectFit: 'cover', minHeight: '250px' }} 
                                            alt={serie.titulo}
                                        />
                                    </div>
                                    
                                    <div className="col-12 col-md-8 col-lg-9">
                                        <div className="card-body d-flex flex-column h-100 p-4">
                                            
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <h3 
                                                        className="card-title fw-bold text-info mb-2" 
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => navigate(`/detalle/${serie.id}`)}
                                                    >
                                                        {serie.titulo}
                                                    </h3>
                                                    <span className="badge bg-secondary text-light px-3 py-2 fs-6">{serie.genero || 'Sin Género'}</span>
                                                </div>
                                                
                                                <div className="text-end text-nowrap ms-3">
                                                    <span className="badge bg-warning text-dark fs-5 mb-1">
                                                        ⭐ {stats.promedio > 0 ? stats.promedio : '--'} / 10
                                                    </span>
                                                    <p className="text-muted small m-0 mt-1">📝 {stats.cantidad} reseñas</p>
                                                </div>
                                            </div>
                                            
                                            <p className="card-text text-light mt-3 fs-5" 
                                               style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                                                {serie.sinopsis}
                                            </p>

                                            <div className="mt-auto pt-3 border-top border-secondary d-flex gap-2 flex-wrap">
                                                <button className="btn btn-success" onClick={(e) => { e.stopPropagation(); crearResena(serie.id); }}>+ Añadir Reseña</button>
                                                
                                                {tienePermisos && (
                                                    <>
                                                        <button className="btn btn-warning" onClick={(e) => { e.stopPropagation(); serieId(serie.id); }}>Editar</button>
                                                        <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); handleEliminado(serie.id); }}>Eliminar</button>
                                                    </>
                                                )}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ObtencionSeries;