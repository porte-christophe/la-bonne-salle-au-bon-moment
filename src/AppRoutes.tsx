//Imports
import { Routes, Route } from "react-router";
import Connexion from "./pages/connexion";
import DashboardAdmin from "./pages/dashboard-admin";
import DashboardFormateur from "./pages/dashboard-formateur";
import Creerutilisateur from "./pages/createUser";

//Composant
function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Connexion/>} />
			<Route path="/dashboardAdmin" element={<DashboardAdmin/>} />
			<Route path="/dashboardFormateur" element={<DashboardFormateur/>} />
			<Route path="/creerutilisateur" element={<Creerutilisateur/>} />
		</Routes>
	);
}

export default AppRoutes;