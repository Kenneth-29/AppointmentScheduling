import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
    
        logout()
    }
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Appointment Scheduling</h1>
                </Link>
                <nav>
                    {user &&(
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    { !user && (
                        <div>
                            <Link to="/adminLogin" >Admin</Link>
                            <Link to="/agentLogin" >Agent Login</Link>
                            <Link to="/dashboard">Appointments</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;