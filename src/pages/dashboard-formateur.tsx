// ---------- Imports --------
import './dashboard-formateur.css'
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

      <h1>
        Dashboard Formateur
      </h1>
    
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

  {salles.map((salle) => (
    <div
      key={salle.label}
      className="salle-card"
    >

      <h3 className="salle-title">
        {salle.label}
      </h3>

      <p className="salle-info">
        Numéro : <strong>{salle.floor}</strong>
      </p>

      <p className="salle-info">
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