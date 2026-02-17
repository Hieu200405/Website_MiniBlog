import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContextObject";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route (redirects to posts if already logged in)
const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (token) {
    return <Navigate to="/posts" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          <Route 
            path="/posts" 
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
