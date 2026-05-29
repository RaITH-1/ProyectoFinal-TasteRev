import { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { themeQuartz } from "ag-grid-community";
import { EliminadoUsuario, listarUsuarios } from "../../utilidades/redux/actions/usuariosAction";

function ObtencionUsuarios({usuarioId}) {
    const dispatch = useDispatch();
    const { usuarios } = useSelector(store => store.usuarios);
    
    const { usuario } = useSelector(store => store.auth);
    
    useEffect(() => {
        dispatch(listarUsuarios());
    }, [dispatch]);

    const handleEliminado = (id) => {
        dispatch(EliminadoUsuario(id)).then(()=>{
            dispatch(listarUsuarios());
        })
    }

    const columnas = [
        { field: "id", headerName: "ID" },
        { field: "nombreUsuario", headerName: "Nombre de Usuario" },
        { field: "correo", headerName: "Correo Electrónico" },
        {
            headerName: "Acciones",
            cellRenderer: ({ data }) => (
                <>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => usuarioId(data.id)}>editar</button>
                    {/* Verificamos que sea el Admin ID 1 */}
                    {Number(usuario?.id) === 1 && (
                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminado(data.id)}>eliminar</button>
                    )}
                </>
            )
        }
    ];
    
    if(!usuarios || usuarios.length === 0)
        return <h1>Cargando usuarios . . .</h1>
    
    return (
        <div className="ag-theme-alpine mt-3" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={usuarios ?? []}
                columnDefs={columnas}
                theme={themeQuartz}
                overlayNoRowsTemplate="No hay usuarios registrados"
            />
        </div>
    );
}

export default ObtencionUsuarios;