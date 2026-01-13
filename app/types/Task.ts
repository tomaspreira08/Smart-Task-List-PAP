// app/types/Task.ts

export interface Task {
  id: string; // ID único para editar/remover (gerado pelo Firestore)
  title: string; // Ex: "Tomar Comprimidos do Almoço"
  description: string; // Ex: "Comprimido azul e branco"
  
  // Agendamento
  scheduledTime: Date; // A data/hora exata do lembrete
  isRecurring: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'monthly';

  // Categoria
  category: 'Medicação' | 'Alimentação' | 'Higiene' | 'Outro'; 

  // Estado de Conclusão (Lógica Verde/Vermelho)
  isCompleted: boolean; 
}

// Tipo para o Context (o que o Context disponibiliza para a App)
export interface TaskContextType {
  tasks: Task[];
  
  // Indica se o Firebase ainda está a carregar os dados
  isLoading: boolean; // 👈 ADICIONADO PARA RESOLVER O ERRO
  
  // Funções de manipulação
  addTask: (task: Omit<Task, 'id' | 'isCompleted'>) => void; 
  removeTask: (id: string) => void;
  toggleTaskCompletion: (id: string, currentStatus: boolean) => void;
}