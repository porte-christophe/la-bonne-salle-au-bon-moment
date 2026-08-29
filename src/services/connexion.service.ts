export async function checkEmailMdp(
  email: string,
  password: string,
): Promise<boolean> { // Pas nécessaire, mais je le laisse pour la lisibilité
  const response = await fetch('http://localhost:3001/users')
  const users = await response.json()

  return users.some(
    (user: { email: string; password: string }) =>
      user.email === email && user.password === password,
  )
}