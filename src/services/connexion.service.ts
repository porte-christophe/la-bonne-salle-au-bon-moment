export async function checkEmailMdp(
  email: string,
  password: string,
): Promise<boolean> { // Pas nécessaire, mais je le laisse pour la lisibilité
  const response = await fetch('http://localhost:3001/users')
  const users = await response.json()
  let valid = false;
  users.forEach((user: { email: string; password: string; role: string }) => {
    if (user.email === email && user.password === password) {
      switch(user.role) {
        case "formateur":
          window.location.replace("/dashboardFormateur");
          break;
        case "admin":
          window.location.replace("/dashboardAdmin");
          break;
      } 
      valid = true;
    }
  })
  return valid;
}