import { useNavigate } from 'react-router';


function Salle({salle, deleteOne}) {
  const navigate = useNavigate();

  return (
    <div key={salle.id} className="salle-card">
      <h3 className="salle-title">
        {salle.name}
      </h3>
      <p className="salle-info">
        Capacité : <strong>{salle.capacity} personnes</strong>
      </p>
      <button onClick={()=>navigate(`/updateSalle/${salle.id}`)} >Modifier</button>
      <button onClick={()=>{deleteOne()}} >supprimer</button>
    </div>
  );
}

export default Salle;