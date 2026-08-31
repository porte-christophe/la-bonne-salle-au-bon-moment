import Salle from "../components/salle"; 

function DashboardFor() {
  return (
    <div>

      <Salle nom="Salle Informatique" numero={101} />

      <Salle nom="Salle de Réunion" numero={102} />

      <Salle nom="Salle de Formation" numero={103} />
    </div>
  );
}

export default DashboardFor;