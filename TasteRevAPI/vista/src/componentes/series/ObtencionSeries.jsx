import { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { themeQuartz } from "ag-grid-community";
import { listarSeries, eliminarSerie } from "../../utilidades/redux/actions/seriesAction"; 

function ObtencionSeries({serieId, verResenas, crearResena}) {
    const dispatch = useDispatch();
    const { series } = useSelector(store => store.series);
    const { usuario } = useSelector(store => store.auth);
    
    useEffect(() => {
        dispatch(listarSeries());
    }, [dispatch]);

    const handleEliminado = (id) => {
        dispatch(eliminarSerie(id)).then(() => {
            dispatch(listarSeries());
        })
    }

    const columnas = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "titulo", headerName: "Título", flex: 1 },
        { field: "sinopsis", headerName: "Sinopsis", flex: 2 },
        { 
            field: "imagenUrl", 
            headerName: "Portada", 
            width: 120,
            cellRenderer: ({ value }) => (
                value 
                ? <img src={value} alt="Portada" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} /> 
                : "Sin imagen"
            )
        },
        {
            headerName: "Acciones",
            width: 320,
            cellRenderer: ({ data }) => {
                const esAdmin = usuario?.id === 1;
                const esCreador = data.usuarioId === usuario?.id;
                const puedeEditar = esAdmin || esCreador;

                return (
                    <>
                        <button className="btn btn-success btn-sm me-2" onClick={() => crearResena(data.id)}>+ Reseña</button>
                        <button className="btn btn-info btn-sm me-2 text-white" onClick={() => verResenas(data.id)}>Ver críticas</button>
                        
                        {puedeEditar && (
                            <button className="btn btn-warning btn-sm me-2" onClick={() => serieId(data.id)}>editar</button>
                        )}
                        {esAdmin && (
                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminado(data.id)}>eliminar</button>
                        )}
                    </>
                )
            }
        }
    ];
    
    if(!series || series.length === 0)
        return <h1>Cargando series . . .</h1>
    
    return (
        <div className="ag-theme-alpine mt-3" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={series ?? []}
                columnDefs={columnas}
                theme={themeQuartz}
                rowHeight={80}
                overlayNoRowsTemplate="No hay series registradas"
            />
        </div>
    );
}

export default ObtencionSeries;