import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { db } from './firebaseConfig'; 
import { 
    collection, 
    onSnapshot, 
    addDoc, 
    deleteDoc, 
    updateDoc, 
    doc, 
    query, 
    orderBy // 👈 Importamos para que a lista fique organizada
} from 'firebase/firestore'; 

import { Task, TaskContextType } from '../types/Task'; 

const COLLECTION_NAME = 'tasks'; 

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    // 🚨 1. ADICIONAR ESTADO DE LOADING 🚨
    const [isLoading, setIsLoading] = useState<boolean>(true); 
  
    // ----------------------------------------------------
    // 1. LER DADOS (ON SNAPSHOT) - EM TEMPO REAL
    // ----------------------------------------------------
    useEffect(() => {
        const tasksCollectionRef = collection(db, COLLECTION_NAME); 
        
        // Criamos uma query para ordenar por data (opcional, mas recomendado)
        const q = query(tasksCollectionRef, orderBy('scheduledTime', 'asc'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedTasks: Task[] = snapshot.docs.map(document => {
                const data = document.data();
                
                // Conversão segura de Timestamp do Firestore para Date do JS
                const scheduledDate = data.scheduledTime?.toDate ? data.scheduledTime.toDate() : new Date(data.scheduledTime);
                
                return {
                    id: document.id,
                    ...data,
                    scheduledTime: scheduledDate,
                } as Task;
            });

            setTasks(loadedTasks);
            // 🚨 2. DESLIGAR O LOADING QUANDO OS DADOS CHEGAM 🚨
            setIsLoading(false); 
        }, 
        (error) => {
            console.error("Erro ao carregar dados do Firestore:", error);
            setIsLoading(false); // Desliga mesmo em caso de erro para não travar a app
        });

        return () => unsubscribe(); 
    }, []); 

    // ----------------------------------------------------
    // 2. ADICIONAR TAREFA
    // ----------------------------------------------------
    const addTask = (newTaskData: Omit<Task, 'id' | 'isCompleted'>) => {
        const tasksCollectionRef = collection(db, COLLECTION_NAME);
        addDoc(tasksCollectionRef, {
            ...newTaskData,
            isCompleted: false, 
        });
    };

    const updateTask = async (id: string, updatedData: Partial<Task>) => {
        try {
          // 1. Verifica se usas COLLECTION_NAME ou 'tasks'
          const taskDocRef = doc(db, COLLECTION_NAME, id); 
          
          // 2. O updateDoc precisa do Document Reference e dos dados novos
          await updateDoc(taskDocRef, updatedData);
          
          console.log("Sucesso: Tarefa atualizada no Firebase!");
        } catch (error) {
          console.error("Erro ao atualizar tarefa:", error);
          throw error; // Lança o erro para podermos ver na consola se falhar
        }
      };

    // ----------------------------------------------------
    // 3. APAGAR TAREFA
    // ----------------------------------------------------
    const removeTask = async (id: string) => {
        try {
            console.log("Tentando apagar ID:", id);
            const taskRef = doc(db, COLLECTION_NAME, id); // 👈 Usa a variável aqui
            await deleteDoc(taskRef);
            console.log("Apagado com sucesso no Firebase!");
        } catch (error) {
            console.error("Erro ao apagar no Firebase:", error);
        }
    };
    
    // ----------------------------------------------------
    // 4. ALTERAR STATUS (CONCLUÍDO/PENDENTE)
    // ----------------------------------------------------
    const toggleTaskCompletion = (id: string, currentStatus: boolean) => {
        const taskDocRef = doc(db, COLLECTION_NAME, id);
        updateDoc(taskDocRef, {
            isCompleted: !currentStatus,
        });
    };

    // 🚨 3. INCLUIR O isLoading NO VALOR DO CONTEXTO 🚨
    const contextValue: TaskContextType = {
        tasks,
        addTask,    
        updateTask,
        removeTask,
        toggleTaskCompletion, 
        isLoading, 
    };

    return (
        <TaskContext.Provider value={{ 
          tasks, 
          isLoading, 
          addTask, 
          removeTask, // 👈 VERIFICA SE ESTA LINHA EXISTE
          toggleTaskCompletion, 
          updateTask // 👈 E ESTA TAMBÉM
        }}> 
          {children}
        </TaskContext.Provider>
      );
    
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
      throw new Error('useTasks deve ser usado dentro de um TaskProvider');
    }
    return context;
};

