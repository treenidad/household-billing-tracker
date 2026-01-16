import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bills from "./pages/Bills";
import AddBill from "./pages/AddBill";
import EditBill from "./pages/EditBill";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false)

  // Load auth state on app start
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }

    // Tell app we're done checking
    setAuthChecked(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  }


  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking session...
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={ <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Layout onLogout={handleLogout} >
            <Dashboard />
          </Layout></ProtectedRoute>} />
        <Route path="/bills" element={ <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Layout onLogout={handleLogout}>
            <Bills />
          </Layout>
        </ProtectedRoute>} />
        <Route path="/bills/add" element={<AddBill />} />
        <Route path="/bills/:id/edit" element={<EditBill />} />
        <Route path="/settings" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
          <Layout onLogout={handleLogout}>
            <Settings />
          </Layout>
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
