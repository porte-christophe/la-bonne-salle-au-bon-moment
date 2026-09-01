// ---------- Imports --------
import './dashboard-formateur.css';
import Salle from "../components/salle";
import Button from '../components/button';
import { useNavigate } from 'react-router'; // AJOUT

//--------- Component ---------
function DashboardFormateur(){
    const navigate = useNavigate(); // AJOUT
    return (
      <>  <header>
            <div><Button description='se deconnecter'/></div>
        </header>
        <main>
            <div className='grid'>
                <div className="div1">
                    <Salle label="Salle Informatique" numero={101}/>
                </div>
                <div className="div2">
                    <Salle label="Salle de Réunion" numero={102} />
                </div>
                <div className="div3">
                    <Salle label="Salle de Formation" numero={103} />
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
                <Button description='effectuer une reservation' onClick={() => navigate('/creerReservation')}/>
                <Button description='modifier une reservation' onClick={() => navigate('/modifierReservation')}/>
                <Button description='supprimer une reservation'/>
            </div>
        </footer>
      </>
    )

}

export default DashboardFormateur;