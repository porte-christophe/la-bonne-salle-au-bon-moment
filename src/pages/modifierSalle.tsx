//----------- Imports -----------
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateSalle, getSalle } from '../services/salle.service';
import './creerSalle.css';
import Button from '../components/button';


//----------- Logic -----------
// Validation schema
const updateSalleSchema = z.object({
    name: z
        .string()
        .min(3, "Le nom de la salle doit avoir au minimum 3 caractères."),
    capacity: z
        .coerce
        .number()
        .positive("La capacité doit être supérieure à 0."),
});

type UpdateSalleFormData = z.infer<typeof updateSalleSchema>;

//---------- Component render ----------
function UpdateSalle() {
    // Navigation
    const navigate = useNavigate();
    //recuperation des params
    const params = useParams();
    // Message display (after click on the submit button)
    const [message, setMessage] = useState<string>("");
    const [salle, setSalle] = useState({id: Number(params.id)});
    // Zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateSalleFormData>({
        resolver: zodResolver(updateSalleSchema),
    });

    //def salle
    interface Salle {
      id: number;
      name: string;
      capacity: number;
      // site: string;
      // building: string;
      // floor: number;
      // material: string[];
    }

    


    
    //recuperation de la salle    
    useEffect(() => {

        async function getOneToUpdate(id:number){
            try {
                const data = await getSalle(id);
                setSalle(data);
            } catch (error) {
                console.error("Erreur :", error);
              }
        }

        getOneToUpdate(params.id);
        
    }, []);


    async function onSubmit(formData: UpdateSalleFormData) {
        console.log(formData);
       // setSalle({id: Number(params.id), name: data.name, capacity: Number(data.capacity)});
        //console.log(data);
       
        //await updateSalle({ ...data});
        

        setMessage("Salle Modifier");
    }

    return (
        <>
        
            <header>
                <div>
                <Button description="retour" onClick={() => navigate('/DashboardAdmin')} />
                </div>
            </header>
            <main>
                <div className='container'>
                    <h2>Modifier la salle</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Nom de salle</label>
                            <input type="text" {...register("name")} value={salle.name} 
                                onChange={(e) => { setSalle({ ...salle, name: e.target.value }) }  }/>
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>


                        <div>
                            <label>Capacité d'accueil</label>
                            <input type="number" {...register("capacity")} value={salle.capacity}
                                
                                onChange={(e) => { setSalle({ ...salle, capacity: e.target.value }) } } />
                            {errors.capacity && <p>{errors.capacity.message}</p>}
                        </div>
                        <button type="submit">Valider</button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
            </main>
            
        </>
    );
}

export default UpdateSalle;