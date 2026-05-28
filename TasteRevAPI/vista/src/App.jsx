import { BrowserRouter, Route, Routes } from 'react-router-dom'  // ← BrowserRouter
import './App.css'
import ComponenteContador from './ComponenteContador'
import ComponenteInput from './ComponenteInput'
import Usuarios from './componentes/usuarios'
import { PrivateRoute } from './componentes/PrivateRoutes'
import Login from './componentes/auth/Login'

function App() {
  return (
    <BrowserRouter>       
      <Routes>            {/* ← necesario en v6 */}
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App