export type RootStackParamList = {
    // Rotas sem parâmetros
    Tasks: undefined; 
    Calendar: undefined; 
    NewTask: undefined;
    
    // Rotas com parâmetros (Editar precisa do ID)
    EditTask: { taskId: string }; 
  };