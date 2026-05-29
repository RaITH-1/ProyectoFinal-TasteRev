import { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { themeQuartz } from "ag-grid-community";
import { listarSeries, eliminarSerie } from "../../utilidades/redux/actions/seriesAction"; 

function ObtencionSeries({ serieId, verResenas }) {
    const dispatch = useDispatch();
    const { series } = useSelector(store => store.series);
    
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
            headerName: "Imagen", 
            flex: 1,
            cellRenderer: ({ value }) => (
                value ? <a href={value} target="_blank" rel="noreferrer">Ver imagen</a> : "Sin imagen"
            )
        },
        {
            headerName: "Acciones",
            width: 250,
            cellRenderer: ({ data }) => (
                <>
                    <button className="btn btn-info btn-sm me-2 text-white" onClick={() => verResenas(data.id)}>Ver reseñas</button>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => serieId(data.id)}>editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminado(data.id)}>eliminar</button>
                </>
            )
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
                overlayNoRowsTemplate="No hay series registradas"
            />
        </div>
    );
}

export default ObtencionSeries;