import React from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="app">
          <AppRoutes />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;