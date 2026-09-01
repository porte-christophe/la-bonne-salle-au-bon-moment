// ---------- Imports --------
import './dashboard-admin.css';
import Button from '../components/button';
import Salle from '../components/salle';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3001';

interface SalleData {
  id: string;
  label: string;
  nom: string;
  capacity: number;
  site: string;
  building: string;
  floor: number;
  material: string[];
}

//--------- Component ---------
function DashboardAdmin(){
  const navigate = useNavigate();
   const [salles, setSalles] = useState<SalleData[]>([]);

   useEffect(() => {
    fetch(`${API_URL}/salles`)
      .then((res) => res.json())
      .then((data) => setSalles(data))
      .catch((err) => console.error('Erreur lors du chargement des salles', err));
  }, []);
  
    return (
      <>  
        <header>
          <div>
            <Button description='se deconnecter'/>
          </div>
        </header>
        <main>
        <div className='grid'>
          {salles.map((salle, index) => (
            <div key={salle.id} className={`div${index + 1}`}>
              <Salle nom={salle.nom} numero={Number(salle.label)} />
            </div>
          ))}
        </div>
      </main>
        <footer>
          <div>
            <Button description='ajouter une salle' onClick={() => navigate('/CreerSalle')}/>
            <Button description='créer un compte' onClick={() => navigate('/CreateUserForm')}/>
            <Button description='ajouter une reservation' onClick={() => navigate('/creerReservation')}/>
            <Button description='modifier une reservation'/>
            <Button description='supprimer une reservation' onClick={() => navigate('/listeReservations')}/>
          </div>
        </footer>
      </>
    )

}

export default DashboardAdmin;

