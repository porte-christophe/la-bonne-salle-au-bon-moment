// ---------- Imports --------
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './creerReservation.css';
import Button from '../components/button';

const API_URL = 'http://localhost:3001'; // adapte le port si besoin

//--------- Types ---------
interface Salle {
  id: string;
  label: string;
  nom: string;
  capacity: number;
  site: string;
  building: string;
  floor: number;
  material: string[];
}

interface Reservation {
  id: string;
  salleId: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  motif: string;
  userId?: string;
}

interface CurrentUser {
  id: string;
  email: string;
  role: string;
}

// Vérifie qu'aucune AUTRE réservation (idAExclure = celle en cours de modification n'occupe déjà la même salle sur le même créneau.
function estDisponible(
  reservations: Reservation[],
  salleId: string,
  date: string,
  heureDebut: string,
  heureFin: string,
  idAExclure: string,
): boolean {
  return !reservations.some((r) =>
    r.id !== idAExclure &&
    r.salleId === salleId &&
    r.date === date &&
    heureDebut < r.heureFin &&
    r.heureDebut < heureFin
  );
}

//--------- Component ---------
function ModifierReservation() {
  const navigate = useNavigate();

  const currentUser: CurrentUser | null = JSON.parse(
    localStorage.getItem('user') || 'null',
  );

  const [salles, setSalles] = useState<Salle[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationId, setReservationId] = useState('');

  const [salleId, setSalleId] = useState('');
  const [date, setDate] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [motif, setMotif] = useState('');

  const [erreur, setErreur] = useState('');
  const [succes, setSucces] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/salles`)
      .then((res) => res.json())
      .then((data) => setSalles(data))
      .catch(() => setErreur('Impossible de charger la liste des salles'));

    fetch(`${API_URL}/reservations`)
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch(() => setErreur('Impossible de charger la liste des réservations'));
  }, []);

  const reservationsModifiables = reservations.filter(
    (r) => currentUser?.role.toLowerCase() === 'admin' || r.userId === currentUser?.id,
  );

  function selectionnerReservation(id: string) {
    setReservationId(id);
    setErreur('');
    setSucces('');

    const reservation = reservations.find((r) => r.id === id);
    if (!reservation) return;

    setSalleId(reservation.salleId);
    setDate(reservation.date);
    setHeureDebut(reservation.heureDebut);
    setHeureFin(reservation.heureFin);
    setMotif(reservation.motif);
  }

  const handleSubmit = async () => {
    setErreur('');
    setSucces('');

    if (!currentUser) {
      setErreur('Vous devez être connecté pour modifier une réservation.');
      return;
    }

    if (!reservationId) {
      setErreur('Merci de sélectionner une réservation à modifier.');
      return;
    }

    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation) {
      setErreur('Réservation introuvable.');
      return;
    }

    if (reservation.userId !== currentUser.id && currentUser.role.toLowerCase() !== 'admin') {
      setErreur("Vous n'êtes pas autorisé à modifier cette réservation.");
      return;
    }

    if (!salleId || !date || !heureDebut || !heureFin) {
      setErreur('Merci de remplir tous les champs obligatoires.');
      return;
    }

    const debut = new Date(`${date}T${heureDebut}`);
    const fin = new Date(`${date}T${heureFin}`);

    if (fin <= debut) {
      setErreur("L'heure de fin doit être après l'heure de début.");
      return;
    }

    if (fin < new Date()) {
      setErreur('La date de fin ne peut pas être dans le passé.');
      return;
    }

    if (!estDisponible(reservations, salleId, date, heureDebut, heureFin, reservationId)) {
      setErreur('Aucune salle disponible sur ce créneau. Modification impossible.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/reservations/${reservationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reservation,
          salleId,
          date,
          heureDebut,
          heureFin,
          motif,
        }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la modification de la réservation');
      }

      setSucces('Réservation modifiée avec succès.');
    } catch {
      setErreur("La réservation n'a pas pu être modifiée.");
    }
  };

  if (!currentUser) {
    return (
      <>
        <header>
          <div>
            <Button description="retour" onClick={() => navigate('/')} />
          </div>
        </header>
        <main>
          <p>Vous devez être connecté pour modifier une réservation.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <header>
        <div>
          <Button
            description="retour"
            onClick={() =>
              navigate(currentUser.role.toLowerCase() === 'admin' ? '/dashboardAdmin' : '/dashboardFormateur')
            }
          />
        </div>
      </header>
      <main>
        <div className="form-container">
          <h1>Modifier une réservation</h1>

          <label htmlFor="reservation">Réservation</label>
          <select
            id="reservation"
            value={reservationId}
            onChange={(e) => selectionnerReservation(e.target.value)}
          >
            <option value="">-- Choisir une réservation --</option>
            {reservationsModifiables.map((r) => {
              const salle = salles.find((s) => s.id === r.salleId);
              return (
                <option key={r.id} value={r.id}>
                  {salle ? salle.nom : r.salleId} — {r.date} {r.heureDebut}-{r.heureFin}
                </option>
              );
            })}
          </select>

          {reservationId && (
            <>
              <label htmlFor="salle">Salle</label>
              <select
                id="salle"
                value={salleId}
                onChange={(e) => setSalleId(e.target.value)}
              >
                {salles.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nom} — Salle {s.label} ({s.building}, étage {s.floor})
                  </option>
                ))}
              </select>

              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label htmlFor="heureDebut">Heure de début</label>
              <input
                id="heureDebut"
                type="time"
                value={heureDebut}
                onChange={(e) => setHeureDebut(e.target.value)}
              />

              <label htmlFor="heureFin">Heure de fin</label>
              <input
                id="heureFin"
                type="time"
                value={heureFin}
                onChange={(e) => setHeureFin(e.target.value)}
              />

              <label htmlFor="motif">Motif</label>
              <input
                id="motif"
                type="text"
                value={motif}
                onChange={(e) => setMotif(e.target.value)}
                placeholder="Réunion, formation, etc."
              />
            </>
          )}

          {erreur && <p className="erreur">{erreur}</p>}
          {succes && <p className="succes">{succes}</p>}
        </div>
      </main>
      <footer>
        <div>
          <Button description="valider la modification" onClick={handleSubmit} />
        </div>
      </footer>
    </>
  );
}

export default ModifierReservation;