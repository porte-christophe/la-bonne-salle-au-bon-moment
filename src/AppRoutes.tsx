//Imports
import { Routes, Route } from "react-router";
import Connexion from "./pages/connexion";
import DashboardAdmin from "./pages/dashboard-admin";
import DashboardFormateur from "./pages/dashboard-formateur";
import CreerSalle from "./pages/creerSalle";
import Agenda from "./pages/agenda"

//Composant
function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Connexion/>} />
			<Route path="/dashboardAdmin" element={<DashboardAdmin/>} />
			<Route path="/dashboardFormateur" element={<DashboardFormateur/>} />
			<Route path="/creerSalle" element={<CreerSalle/>} />
			<Route path="/agenda" element={<Agenda/>}/>
		</Routes>
	);
}

export default AppRoutes;