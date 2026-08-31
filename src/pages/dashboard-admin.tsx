// ---------- Imports --------
import './dashboard-admin.css';
import Button from '../components/button';
import Salle from '../components/salle';

//--------- Component ---------
function DashboardAdmin(){
    return (
      <>  
        <header>
          <div>
            <Button description='se deconnecter'/>
          </div>
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
            <Button description='ajouter une salle'/>
            <Button description='créer un compte'/>
            <Button description='ajouter une reservation'/>
            <Button description='supprimer une reservation'/>
          </div>
        </footer>
      </>
    )

}

export default DashboardAdmin;

