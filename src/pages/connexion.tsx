//Imports
import { useState } from 'react';
import './connexion.css';
// import * as z from "zod";
// React hook form
import { useForm } from 'react-hook-form';

//Component : connexion page
function connexion() {
    // --------- Logic ---------
    // Variables
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");

    const {
        register, // Pour enregistrer et récupérer les champs d’un formulaire par nom
        handleSubmit, // Gérer la soumission du formulaire
        formState: { errors }, // Récupère les erreurs de validation
    } = useForm();

    async function onSubmit() {
        console.log(emailInput, passwordInput)
        // appel à l'API ici
    }


    

    // Component render
    return (
        <>
            <div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis facere doloremque ullam aspernatur perspiciatis quod laborum minus enim eligendi consequuntur?</p>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Identifiant</label>
                            <input
                                type="email"
                                value={emailInput}
                                {...register("email",{ required: "L'email est obligatoire", })}
                                onChange={(event) => setEmailInput(event.target.value)}
                            />
                            {errors.email && (<p>{errors.email.message}</p>)}
                        </div>
                        <div>
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                value={passwordInput}
                                {...register("password",{ required: "Le mot de passe est obligatoire", })}
                                onChange={(event) => setPasswordInput(event.target.value)}
                            />
                            {errors.password && (<p>{errors.password.message}</p>)}
                        </div>
                        <button type="submit" >Se connecter</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default connexion;