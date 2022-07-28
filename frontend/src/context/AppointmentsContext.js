import { createContext, useReducer } from "react"

export const AppointmentContext = createContext()

export const appointmentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_APPOINTMENTS':
            return {
                appointments: action.payload,
            }
        case 'CREATE_APPOINTMENT':
            return {
                appointments: [action.payload, ...state.workouts]
            }
            case 'DELETE_APPOINTMENT':
            return {
                appointments: state.appointments.filter(appointment => appointment._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const AppointmentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appointmentsReducer, {
        appointments: null
    })

    return (
        <AppointmentContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppointmentContext.Provider>
    )
}