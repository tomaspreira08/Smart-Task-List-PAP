import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTasks } from '../services/TaskContext';
import { Task } from '../types/Task';
import { styles } from './TaskCard.styles';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { removeTask } = useTasks();

  const handleDelete = () => {
    try {
      removeTask(task.id);
    } catch (err) {
      console.log("Erro ao remover:", err);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{task.title || ""}</Text>
        <Text style={styles.description} numberOfLines={2}>{task.description || "Sem descrição"}</Text>
        <Text style={styles.category}>📂 {task.category || "Geral"}</Text>
      </View>
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

export default TaskCard;