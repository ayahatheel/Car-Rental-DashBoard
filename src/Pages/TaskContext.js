import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete car listing form', completed: false, date: new Date(2024, 6, 5, 10, 0) },
    { id: 2, text: 'Review rental requests', completed: false, date: new Date(2024, 6, 10, 10, 0) },
    { id: 3, text: 'Update profile information', completed: true, date: new Date(2024, 6, 15, 14, 0) },
  ]);

  const addTask = (task) => {
    setTasks([...tasks, { id: tasks.length + 1, ...task }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
