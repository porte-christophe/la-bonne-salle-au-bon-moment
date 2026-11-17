interface Salles {
  label: string;
}

function Salle({ label }: Salles) {
  return (
    <div>
      <p>Salle : {label}</p>
    </div>
  );
}

export default Salle;