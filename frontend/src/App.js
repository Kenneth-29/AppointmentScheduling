import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// components & pages
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AgentDashboard from './pages/AgentDB';
import AgentLogin from './pages/agentLogin';
import AdminLogin from './pages/Login';

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminLogin" element={!user ? <AdminLogin/> : <Navigate to="/dashboard"/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agentLogin" element={!user ? <AgentLogin /> : <Navigate to="/agentDashboard"/>} />
          <Route path="/agentDashboard" element={user ? <AgentDashboard /> : <Navigate to="/"/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
