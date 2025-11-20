import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskListScreen from './app/screens/TaskListScreen'; 
/* Comente estes imports:
import NewTaskScreen from './app/screens/NewTaskScreen';
import EditTaskScreen from './app/screens/EditTaskScreen';
import CalendarScreen from './app/screens/CalendarScreen';
*/

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tasks" component={TaskListScreen} />
        {/* Comente as outras Stack.Screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}