// app/types/Task.ts

export interface Task {
    id: string; // Identificador único
    title: string;
    description: string;
    // A data/hora em que a tarefa deve ser feita (para o lembrete)
    scheduledTime: Date; 
    // O cuidador pode definir se é recorrente (diário, semanal, etc.)
    isRecurring: boolean; 
    recurrenceType?: 'daily' | 'weekly' | 'monthly';
    // Adiciona a categoria para o assistente de voz (e.g., "Medicação", "Alimentação")
    category: string; 
  }
  
  // Tipo para registar se a tarefa foi completada ou não num determinado dia
  export interface TaskCompletion {
    taskId: string;
    // A data em que o idoso completou ou devia ter completado a tarefa
    date: string; // Formato 'YYYY-MM-DD'
    isCompleted: boolean;
  }