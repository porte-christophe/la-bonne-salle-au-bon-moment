// src/pages/listeReservations.tsx
// ---------- Imports --------
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './listeReservations.css';
import Button from '../components/button';

const API_URL = 'http://localhost:3001';

//--------- Types ---------
interface Reservation {
  id: string;
  salleId: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  motif: string;
  userId?: string;
}

interface Salle {
  id: string;
  label: string;
}

interface CurrentUser {
  id: string;
  email: string;
  role: string;
}

//--------- Component ---------
function ListeReservations() {
  const navigate = useNavigate();

  const currentUser: CurrentUser | null = JSON.parse(
    localStorage.getItem('user') || 'null',
  );

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [salles, setSalles] = useState<Salle[]>([]);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

   function fetchData() {
    Promise.all([
      fetch(`${API_URL}/reservations`).then((res) => res.json()),
      fetch(`${API_URL}/salles`).then((res) => res.json()),
    ])
      .then(([reservationsData, sallesData]) => {
        setReservations(reservationsData);
        setSalles(sallesData);
      })
      .catch(() => setErreur('Impossible de charger les réservations.'));
  }

  function getNomSalle(salleId: string) {
    const salle = salles.find((s) => s.id === salleId);
    return salle ? salle.label : salleId;
}

  async function annulerReservation(reservation: Reservation) {
    if (!currentUser) {
      setErreur('Vous devez être connecté pour annuler une réservation.');
      return;
    }

    if (reservation.userId !== currentUser.id && currentUser.role.toLowerCase() !== 'admin') {
      setErreur("Vous n'êtes pas autorisé à annuler cette réservation.");
      return;
    }

    const confirme = window.confirm('Annuler cette réservation ?');
    if (!confirme) return;

    try {
      const res = await fetch(`${API_URL}/reservations/${reservation.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setReservations((prev) => prev.filter((r) => r.id !== reservation.id));
    } catch (err) {
      setErreur("La réservation n'a pas pu être annulée.");
    }
  }

  if (!currentUser) {
    return (
      <>
        <header>
          <div>
            <Button description="retour" onClick={() => navigate('/')} />
          </div>
        </header>
        <main>
          <p>Vous devez être connecté pour consulter les réservations.</p>
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
        <div className="liste-container">
          <h1>Réservations</h1>

          {erreur && <p className="erreur">{erreur}</p>}

          {reservations.length === 0 ? (
            <p>Aucune réservation pour le moment.</p>
          ) : (
            <ul>
              {reservations.map((r) => (
                <li key={r.id} className="reservation-item">
                  <span>
                    <strong>{getNomSalle(r.salleId)}</strong> — {r.date} de{' '}
                    {r.heureDebut} à {r.heureFin}
                    {r.motif && ` (${r.motif})`}
                  </span>
                  <Button
                    description="annuler"
                    onClick={() => annulerReservation(r)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

export default ListeReservations;