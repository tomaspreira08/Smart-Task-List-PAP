// app/services/TaskContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Task, TaskContextType } from '../types/Task'; 
import uuid from 'react-native-uuid'; // Precisamos de um gerador de ID único

// Instale a dependência para gerar IDs únicos:
// npm install react-native-uuid

// 1. Criar o Contexto
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 2. O Componente Provider (o coração da gestão de estado)
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Função para adicionar uma nova tarefa
  const addTask = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: uuid.v4().toString(), // Gera um ID único
    };
    setTasks(currentTasks => [...currentTasks, newTask]);
    console.log("Tarefa adicionada:", newTask.title);
  };

  // Função para remover uma tarefa
  const removeTask = (id: string) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
  };

  const contextValue: TaskContextType = {
    tasks,
    addTask,
    removeTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

// 3. Hook Personalizado para Usar o Contexto (melhora a ergonomia)
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks deve ser usado dentro de um TaskProvider');
  }
  return context;
};