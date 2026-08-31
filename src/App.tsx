// Imports
import './App.css';
import Connexion from './pages/connexion';
import { BrowserRouter, Routes, Route } from "react-router";
import DashboardAdmin from './pages/dashboard-admin';

// Compoment
function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<DashboardAdmin />} />
        </Routes>
      </BrowserRouter>
      {/* <Connexion /> */}
    </>
  )
}

export default App
