import Button from '../components/button';
import { useEffect, useState } from 'react';

import FullCalendar, { useCalendarController } from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch"; // YOUR THEME
import timeGridPlugin from '@fullcalendar/react/timegrid';


// stylesheets
import '@fullcalendar/react/skeleton.css'; // ALWAYS NEED SKELETON
import '@fullcalendar/react/themes/monarch/theme.css'; // YOUR THEME
import '@fullcalendar/react/themes/monarch/palettes/blue.css'; // YOUR THEME'S PALETTE


function Agenda(){
	//---Logic
	const API_URL = 'http://localhost:3001';

	interface SalleData {
	 	id: string;
	  	label: string;
	  	nom: string;
	  	capacity: number;
	  	site: string;
	  	building: string;
	  	floor: number;
	  	material: string[];
	}
	//var
	const controller = useCalendarController();
	const [salles, setSalles] = useState<SalleData[]>([]);

   	useEffect(() => {
    	fetch(`${API_URL}/salles`)
      	.then((res) => res.json())
      	.then((data) => setSalles(data))
      	.catch((err) => console.error('Erreur lors du chargement des salles', err));
  	}, []);

	
	//---Render 
    return (
    	<>
    		<select>
    			{salles.map((salle, index) => (
            		<option key = {index} >{salle.label}</option>
          		))}
    		</select>
    		<div>
		        <Button
		        	description="Semaine précedente"
		        	onClick={() => controller.prev()}
		        />
		        <Button
		        	description="Aujord'hui"
		        	onClick={() => controller.today()}
		        />
		        <Button
		        	description="Semaine suivante"
		        	onClick={() => controller.next()}
		        />
		    </div>
	    	<FullCalendar
	    		controller={controller}
		      	plugins={[themePlugin, timeGridPlugin]}
		      	initialView="timeGridWeek"
		      	slotMinTime="07:00:00"
		      	slotMaxTime="19:00:00"
		      	nowIndicator={true}
		      	weekends={false}
		      	height={500}

		      	

		    />
		</>
    	
	);
}
export default Agenda;