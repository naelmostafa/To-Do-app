import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.component';
import Register from './components/Register.component';
import Login from './components/Login.component';
import TaskForm from './components/TaskForm.component';
import TaskManager from './components/TaskManager.component';
import TaskList from './components/TaskList.componet';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') || false);

  // Function to handle user login
  const handleLogin = () => {
    // Logic to perform login and set the isLoggedIn state to true
    sessionStorage.setItem('isLoggedIn', true);
    const temp = window.location.origin;
    window.location.href = `${temp}/task`;
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Logic to perform logout and set the isLoggedIn state to false
    window.location.reload();
    sessionStorage.clear();
    const temp = window.location.origin;
    window.location.href = `${temp}/login`;
    setIsLoggedIn(false);
  };

  const taskData = [
    {
      id: 1,
      title: 'Task 1',
      description: 'This is task 1',
      status: 'In Progress',
      createdAt: '2021-09-01T12:00:00.000Z',
      updatedAt: '2021-09-01T12:00:00.000Z',
    },
  ];

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {isLoggedIn ? (
            <Route path="/task" element={<TaskManager isLoggedIn={isLoggedIn} />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
