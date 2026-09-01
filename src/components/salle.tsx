interface Salles {
  label: string;
  numero: number;
}

function Salle({ label, numero }: Salles) {
  return (
    <div>
      <p>Salle : {label}</p>
      <p>Numéro : {numero}</p>
    </div>
  );
}

export default Salle;