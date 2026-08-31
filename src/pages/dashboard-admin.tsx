// ---------- Imports --------
import './dashboard-admin.css';
import Button from '../components/button';
import Salle from '../components/salle';

//--------- Component ---------
function DashboardAdmin(){
    return (
      <>  

      <header>
        <div><button>Se deconnecter</button></div>
      </header>
      <main>
        <div className='grid'>
          <Salle nom="Salle Informatique" numero={101} />

          <Salle nom="Salle de Réunion" numero={102} />

          <Salle nom="Salle de Formation" numero={103} />
        </div>
      </main>
      <footer>
        <div>
          <button>Ajouter une salle</button>
          <button>Ajouter un formateur</button>
          <button>Ajouter une reservation</button>
          <button>Supprimer une reservation</button>
          </div>
      </footer>
      </>
    )

}

export default DashboardAdmin;

