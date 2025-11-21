import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👈 'useNavigation' vem daqui
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // 👈 O TIPO vem daqui!
import { RootStackParamList } from '../types/RootStackParamList'; 

// 1. IMPORTAR OS HOOKS
import { useTasks } from '../services/TaskContext'; 

type TaskListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tasks'
>;

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<TaskListScreenNavigationProp>();
  
  // 2. OBTER A LISTA DE TAREFAS
  const { tasks } = useTasks(); 

  // Componente para renderizar cada item da lista
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDetails}>Descrição: {item.description}</Text>
      <Text style={styles.taskDetails}>Categoria: {item.category}</Text>
      <Text style={styles.taskDetails}>Agendado: {item.scheduledTime.toLocaleTimeString()}</Text>
      {/* Botão de edição - usa o ID que o Contexto gerou */}
      <Button 
        title="Editar"
        onPress={() => navigation.navigate('EditTask', { taskId: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Lembretes ({tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'})</Text>

      {/* 3. Mostrar a Lista de Tarefas */}
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>Não há tarefas. Adicione uma nova!</Text>
      )}

      {/* Botão de Navegação para Adicionar */}
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
    header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    list: { width: '100%' },
    emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
    taskItem: { 
      backgroundColor: '#fff', 
      padding: 15, 
      borderRadius: 8, 
      marginVertical: 5,
      borderLeftWidth: 5,
      borderLeftColor: '#125F05' // Cor verde para indicar que está ativo/por fazer
    },
    taskTitle: { fontSize: 18, fontWeight: 'bold' },
    taskDetails: { fontSize: 14, color: '#333' },
    navButton: {
      padding: 10,
      gap: 10,
    }
});

export default TaskListScreen;