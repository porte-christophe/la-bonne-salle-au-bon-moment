// ---------- Imports --------
import './dashboard-admin.css';
import Button from '../components/button';
import { useEffect, useState } from "react";
import { getSalles } from "../services/salle.service";


type Salle = {
  label: number;
  capacity: string;
  site: string;
  floor: number;
};

function DashboardFormateur() {
  const [salles, setSalles] = useState<Salle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function chargerSalles() {
      try {
        const data = await getSalles();
        setSalles(data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    }

    chargerSalles();
  }, []);

  if (loading) {
    return <p>Chargement des salles...</p>;
  }

  return (
    
    <>
   
    <header>
          <div>
            <Button description='se deconnecter'/>
          </div>
    </header>
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard Formateur
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        Liste des salles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {salles.map((salle) => (
          <div
            key={salle.site}
            className="border-2 border-gray-300 rounded-lg p-5 shadow-md"
          >

            <h3 className="text-xl font-bold mb-3">
              {salle.label}
            </h3>

            <p>
              Numéro : <strong>{salle.floor}</strong>
            </p>

            <p>
              Capacité : <strong>{salle.capacity} personnes</strong>
            </p>

          </div>
        ))}

      </div>

    </div>
    <footer>
          <div>
            <Button description='Selectionner une reservation'/>
            <Button description='Effecuer une reservation'/>
            <Button description='Modifier une reservation'/>
            <Button description='Supprimer une reservation'/>
          </div>
        </footer>
</>
  );
}

export default DashboardFormateur;