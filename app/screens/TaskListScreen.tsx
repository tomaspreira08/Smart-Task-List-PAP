import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../services/firebaseConfig';
import { useAuth } from '../services/AuthContext';
import { useTasks } from '../services/TaskContext'; 
import { RootStackParamList } from '../types/RootStackParamList'; 
import { Task } from '../types/Task';
import TaskCard from '../components/TaskCard';
import { styles } from './TaskListScreen.styles';

type TaskListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tasks'>;

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<TaskListScreenNavigationProp>();
  const { tasks, isLoading, updateTask } = useTasks(); 
  const { user } = useAuth();

  // Estados
  const [userName, setUserName] = useState('Utilizador');
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Efeito para buscar o nome do utilizador no Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            // Garante que a chave é "nome" (a mesma que usares no Register)
            setUserName(userDoc.data().nome || "Utilizador");
          }
        } catch (error) {
          console.log("Erro ao buscar nome:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleOpenEdit = (task: Task) => {
    setTaskToEdit({
      ...task,
      date: typeof task.date === 'string' ? task.date : new Date().toISOString().split('T')[0],
      scheduledTime: task.scheduledTime || "00:00"
    });
    setModalVisible(true);
  };

  const handleSaveUpdate = async () => {
    if (taskToEdit) {
      try {
        await updateTask(taskToEdit.id, {
          title: taskToEdit.title,
          description: taskToEdit.description,
          date: taskToEdit.date,
          scheduledTime: taskToEdit.scheduledTime,
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
      {/* HEADER DINÂMICO */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.greeting}>Olá, {userName}! 👋</Text>
          <Text style={styles.header}>Meus Lembretes</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={() => signOut(auth)} 
            style={{ marginRight: 15, padding: 8, backgroundColor: '#ff4444', borderRadius: 8 }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>SAIR</Text>
          </TouchableOpacity>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{tasks.length}</Text>
          </View>
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

            <Text style={styles.label}>Agendamento:</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15 }}>
              <TouchableOpacity 
                style={[styles.input, { flex: 1, alignItems: 'center', justifyContent: 'center' }]} 
                onPress={() => setShowDatePicker(true)}
              >
                <Text>📅 {taskToEdit?.date ? String(taskToEdit.date).split('-').reverse().join('/') : 'Data'}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.input, { flex: 1, alignItems: 'center', justifyContent: 'center' }]} 
                onPress={() => setShowTimePicker(true)}
              >
                <Text>⏰ {String(taskToEdit?.scheduledTime)}</Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={taskToEdit?.date ? new Date(`${taskToEdit.date}T12:00:00`) : new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate && event.type !== 'dismissed') {
                    const dString = selectedDate.toISOString().split('T')[0];
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
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime && event.type !== 'dismissed') {
                    const tString = selectedTime.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
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

      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate('NewTask')}>
          <Text style={styles.buttonText}>+ Novo Lembrete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.mainButton, { backgroundColor: '#007AFF' }]} onPress={() => navigation.navigate('Calendar')}>
          <Text style={styles.buttonText}>📅 Ver Calendário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskListScreen;