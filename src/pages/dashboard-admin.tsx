// ---------- Imports --------
import './dashboard-admin.css';
import Button from '../components/button';

//--------- Component ---------
function DashboardAdmin(){
    return (
      <>  

      <header>
        <div><button>Se deconnecter</button></div>
      </header>
      <main>
        <div className='grid'></div>
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

