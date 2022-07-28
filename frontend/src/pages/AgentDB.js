import { useEffect } from "react"
import { useAppointmentsContext } from "../hooks/useAppointmentsContext"

import AppointmentDetails from "../components/AppointmnetDetails"

const AgentDashboard = () => {
    const {appointments, dispatch} = useAppointmentsContext()

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await fetch("/api/appointments/assigned")
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_APPOINTMENTS', payload: json})
            }
        }
        fetchAppointments()
    } , [dispatch])

    return (
        <div className="dashboard">
            <div className="appointments">
                {appointments && appointments.map((appointment) =>(
                    <AppointmentDetails appointment={appointment} key={appointment._id} />
                ))}
            </div>
        </div>
    )
}

export default AgentDashboard;