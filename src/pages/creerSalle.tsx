// src/pages/creerSalle.tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSalle } from '../services/salle.service';

const creerSalleSchema = z.object({
    label: z.string().min(3, "Le label doit comporter minimum 3 caractères"),
    capacity: z.number().positive("La capacité doit être supérieure à 0"),
    site: z.string().min(3, "Le site doit comporter au minimum 3 caractères"),
    building: z.string().min(1, "Le building doit comporter au minimum 1 caractère"),
    floor: z.number(),
    material: z.string().optional(),
});

type CreerSalleFormData = z.infer<typeof creerSalleSchema>;

function CreerSalle() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreerSalleFormData>({
        resolver: zodResolver(creerSalleSchema),
    });

    async function onSubmit(data: CreerSalleFormData) {
        const material = data.material
            ? data.material.split(',').map((m) => m.trim())
            : [];

        await createSalle({ ...data, material });
        reset();
    }

    return (
        <>
            <h2>Ajouter une nouvelle salle</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Nom</label>
                <input type="text" {...register("label")} />
                {errors.label && <p>{errors.label.message}</p>}

                <label>Capacité d'accueil</label>
                <input type="number" {...register("capacity", { valueAsNumber: true })} />
                {errors.capacity && <p>{errors.capacity.message}</p>}

                <label>Matériel disponible</label>
                <input type="text" {...register("material")} />

                <label>Site</label>
                <input type="text" {...register("site")} />
                {errors.site && <p>{errors.site.message}</p>}

                <label>Bâtiment</label>
                <input type="text" {...register("building")} />
                {errors.building && <p>{errors.building.message}</p>}

                <label>Etage</label>
                <input type="number" {...register("floor", { valueAsNumber: true })} />
                {errors.floor && <p>{errors.floor.message}</p>}

                <button type="submit">Valider</button>
            </form>
        </>
    );
}

export default CreerSalle;