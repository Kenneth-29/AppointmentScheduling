import { useState } from 'react'
import { useAppointmentsContext } from '../hooks/useAppointmentsContext'

const AppointmentForm = () => {

    const { dispatch } = useAppointmentsContext()
    
    const [clientName, setClientName] = useState('')
    const [clientPhone, setClientPhone] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [appointmentDate, setAppointmentDate] = useState('')
    const [appointmentTime, setAppointmentTime] = useState('')
    const [appointmentType, setAppointmentType] = useState('')
    const [numberOfAttendees, setNumberOfAttendees] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const appointment = {clientName, clientPhone, clientEmail, appointmentDate, appointmentTime, appointmentType, numberOfAttendees}

        const response = await fetch('/api/appointments', {
            method: 'POST',
            body: JSON.stringify(appointment),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            setEmptyFields([])
            setError(null)
            setClientName('')
            setClientPhone('')
            setClientEmail('')
            setAppointmentDate('')
            setAppointmentTime('')
            setAppointmentType('')
            setNumberOfAttendees('')
            dispatch({type: 'CREATE_APPOINTMENT', payload: json})
        }
    }

    return(
        <form className='create' onSubmit={handleSubmit}>

            <h3>Schedule an Appointment</h3>

            <label>Client Name</label>
            <input type="text" 
            onChange={(e)=>setClientName(e.target.value)}
            value={clientName}
            className={emptyFields.includes('clientName') ? 'error' : ''}
            />

            <label>Phone Number</label>
            <input type="text" 
            onChange={(e)=>setClientPhone(e.target.value)}
            value={clientPhone}
            className={emptyFields.includes('clientPhone') ? 'error' : ''}
            />

            <label>Email</label>
            <input type="text"
            onChange={(e)=>setClientEmail(e.target.value)}
            value={clientEmail}
            className={emptyFields.includes('clientEmail') ? 'error' : ''}
            />

            <label>Appointment Date</label>
            <input type="date"
            onChange={(e)=>setAppointmentDate(e.target.value)}
            value={appointmentDate}
            className={emptyFields.includes('appointmentDate') ? 'error' : ''}
            />

            <label>Appointment Time</label>
            <input type="time"
            onChange={(e)=>setAppointmentTime(e.target.value)}
            value={appointmentTime}
            className={emptyFields.includes('appointmentTime') ? 'error' : ''}
            />

            <label>Appointment Type</label>
            <input type="text"
            onChange={(e)=>setAppointmentType(e.target.value)}
            value={appointmentType}
            className={emptyFields.includes('appointmentType') ? 'error' : ''}
            />

            <label>Number of Attendees</label>
            <input type="number"
            onChange={(e)=>setNumberOfAttendees(e.target.value)}
            value={numberOfAttendees}
            className={emptyFields.includes('numberOfAttendees') ? 'error' : ''}
            />

            <button>Schedule Appointment</button>

            {error && <div className='error'>{error}</div>}
        </form>
    )

}

export default AppointmentForm;