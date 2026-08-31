interface Salles {
  nom: string;
  numero: number;
}

function Salle({ nom, numero }: Salles) {
  return (
    <div>
      <p>
        Salle : {nom}
      </p>

      <p>
        Numéro : {numero}
      </p>
    </div>
  );
}

export default Salle;