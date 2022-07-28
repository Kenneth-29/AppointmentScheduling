import { useState } from "react"
import {useAdmin} from "../hooks/useAdminContext"

const AdminLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useAdmin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return(
        <form>
            <h3>Admin Login</h3>

            <label>Username</label>
            <input type="text"
            onChange={(e)=>setUsername(e.target.value)}
            value={username} />

            <label>Password</label>
            <input type="password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password} />

            <button disabled={isLoading}>Login</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default AdminLogin