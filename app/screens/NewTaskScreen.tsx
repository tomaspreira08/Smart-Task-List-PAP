import React from 'react-native';
import { View, Text } from 'react-native';

// O nome da constante deve ser 'NewTaskScreen'
const NewTaskScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Este é o Ecrã de Nova Tarefa (NewTask)</Text>
    </View>
  );
};

// Exportar o nome correto
export default NewTaskScreen;