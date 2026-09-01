import Button from '../components/button';

import FullCalendar, { useCalendarController } from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch"; // YOUR THEME
import timeGridPlugin from '@fullcalendar/react/timegrid';


// stylesheets
import '@fullcalendar/react/skeleton.css'; // ALWAYS NEED SKELETON
import '@fullcalendar/react/themes/monarch/theme.css'; // YOUR THEME
import '@fullcalendar/react/themes/monarch/palettes/blue.css'; // YOUR THEME'S PALETTE


function Agenda(){
	//---Logic
	//var
	const controller = useCalendarController();
	let reservation = [

	]

	
	//---Render 
    return (
    	<>
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