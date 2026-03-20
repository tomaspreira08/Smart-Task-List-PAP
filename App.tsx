import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Importar os Providers e Contextos
import { RootStackParamList } from './app/types/RootStackParamList'; 
import { TaskProvider } from './app/services/TaskContext'; 
import { AuthProvider, useAuth } from './app/services/AuthContext';

// 2. Importar os seus Ecrãs
import TaskListScreen from './app/screens/TaskListScreen'; 
import NewTaskScreen from './app/screens/NewTaskScreen';
import CalendarScreen from './app/screens/CalendarScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen'; // 👈 NOVO: Importa o ecrã de registo pessoal

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { user, loading } = useAuth();

  if (loading) return null; 

  return (
    <Stack.Navigator
      id="RootNavigation"
      screenOptions={{
        headerStyle: { backgroundColor: '#125F05' },
        headerTintColor: '#fff',
      }}
    >
      {user ? (
        // --- ECRÃS PARA UTILIZADORES LOGADOS ---
        <Stack.Group>
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
            name="Calendar" 
            component={CalendarScreen} 
            options={{ title: 'Calendário' }} 
          />
        </Stack.Group>
      ) : (
        // --- ECRÃS PARA QUEM NÃO ESTÁ LOGADO ---
        // Usamos um Stack.Group para agrupar ecrãs de autenticação
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ 
              headerShown: true, // Mostra o header para o user poder voltar atrás
              title: 'Criar Perfil Pessoal' 
            }} 
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </TaskProvider>
    </AuthProvider>
  );
}