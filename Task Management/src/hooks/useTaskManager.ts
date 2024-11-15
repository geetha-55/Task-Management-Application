import { useState, useEffect } from 'react';
import { Task } from '../types/TaskTypes';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: Task['priority']) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTaskPriority = (id: string, priority: Task['priority']) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, priority } : task))
    );
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTaskPriority,
  };
};