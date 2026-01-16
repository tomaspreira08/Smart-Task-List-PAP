import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // 👈 Verifica se o Alert está aqui
import { useTasks } from '../services/TaskContext';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void; // 👈 Nova prop para disparar a edição
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { removeTask } = useTasks();

  const handleDelete = () => {
    console.log("Botão clicado para a tarefa:", task.id); // 👈 Adiciona este log
    
    
    Alert.alert(
      "Confirmar Eliminação",
      `Tens a certeza que queres apagar "${task.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Apagar", 
          style: "destructive", 
          onPress: () => {
            console.log("A chamar removeTask para:", task.id);
            removeTask(task.id);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>

      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={handleDelete} // 👈 Verifica se não faltam os parênteses aqui
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>Apagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#125F05',
    elevation: 2, // Sombra no Android
  },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#666' },
  category: { fontSize: 12, color: '#125F05', marginTop: 4 },
  deleteButton: { backgroundColor: '#FF3B30', padding: 8, borderRadius: 5 },
  deleteText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});

export default TaskCard;