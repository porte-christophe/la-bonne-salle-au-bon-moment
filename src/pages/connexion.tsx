//Imports
import { useState } from 'react';
import './connexion.css';
// React hook form
import { useForm } from 'react-hook-form';
// zod
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


//Component : connexion page
function Connexion() {
    // --------- Logic ---------
    // Variables
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");

    const loginConditions = z.object({
        email: z
        .string()
        .min(1, "L'email est obligatoire")
        .email("L'email est invalide"),
        password: z
        .string()
        .min(1, "Le mot de passe est obligatoire")
        .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    });

    const {
        register, // Pour enregistrer et récupérer les champs d’un formulaire par nom
        handleSubmit, // Gérer la soumission du formulaire
        formState: { errors }, // Récupère les erreurs de validation
    } = useForm({resolver: zodResolver(loginConditions),});




    // Fonctions
    async function onSubmit() {
        setEmailInput(event.target[0].value);
        setPasswordInput(event.target[1].value);
        console.log(emailInput, passwordInput);
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
                                defaultValue={emailInput}
                                {...register("email")}
                                onChange={(event) => setEmailInput(event.target.value)}
                                
                            />
                            {errors.email && (<p>{errors.email.message}</p>)}
                        </div>
                        <div>
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                defaultValue={passwordInput}
                                {...register("password")}
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
export default Connexion;