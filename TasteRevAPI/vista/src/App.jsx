import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Login from './componentes/auth/Login';
import { PrivateRoute } from './componentes/PrivateRoutes';
import Usuarios from './componentes/usuarios';
import Layout from './componentes/navegacion/Layout';
import Series from './componentes/series'; 
import Resenas from './componentes/resenas';
import Inicio from './componentes/Inicio';
import DetalleSerie from './componentes/series/DetalleSerie';

function App() {
  return (
    <BrowserRouter>       
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/series" element={<Series />} />
          <Route path="/resenas" element={<Resenas />} />
          
          <Route path="/detalle/:id" element={<DetalleSerie />} />
          <Route path="/" element={<Navigate to="/inicio" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;