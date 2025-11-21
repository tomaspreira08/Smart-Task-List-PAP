import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Importar os Tipos de Navegação e o Provider
import { RootStackParamList } from './app/types/RootStackParamList'; 
import { TaskProvider } from './app/services/TaskContext'; // 👈 Provider

// 2. Importar os seus Ecrãs
import TaskListScreen from './app/screens/TaskListScreen'; 
import NewTaskScreen from './app/screens/NewTaskScreen';
import EditTaskScreen from './app/screens/EditTaskScreen';
import CalendarScreen from './app/screens/CalendarScreen';

// 3. Tipar o Stack Navigator com o RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // 💡 AQUI: Envolva a NavigationContainer no TaskProvider!
    <TaskProvider> 
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Tasks" // O ecrã que abre primeiro
        >
          <Stack.Screen 
            name="Tasks" 
            component={TaskListScreen} 
            options={{ title: 'Lembretes' }} 
          />
          <Stack.Screen 
            name="NewTask" 
            component={NewTaskScreen} 
            options={{ title: 'Nova Tarefa' }} 
          />
          <Stack.Screen 
            name="EditTask" 
            component={EditTaskScreen} 
            options={{ title: 'Editar Tarefa' }} 
          />
          <Stack.Screen 
            name="Calendar" 
            component={CalendarScreen} 
            options={{ title: 'Calendário' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider> // 👈 Fechar o Provider
  );
}