import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  
    return (
     <>
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route path="/tasks" element={
          <ProtectedRoute>
            
          <TaskList />
          </ProtectedRoute>
          
          } />
        <Route path="/create-task" element={
          <ProtectedRoute>
            
            <CreateTask />
          </ProtectedRoute>
          } />
        <Route path="/edit-task/:id" element={
          <ProtectedRoute> 

          <EditTask />
          </ProtectedRoute>

          } />
      </Routes>
         <ToastContainer position="top-right" autoClose={3000} />
    </Router>
     </>
    )

}

export default App;