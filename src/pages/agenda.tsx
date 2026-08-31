import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


function Agenda(){
	//---Logic
	//var
	const localizer = momentLocalizer(moment);

	
	//---Render 
    return (<Calendar
	      localizer={localizer}
	      startAccessor="start"
	      endAccessor="end"
	      style={{ height: 500 }}
	    />
	);
}
export default Agenda;