import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList'; 
import { useTasks } from '../services/TaskContext'; 
import { Task } from '../types/Task';
import { styles } from './NewTaskScreen.styles'; // Recomendo separar os estilos como fizemos antes

type NewTaskProps = NativeStackScreenProps<RootStackParamList, 'NewTask'>;

const categories: Task['category'][] = ['Medicação', 'Alimentação', 'Higiene', 'Outro'];

const NewTaskScreen: React.FC<NewTaskProps> = ({ navigation }) => {
  const { addTask } = useTasks(); 

  // Estados do Formulário
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Task['category']>('Medicação');
  
  // Estados para Data e Hora
  const [dateTime, setDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSaveTask = async () => {
    if (!title.trim()) {
      Alert.alert("Erro", "Por favor, insira pelo menos um título.");
      return;
    }

    // Criar o objeto conforme o novo Task.ts
    const newTaskData: Omit<Task, 'id' | 'isCompleted'> = {
      title: title.trim(),
      description: description.trim(),
      category: category,
      // Formato para o Calendário (YYYY-MM-DD)
      date: dateTime.toISOString().split('T')[0],
      // Formato para o Assistente de Voz ler (HH:mm)
      scheduledTime: dateTime.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      isRecurring: false,
    };

    try {
      await addTask(newTaskData);
      navigation.goBack(); 
    } catch (error) {
      Alert.alert("Erro", "Não foi possível guardar o lembrete.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>O que deve ser feito?</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Tomar medicação"
      />

      <Text style={styles.label}>Detalhes:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Ex: 1 comprimido após o pequeno-almoço"
        multiline
      />

      <Text style={styles.label}>Agendamento:</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {/* Seletor de Data */}
        <TouchableOpacity 
          style={[styles.input, { flex: 1, alignItems: 'center' }]} 
          onPress={() => setShowDatePicker(true)}
        >
          <Text>📅 {dateTime.toLocaleDateString('pt-PT')}</Text>
        </TouchableOpacity>

        {/* Seletor de Hora */}
        <TouchableOpacity 
          style={[styles.input, { flex: 1, alignItems: 'center' }]} 
          onPress={() => setShowTimePicker(true)}
        >
          <Text>⏰ {dateTime.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={dateTime}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setDateTime(date);
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={dateTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, date) => {
            setShowTimePicker(false);
            if (date) setDateTime(date);
          }}
        />
      )}

      <Text style={styles.label}>Categoria:</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity 
            key={cat}
            style={[
              styles.categoryButton, 
              category === cat && styles.categoryButtonActive // Aplica estilo ativo
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[
              styles.categoryText, 
              category === cat && styles.categoryTextActive
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.mainSaveButton} onPress={handleSaveTask}>
        <Text style={styles.mainSaveButtonText}>Guardar Lembrete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewTaskScreen;