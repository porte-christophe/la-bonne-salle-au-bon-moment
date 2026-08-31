// ---------- Imports --------
import './dashboard-formateur.css';
import Salle from "../components/salle";

//--------- Component ---------
function DashboardFormateur(){
    return (
      <>  <header>
            <div><button>Se deconnecter</button></div>
        </header>
        <main>
            <div className='grid'>
                <div className="div1">
                    <Salle nom="Salle Informatique" numero={101}/>
                </div>
                <div className="div2">
                    <Salle nom="Salle de Réunion" numero={102} />
                </div>
                <div className="div3">
                    <Salle nom="Salle de Formation" numero={103} />
                </div>
                <div className="div4">4</div>
                <div className="div5">5</div>
                <div className="div6">6</div>
                <div className="div7">7</div>
                <div className="div8">8</div>
                <div className="div9">9</div>
                <div className="div10">10</div>
                <div className="div11">11</div>
                <div className="div12">12</div>
                <div className="div13">13</div>
            </div>
        </main>
        <footer>
            <div>
            <button>Sélectionner une réservation</button>
            <button>Effectuer une réservation</button>
            <button>Modifier une reservation</button>
            <button>Supprimer une reservation</button>
            </div>
        </footer>
      </>
    )

}

export default DashboardFormateur;