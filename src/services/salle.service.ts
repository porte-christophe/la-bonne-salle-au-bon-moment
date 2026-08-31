// src/services/salle.service.ts
export async function createSalle(salle: object) {
  const response = await fetch('http://localhost:3001/salles', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(salle),
  });

  return response.json();
}