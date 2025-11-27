
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Home from './Home';
import Register from './register';
import { AuthProvider } from './AuthContext';

function App() {

  return (
    <AuthProvider>

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;