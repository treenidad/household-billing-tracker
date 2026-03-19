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

export type Bill = {
  id: number;
  billName: string;
  dueDate: string;
  totalAmount: number;
  yourShare: number;
  category: "" | "Food" | "Housing" | "Transportation" | "Utilites" | "Other"
  status: "Paid" | "Due" | "Overdue" | "Draft";
};



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const DEMO_KEY = "demo_initialized";

  const demoBills: Bill[] = [
  {
    id: 1,
    billName: "Electricity Bill",
    dueDate: "2024-07-15",
    totalAmount: 100,
    yourShare: 50,
    category: "Utilites",
    status: "Due",
  },
  {
    id: 2,
    billName: "Groceries",
    dueDate: "2024-07-20",
    totalAmount: 60,
    yourShare: 30,
    category: "Food",
    status: "Paid",
  },
  {
    id: 3,
    billName: "Car Payment",
    dueDate: "2024-07-10",
    totalAmount: 100,
    yourShare: 80,
    category: "Transportation",
    status: "Overdue",
  },
];

//  Button to Reset the Demo Data - Useful for testing and for users to quickly see the app with sample data
const resetDemoData = () => {
  localStorage.setItem("bills", JSON.stringify(demoBills));
  localStorage.setItem(DEMO_KEY, "true");
  setBills(demoBills);
}

  const [bills, setBills] = useState<Bill[]>(() => {
    try {
      const storedBills = localStorage.getItem("bills");
      const demoInitialized = localStorage.getItem(DEMO_KEY);

      if(storedBills) {
        const parsed = JSON.parse(storedBills);
        return Array.isArray(parsed) ? parsed : [];
      }

      if(!demoInitialized) {
        localStorage.setItem("bills", JSON.stringify(demoBills));
        localStorage.setItem(DEMO_KEY, "true");
        return demoBills;
      }
      return [];
    } catch (error) {
      console.error("Error loading bills from localStorage:", error);
      return demoBills; // Fallback to demo bills if there's an error
    }
  });

  // Persist bills whenever they change
  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);  

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
        
        {/* Dashboard Route */}
        <Route path="/dashboard" element={ <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Layout onLogout={handleLogout} >
            <Dashboard />
          </Layout></ProtectedRoute>} />
        
        {/* Bills Route */}
        <Route path="/bills" element={ <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Layout onLogout={handleLogout}>
            <Bills 
              bills={bills} 
              setBills={setBills}
              resetDemoData={resetDemoData}/>
          </Layout>
        </ProtectedRoute>} />
        
        {/* Add Bill Route */}
        <Route path="/bills/add" element={ <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Layout onLogout={handleLogout}>
            <AddBill setBills={setBills}/>
          </Layout>
        </ProtectedRoute>} />
        
        {/* Edit Bill Route */}
        <Route path="/bills/:id/edit" element={ 
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}> 
              <EditBill bills={bills} setBills={setBills}/>
            </Layout>
          </ProtectedRoute>} />
        
        {/* // Settings Route */}
        <Route path="/settings" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}>
              <Settings />
            </Layout>
          </ProtectedRoute>} 
         />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
