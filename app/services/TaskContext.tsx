import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { db } from './firebaseConfig'; 
import { useAuth } from './AuthContext'; // 👈 1. IMPORTAR O TEU AUTH CONTEXT
import { 
    collection, 
    onSnapshot, 
    addDoc, 
    deleteDoc, 
    updateDoc, 
    doc, 
    query, 
    orderBy,
    where // 👈 2. IMPORTAR O WHERE
} from 'firebase/firestore'; 

import { Task, TaskContextType } from '../types/Task'; 

const COLLECTION_NAME = 'tasks'; 

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const { user } = useAuth(); // 👈 3. PEGAR O UTILIZADOR LOGADO

    // ----------------------------------------------------
    // 1. LER DADOS (FILTRADOS POR USER ID)
    // ----------------------------------------------------
    useEffect(() => {
        // Se não houver utilizador, não tentamos ler nada
        if (!user) {
            setTasks([]);
            setIsLoading(false);
            return;
        }

        const tasksCollectionRef = collection(db, COLLECTION_NAME); 
        
        // 👈 4. A QUERY AGORA FILTRA PELO UID DO UTILIZADOR
        const q = query(
            tasksCollectionRef, 
            where("userId", "==", user.uid), // Apenas tarefas deste user
            orderBy('scheduledTime', 'asc')
        );
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedTasks: Task[] = snapshot.docs.map(document => {
                const data = document.data();
                const scheduledDate = data.scheduledTime?.toDate ? data.scheduledTime.toDate() : new Date(data.scheduledTime);
                
                return {
                    id: document.id,
                    ...data,
                    scheduledTime: scheduledDate,
                } as Task;
            });

            setTasks(loadedTasks);
            setIsLoading(false); 
        }, 
        (error) => {
            console.error("Erro ao carregar dados do Firestore:", error);
            setIsLoading(false);
        });

        return () => unsubscribe(); 
    }, [user]); // 👈 5. RE-EXECUTA SEMPRE QUE O USER MUDA (LOGIN/LOGOUT)

    // ----------------------------------------------------
    // 2. ADICIONAR TAREFA (VINCULADA AO USER)
    // ----------------------------------------------------
    const addTask = (newTaskData: Omit<Task, 'id' | 'isCompleted'>) => {
        if (!user) return; // Segurança: Não adiciona se não houver user

        const tasksCollectionRef = collection(db, COLLECTION_NAME);
        addDoc(tasksCollectionRef, {
            ...newTaskData,
            isCompleted: false, 
            userId: user.uid, // 👈 6. GUARDA O ID DO UTILIZADOR NA TAREFA
        });
    };

    const updateTask = async (id: string, updatedData: Partial<Task>) => {
        try {
            const taskDocRef = doc(db, COLLECTION_NAME, id); 
            await updateDoc(taskDocRef, updatedData);
            console.log("Sucesso: Tarefa atualizada!");
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            throw error;
        }
    };

    // ----------------------------------------------------
    // 3. APAGAR TAREFA
    // ----------------------------------------------------
    const removeTask = async (id: string) => {
        try {
            const taskRef = doc(db, COLLECTION_NAME, id);
            await deleteDoc(taskRef);
            console.log("Apagado com sucesso!");
        } catch (error) {
            console.error("Erro ao apagar:", error);
        }
    };
    
    // ----------------------------------------------------
    // 4. ALTERAR STATUS
    // ----------------------------------------------------
    const toggleTaskCompletion = (id: string, currentStatus: boolean) => {
        const taskDocRef = doc(db, COLLECTION_NAME, id);
        updateDoc(taskDocRef, {
            isCompleted: !currentStatus,
        });
    };

    return (
        <TaskContext.Provider value={{ 
          tasks, 
          isLoading, 
          addTask, 
          removeTask, 
          toggleTaskCompletion, 
          updateTask 
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