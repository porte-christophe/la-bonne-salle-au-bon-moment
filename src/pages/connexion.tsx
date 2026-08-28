//Imports
import './connexion.css';

//Component : connexion page
function connexion() {
    return (
        <>
            <div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis facere doloremque ullam aspernatur perspiciatis quod laborum minus enim eligendi consequuntur?</p>
                <div>
                    <form action="">
                        <div>
                            <label>Identifiant</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label htmlFor="">Mot de passe</label>
                            <input type="text"/>
                        </div>
                        <button type="submit">Se connecter</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default connexion;