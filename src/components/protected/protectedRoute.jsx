import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// ProtectedRoute: renders children if authenticated, otherwise redirects to /login
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/user/check", { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          setIsAuthenticated(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <div>Loading...</div>;          // while checking auth
  if (!isAuthenticated) return <Navigate to="/login" replace />; // redirect if not

  return children; // render protected content
};

export default ProtectedRoute;
