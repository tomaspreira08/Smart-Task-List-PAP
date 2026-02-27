import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; // 👈 Removido o StyleSheet daqui
import { useTasks } from '../services/TaskContext';
import { Task } from '../types/Task';
import { styles } from './TaskCard.styles'; // 👈 Garante que o caminho está correto (se estiverem na mesma pasta é './TaskCard.styles')

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { removeTask } = useTasks();

  const handleDelete = () => {
    try {
      console.log("A remover tarefa:", task.id);
      removeTask(task.id);
    } catch (err) {
      console.log("Erro ao remover:", err);
    }
  };

  return (
    <View style={styles.card}>
      {/* Informação da Tarefa */}
      <View style={styles.info}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {task.description || "Sem descrição"}
        </Text>
        <Text style={styles.category}>📂 {task.category || "Geral"}</Text>
      </View>

      {/* Contentor de Botões de Ação */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]} 
          onPress={() => onEdit(task)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Apagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskCard; // 👈 O ficheiro termina aqui!