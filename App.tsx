import React from 'react'; // Adicionado para garantir compatibilidade
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Importar os Tipos de Navegação e o Provider
import { RootStackParamList } from './app/types/RootStackParamList'; 
import { TaskProvider } from './app/services/TaskContext'; 

// 2. Importar os seus Ecrãs
import TaskListScreen from './app/screens/TaskListScreen'; 
import NewTaskScreen from './app/screens/NewTaskScreen';
import EditTaskScreen from './app/screens/EditTaskScreen';
import CalendarScreen from './app/screens/CalendarScreen';

// 3. Criar o Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <TaskProvider> 
      <NavigationContainer>
        <Stack.Navigator
          id="RootStack"
          initialRouteName="Tasks"
          screenOptions={{
            headerStyle: { backgroundColor: '#125F05' }, // Um toque visual para a sua PAP
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen 
            name="Tasks" 
            component={TaskListScreen} 
            options={{ title: 'Os Meus Lembretes' }} 
          />
          <Stack.Screen 
            name="NewTask" 
            component={NewTaskScreen} 
            options={{ title: 'Adicionar Lembrete' }} 
          />
          <Stack.Screen 
            name="EditTask" 
            component={EditTaskScreen as any} // O 'as any' ajuda se houver conflito de tipos no ID
            options={{ title: 'Editar Detalhes' }} 
          />
          <Stack.Screen 
            name="Calendar" 
            component={CalendarScreen} 
            options={{ title: 'Agenda' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}