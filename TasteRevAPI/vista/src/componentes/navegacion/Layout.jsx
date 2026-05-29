import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../utilidades/redux/slices/authSlice';

function Layout() {
    const [menuAbierto, setMenuAbierto] = useState(true);
    const { usuario } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const esAdmin = Number(usuario?.id) === 1;

    const handleCerrarSesion = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className="d-flex" style={{ minHeight: '100vh', width: '100vw' }}>
            {/*MENÚ LATERAL (SIDEBAR)*/}
            <div 
                className="bg-black border-end border-secondary d-flex flex-column transition-all flex-shrink-0"
                style={{ 
                    width: menuAbierto ? '250px' : '70px', 
                    transition: 'width 0.3s ease',
                    position: 'relative'
                }}
            >
                {/* Cabecera del menú con el botón de hamburguesa */}
                <div className="p-3 d-flex justify-content-between align-items-center border-bottom border-secondary">
                    {menuAbierto && <h5 className="m-0 text-white fw-bold">TasteRev</h5>}
                    <button 
                        className="btn btn-outline-secondary btn-sm border-0 fs-5" 
                        onClick={() => setMenuAbierto(!menuAbierto)}
                    >
                        ☰
                    </button>
                </div>

                {/* Botones de navegación */}
                <div className="d-flex flex-column p-2 mt-3 gap-2">
                    <Link to="/inicio" className="btn btn-dark text-start border-0">
                        🏠 {menuAbierto && 'Recomendaciones'}
                    </Link>
                    
                    <Link to="/series" className="btn btn-dark text-start border-0">
                        📺 {menuAbierto && 'Catálogo de Series'}
                    </Link>
                    
                    <Link to={`/perfil/${usuario?.id}`} className="btn btn-dark text-start border-0 fs-5 d-flex align-items-center gap-3" title="Mi Perfil">
                        👤 {menuAbierto && <span>Mi Perfil</span>}
                    </Link>

                    {esAdmin && (
                        <Link to="/usuarios" className="btn btn-outline-primary text-start mt-4">
                            👥 {menuAbierto && 'Usuarios (Admin)'}
                        </Link>
                    )}
                </div>

                {/* Botón de cerrar sesión abajo */}
                <div className="mt-auto p-3 border-top border-secondary">
                    <button className="btn btn-danger w-100 text-start" onClick={handleCerrarSesion}>
                        🚪 {menuAbierto && 'Cerrar Sesión'}
                    </button>
                </div>
            </div>

            {/*CONTENIDO PRINCIPAL*/}
            <div className="flex-grow-1 bg-dark text-white p-4" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                <Outlet /> 
            </div>
        </div>
    );
}

export default Layout;