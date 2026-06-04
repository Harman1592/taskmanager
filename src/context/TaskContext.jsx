import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { fetchTodos } from '../services/api.js';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      loadTasks();
    }
  }, []);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const loadTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchTodos();

      saveTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      title: task.title,
      completed: false,
      userId: 1,
      createdAt: new Date().toISOString(),
    };

    saveTasks([newTask, ...tasks]);
  };

  const editTask = (id, updatedTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title: updatedTitle }
        : task
    );

    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    saveTasks(updatedTasks);
  };

  const toggleStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,completed: !task.completed,
          }
        : task
    );

    saveTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        editTask,
        deleteTask,
        toggleStatus,
        loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}