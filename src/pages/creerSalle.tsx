// src/pages/creerSalle.tsx
//----------- Imports -----------
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSalle } from '../services/salle.service';
import './creerSalle.css';
import Button from '../components/button';

interface CurrentUser {
  id: string;
  email: string;
  role: string;
}

//----------- Logic -----------
// Validation schema
const creerSalleSchema = z.object({
    label: z
        .string()
        .min(3, "Le nom de la salle doit avoir au minimum 3 caractères."),
    capacity: z
        .number()
        .positive("La capacité doit être supérieure à 0."),
    site: z
        .string()
        .min(3, "Le site doit avoir au minimum 3 caractères."),
    building: z
        .string()
        .min(1, "Le bâtiment doit avoir au minimum 1 caractère."),
    floor: z.number(),
    material: z.string().optional(),
});

type CreerSalleFormData = z.infer<typeof creerSalleSchema>;

//---------- Component render ----------
function CreerSalle() {
    // Navigation
    const navigate = useNavigate();

    const currentUser: CurrentUser | null = JSON.parse(
        localStorage.getItem('user') || 'null',
    );

    // Message display (after click on the submit button)
    const [message, setMessage] = useState<string>("");

    // Zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreerSalleFormData>({
        resolver: zodResolver(creerSalleSchema),
    });

    async function onSubmit(data: CreerSalleFormData) {
        const material = data.material
            ? data.material.split(',').map((m) => m.trim())
            : [];

        await createSalle({ ...data, material });
        reset();

        setMessage("Salle ajoutée");
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
                    <p>Vous devez être connecté pour créer une salle.</p>
                </main>
            </>
        );
    }

    if (currentUser.role.toLowerCase() !== 'admin') {
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
                    <p>Vous n'êtes pas autorisé à créer une salle.</p>
                </main>
            </>
        );
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
                    <h2>Ajouter une nouvelle salle</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Nom de salle</label>
                            <input type="text" {...register("label")} placeholder='Salle informatique'/>
                            {errors.label && <p>{errors.label.message}</p>}
                        </div>

                        <div>
                            <label>Capacité d'accueil</label>
                            <input type="number" {...register("capacity", { valueAsNumber: true })} min={0}/>
                            {errors.capacity && <p>{errors.capacity.message}</p>}
                        </div>

                        <div>
                            <label>Matériel disponible</label>
                            <input type="text" {...register("material")} />
                        </div>

                        <div>
                            <label>Site</label>
                            <input type="text" {...register("site")} placeholder='Campus Ouest' />
                            {errors.site && <p>{errors.site.message}</p>}
                        </div>

                        <div>
                            <label>Bâtiment</label>
                            <input type="text" {...register("building")} placeholder='Bâtiment Charles Xavier' />
                            {errors.building && <p>{errors.building.message}</p>}
                        </div>

                        <div>
                            <label>Etage</label>
                            <input type="number" {...register("floor", { valueAsNumber: true })} min={0} placeholder='3'/>
                            {errors.floor && <p>{errors.floor.message}</p>}
                        </div>

                        <button type="submit">Valider</button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
            </main>
        </>
    );
}

export default CreerSalle;