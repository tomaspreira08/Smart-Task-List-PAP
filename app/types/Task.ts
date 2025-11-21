// app/types/Task.ts

export interface Task {
  id: string; // ID único para editar/remover
  title: string; // Ex: "Tomar Comprimidos do Almoço"
  description: string; // Ex: "Comprimido azul e branco"
  
  // Agendamento
  scheduledTime: Date; // A data/hora exata do lembrete (pode ser ajustado para string/número, mas Date é o mais limpo)
  isRecurring: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'monthly';

  // Categoria (útil para o assistente de voz)
  category: 'Medicação' | 'Alimentação' | 'Higiene' | 'Outro'; 
}

// Tipo para o Context (o que o Context irá disponibilizar a toda a app)
export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void; // Adiciona uma nova tarefa (sem o ID, que será gerado)
  removeTask: (id: string) => void;
  // (Futuramente, vamos adicionar editTask e toggleCompletion)
}