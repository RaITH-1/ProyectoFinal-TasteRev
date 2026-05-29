import { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { themeQuartz } from "ag-grid-community";
import { listarResenas, eliminarResena } from "../../utilidades/redux/actions/resenasAction"; 

function ObtencionResenas({ resenaId }) {
    const dispatch = useDispatch();
    const { resenas } = useSelector(store => store.resenas);
    // Obtenemos al usuario logueado desde Redux
    const { usuario } = useSelector(store => store.auth); 
    
    useEffect(() => {
        dispatch(listarResenas());
    }, [dispatch]);

    const handleEliminado = (id) => {
        dispatch(eliminarResena(id)).then(() => dispatch(listarResenas()));
    }

    // FILTRO: Solo dejamos las reseñas que coincidan con el ID del usuario logueado
    const misResenas = resenas ? resenas.filter(r => r.usuarioId === usuario?.id) : [];

    const columnas = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "calificacion", headerName: "Calificación", width: 120 },
        { field: "comentario", headerName: "Comentario", flex: 2 },
        { field: "serieId", headerName: "ID Serie", width: 120 },
        {
            headerName: "Acciones",
            cellRenderer: ({ data }) => (
                <>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => resenaId(data.id)}>editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminado(data.id)}>eliminar</button>
                </>
            )
        }
    ];
    
    return (
        <div className="ag-theme-alpine mt-3" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={misResenas} // Inyectamos la lista filtrada
                columnDefs={columnas}
                theme={themeQuartz}
                overlayNoRowsTemplate="No tienes reseñas registradas aún"
            />
        </div>
    );
}

export default ObtencionResenas;