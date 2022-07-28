import { useAppointmentsContext } from "../hooks/useAppointmentsContext";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { format } from "date-fns";

const AppointmentDetails = ({appointment})=>{
    const {dispatch} = useAppointmentsContext()

    const handleDelete = async () => {
        const response = await fetch(`/api/appointments/` + appointment._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_APPOINTMENT', payload: json})
        }
    }

    return (
        <div className="appointment-details">
            <h4>{appointment.clientName}</h4>
            <p> <strong>Phone :</strong> {appointment.clientPhone}</p>
            <p><strong>Email :</strong> {appointment.clientEmail}</p>
            <p><strong>Appointment Date:</strong> {format(new Date(appointment.appointmentDate), 'dd/MM/yyyy')}, {formatDistanceToNow(new Date(appointment.appointmentDate), {addSuffix: true})}</p>
            <p><strong>Time:</strong> {appointment.appointmentTime}</p>
            <p><strong>Type:</strong> {appointment.appointmentType}</p>
            <p><strong>Number of Attendees:</strong> {appointment.numberOfAttendees}</p>
            <p><strong>Agent Assigned:</strong> {appointment.assignedAgent}</p>
            <span className="delete" onClick={handleDelete}>delete</span>
        </div>
    )
}

export default AppointmentDetails;