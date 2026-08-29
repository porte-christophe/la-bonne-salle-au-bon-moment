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
    const [message, setMessage] = useState<string>("");

    async function connexionClick() {
        const isValid = await checkEmailMdp(emailInput, passwordInput);
        setMessage(isValid ? "Connexion réussie" : "Identifiant ou mot de passe incorrect");
        console.log(isValid);
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
                        <button type="button" onClick={connexionClick}>Se connecter</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </>
    )
}
export default connexion;