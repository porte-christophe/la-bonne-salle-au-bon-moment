//Imports
import { useState } from 'react';
import './connexion.css';
import { checkEmailMdp } from '../services/connexion.service';

//Component : connexion page
function connexion() {
    // Logic 
    // const emailInput = document.getElementById('email') as HTMLInputElement;
    // const passwordInput= document.getElementById('password') as HTMLInputElement;

    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [message, setMessage] = useState<string>(""); // Le message qui s'affichera au clic du bouton, juste là pour le test

    async function connexionClick() { // La fonction du clic de co, qui remplace la fonction anonyme du test d'avant
        const isValid = await checkEmailMdp(emailInput, passwordInput);
        setMessage(isValid ? "Connexion réussie" : "Identifiant ou mot de passe incorrect"); // Le message en dessous du formulaire, après clic
        console.log(isValid); // Juste pour le test, faudra penser à le virer celui-là
    }

    // Component render
    return (
        <>
            <div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis facere doloremque ullam aspernatur perspiciatis quod laborum minus enim eligendi consequuntur?</p>
                <div>
                    <form action="">
                        <div>
                            <label>Identifiant</label>
                            <input
                                type="text"
                                value={emailInput}
                                onChange={(event) => setEmailInput(event.target.value)}
                            />

                        </div>
                        <div>
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(event) => setPasswordInput(event.target.value)}
                            />
                        </div>
                        <button type="button" onClick={connexionClick}>Se connecter</button> {/* Appel de la nouvelle fonction clic */}
                    </form>
                    {message && <p>{message}</p>} {/* Le fameux message de test */}
                </div>
            </div>
        </>
    )
}
export default connexion;