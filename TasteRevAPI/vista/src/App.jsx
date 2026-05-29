import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Login from './componentes/auth/Login';
import { PrivateRoute } from './componentes/PrivateRoutes';
import Usuarios from './componentes/usuarios';

import Series from './componentes/series'; 
import Resenas from './componentes/resenas';
import Inicio from './componentes/Inicio';

function App() {
  return (
    <BrowserRouter>       
      <Routes>
        <Route path="/login" element={<Login />} /> 
        
        <Route element={<PrivateRoute />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/series" element={<Series />} />
          <Route path="/resenas" element={<Resenas />} />
          
          <Route path="/" element={<Navigate to="/inicio" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;