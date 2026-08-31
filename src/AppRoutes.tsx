//Imports
import { Routes, Route } from "react-router";
import Connexion from "./pages/connexion";
import DashboardAdmin from "./pages/dashboard-admin";
import DashboardFormateur from "./pages/dashboard-formateur";
import CreateUserForm from "./pages/createUser";
import CreerSalle from "./pages/creerSalle";

//Composant
function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Connexion/>} />
			<Route path="/dashboardAdmin" element={<DashboardAdmin/>} />
			<Route path="/dashboardFormateur" element={<DashboardFormateur/>} />
			<Route path="/createUserForm" element={<CreateUserForm/>} />
			<Route path="/creerSalle" element={<CreerSalle/>} />
		</Routes>
	);
}

export default AppRoutes;