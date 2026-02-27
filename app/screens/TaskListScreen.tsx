import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker'; // 👈 Importa o Picker
import { RootStackParamList } from '../types/RootStackParamList'; 
import { useTasks } from '../services/TaskContext'; 
import { Task } from '../types/Task';
import TaskCard from '../components/TaskCard';
import { styles } from './TaskListScreen.styles';

type TaskListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tasks'>;

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<TaskListScreenNavigationProp>();
  const { tasks, isLoading, updateTask } = useTasks(); 

  // Estados para o Modal e Edição
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Estados para controlar a visibilidade dos pickers de Data/Hora no Modal
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleOpenEdit = (task: Task) => {
    setTaskToEdit({ ...task });
    setModalVisible(true);
  };

  const handleSaveUpdate = async () => {
    if (taskToEdit) {
      try {
        await updateTask(taskToEdit.id, {
          title: taskToEdit.title,
          description: taskToEdit.description,
          date: taskToEdit.date,           // 👈 Atualiza a data
          scheduledTime: taskToEdit.scheduledTime, // 👈 Atualiza a hora
        });
        setModalVisible(false);
        setTaskToEdit(null);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível atualizar o lembrete.");
      }
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TaskCard task={item} onEdit={handleOpenEdit} />
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
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.greeting}>Olá, Tomás! 👋</Text>
          <Text style={styles.header}>Meus Lembretes</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{tasks.length}</Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Não há tarefas. Adicione uma nova!</Text>
          </View>
        }
      />

      {/* MODAL DE EDIÇÃO ATUALIZADO */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Lembrete</Text>

            <Text style={styles.label}>Título:</Text>
            <TextInput
              style={styles.input}
              value={taskToEdit?.title}
              onChangeText={(text) => setTaskToEdit(prev => prev ? {...prev, title: text} : null)}
            />

            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              style={[styles.input, { height: 60 }]}
              value={taskToEdit?.description}
              onChangeText={(text) => setTaskToEdit(prev => prev ? {...prev, description: text} : null)}
              multiline
            />

            {/* SECÇÃO DE DATA E HORA NO MODAL */}
            <Text style={styles.label}>Agendamento:</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15 }}>
              <TouchableOpacity 
                style={[styles.input, { flex: 1, alignItems: 'center' }]} 
                onPress={() => setShowDatePicker(true)}
              >
                <Text>📅 {taskToEdit?.date ? taskToEdit.date.split('-').reverse().join('/') : 'Data'}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.input, { flex: 1, alignItems: 'center' }]} 
                onPress={() => setShowTimePicker(true)}
              >
                <Text>⏰ {taskToEdit?.scheduledTime || 'Hora'}</Text>
              </TouchableOpacity>
            </View>

            {/* PICKERS PARA EDIÇÃO */}
            {showDatePicker && (
              <DateTimePicker
                value={taskToEdit?.date ? new Date(taskToEdit.date) : new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) {
                    const dString = date.toISOString().split('T')[0];
                    setTaskToEdit(prev => prev ? {...prev, date: dString} : null);
                  }
                }}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, time) => {
                  setShowTimePicker(false);
                  if (time) {
                    const tString = time.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
                    setTaskToEdit(prev => prev ? {...prev, scheduledTime: tString} : null);
                  }
                }}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonTextBlack}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveUpdate}>
                <Text style={styles.buttonTextWhite}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* BOTÕES DE NAVEGAÇÃO */}
      <View style={styles.footerButtons}>
        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={() => navigation.navigate('NewTask')}
        >
          <Text style={styles.buttonText}>+ Novo Lembrete</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mainButton, { backgroundColor: '#007AFF' }]} 
          onPress={() => navigation.navigate('Calendar')}
        >
          <Text style={styles.buttonText}>📅 Ver Calendário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskListScreen;