export type RootStackParamList = {
  Tasks: undefined;
  NewTask: undefined;
  EditTask: { taskId: string }; // 👈 Garanta que o EditTask espera um taskId
  Calendar: undefined;
};