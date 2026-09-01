import Button from '../components/button';

import FullCalendar, { useCalendarController } from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch"; // YOUR THEME
import dayGridPlugin from "@fullcalendar/react/daygrid";


// stylesheets
import '@fullcalendar/react/skeleton.css'; // ALWAYS NEED SKELETON
import '@fullcalendar/react/themes/monarch/theme.css'; // YOUR THEME
import '@fullcalendar/react/themes/monarch/palettes/blue.css'; // YOUR THEME'S PALETTE


function Agenda(){
	//---Logic
	//var
	const controller = useCalendarController();

	
	//---Render 
    return (
    	<>
    		<div class='toolbar'>
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
		      	plugins={[themePlugin, dayGridPlugin]}
		      	initialView="dayGridWeek"
		      	weekends={false}
		    />
		</>
    	
	);
}
export default Agenda;