// app/types/Task.ts

export interface Task {
  id: string; // ID único gerado pelo Firestore
  title: string; 
  description: string; 
  
  // --- AJUSTE PARA O CALENDÁRIO ---
  // Guardamos a data como String para o calendário e ordenação fácil
  date: string; // Formato: "2026-02-24"
  
  // Mantemos o scheduledTime se quiseres guardar a hora exata (opcional)
  scheduledTime?: string; // Ex: "12:30"
  
  isRecurring: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'monthly';

  // Categoria
  category: 'Medicação' | 'Alimentação' | 'Higiene' | 'Outro'; 

  // Estado de Conclusão (isCompleted)
  isCompleted: boolean; 
}

export interface TaskContextType {
  tasks: Task[];
  isLoading: boolean; 
  
  // Ajuste no addTask para incluir o novo campo 'date'
  addTask: (task: Omit<Task, 'id' | 'isCompleted'>) => void; 
  removeTask: (id: string) => void;
  toggleTaskCompletion: (id: string, currentStatus: boolean) => void;
  updateTask: (id: string, updatedData: Partial<Task>) => Promise<void>;
}