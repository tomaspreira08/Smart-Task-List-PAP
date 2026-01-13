import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native'; // 👈 Adicionei ActivityIndicator
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList'; 
import { useTasks } from '../services/TaskContext'; 

type TaskListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tasks'>;

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<TaskListScreenNavigationProp>();
  
  // 1. OBTER tasks E isLoading DO CONTEXTO
  const { tasks, isLoading } = useTasks(); 

  // 2. SE ESTIVER A CARREGAR, MOSTRA UM CÍRCULO DE LOADING
  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#125F05" />
        <Text style={{ marginTop: 10 }}>A ligar ao servidor...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDetails}>Descrição: {item.description}</Text>
      <Text style={styles.taskDetails}>Categoria: {item.category}</Text>
      {/* 3. PROTEÇÃO PARA A DATA: O Firestore pode demorar a converter o objeto Date */}
      <Text style={styles.taskDetails}>
        Agendado: {item.scheduledTime instanceof Date ? item.scheduledTime.toLocaleTimeString() : 'A carregar hora...'}
      </Text>
      
      <Button 
        title="Editar"
        onPress={() => navigation.navigate('EditTask', { taskId: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Lembretes ({tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'})</Text>

      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
          onPress={() => navigation.navigate('NewTask')}
        />
        <Button 
          title="Ver o Calendário"
          onPress={() => navigation.navigate('Calendar')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f0f0f0' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' }, // 👈 Adicionado para centralizar loading/mensagens
    header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    list: { width: '100%' },
    emptyText: { textAlign: 'center', fontSize: 16, color: '#666' },
    taskItem: { 
      backgroundColor: '#fff', 
      padding: 15, 
      borderRadius: 8, 
      marginVertical: 5,
      borderLeftWidth: 5,
      borderLeftColor: '#125F05' 
    },
    taskTitle: { fontSize: 18, fontWeight: 'bold' },
    taskDetails: { fontSize: 14, color: '#333' },
    navButton: {
      padding: 10,
      gap: 10,
    }
});

export default TaskListScreen;