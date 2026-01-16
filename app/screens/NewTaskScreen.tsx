import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// Tipos e Hooks de Navegação
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList'; 

// Context e Tipos de Tarefa
import { useTasks } from '../services/TaskContext'; // 👈 O nosso hook
import { Task } from '../types/Task';

// Define os tipos das props para este ecrã
type NewTaskProps = NativeStackScreenProps<RootStackParamList, 'NewTask'>;

// Opções de Categoria para o formulário
const categories: Task['category'][] = ['Medicação', 'Alimentação', 'Higiene', 'Outro'];

const NewTaskScreen: React.FC<NewTaskProps> = ({ navigation }) => {
  // 1. Obter a função addTask do Contexto
  const { addTask } = useTasks(); 

  // Estados do Formulário
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Task['category']>('Medicação'); 
  // Nota: Deixamos o campo de data e hora para mais tarde, por agora é fixo/mock.

  // 2. Lógica de Submissão da Tarefa
  const handleSaveTask = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Erro", "Por favor, preencha o título e a descrição.");
      return;
    }

    // Criar o objeto da nova tarefa
    const newTaskData: Omit<Task, 'id' | 'isCompleted'> = {
      title: title.trim(),
      description: description.trim(),
      category: category,
      scheduledTime: new Date(), // MOCK: Usamos a hora atual por agora
      isRecurring: false, // MOCK: Por agora, tarefas não recorrentes
    };

    // Chamar a função do Contexto para adicionar a tarefa
    addTask(newTaskData);
    
    // Navegar de volta para o ecrã principal
    navigation.goBack(); 
    
    // Podemos também limpar o formulário, mas o goBack é suficiente.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do Lembrete:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Tomar Comprimidos do Almoço"
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Ex: Comprimido azul e branco"
        multiline
      />

      <Text style={styles.label}>Categoria:</Text>
      {/* Para simplificar no terminal, usamos botões para mudar a categoria.
        Mais tarde, trocaremos por um Picker (dropdown).
      */}
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <Button 
            key={cat}
            title={cat}
            onPress={() => setCategory(cat)}
            color={category === cat ? '#007AFF' : '#CCCCCC'}
          />
        ))}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Guardar Lembrete" 
          onPress={handleSaveTask} 
          color="#125F05" // Cor Verde
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 30,
  }
});

export default NewTaskScreen;