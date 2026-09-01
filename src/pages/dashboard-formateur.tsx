import { useEffect, useState } from "react";
import { getSalles } from "../services/salle.service";

type Salle = {
  id: string;
  nom: string;
  numero: string;
  capacite: number;
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
            key={salle.id}
            className="border-2 border-gray-300 rounded-lg p-5 shadow-md"
          >

            <h3 className="text-xl font-bold mb-3">
              {salle.nom}
            </h3>

            <p>
              Numéro : <strong>{salle.numero}</strong>
            </p>

            <p>
              Capacité : <strong>{salle.capacite} personnes</strong>
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default DashboardFormateur;