import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList'; 
import { useTasks } from '../services/TaskContext'; 
import { Task } from '../types/Task';
import TaskCard from '../components/TaskCard'; // 👈 Importamos o novo componente

type TaskListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tasks'>;

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<TaskListScreenNavigationProp>();
  const { tasks, isLoading } = useTasks(); 

  // Função que define como cada item é renderizado (agora usa o TaskCard)
  const renderItem = ({ item }: { item: Task }) => (
    <TaskCard task={item} />
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#125F05" />
        <Text style={{ marginTop: 10 }}>A carregar lembretes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Meus Lembretes ({tasks.length})
      </Text>

      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem} // 👈 Chama a função ali de cima
          style={styles.list}
        />
      ) : (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Não há tarefas. Adicione uma nova!</Text>
        </View>
      )}

      <View style={styles.navButton}>
        <Button 
          title="Adicionar Novo Lembrete"
          color="#125F05"
          onPress={() => navigation.navigate('NewTask')}
        />
        <Button 
          title="Ver o Calendário"
          color="#007AFF"
          onPress={() => navigation.navigate('Calendar')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f0f0f0' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
    list: { width: '100%' },
    emptyText: { textAlign: 'center', fontSize: 16, color: '#666' },
    navButton: {
      padding: 10,
      gap: 10,
    }
});

export default TaskListScreen;