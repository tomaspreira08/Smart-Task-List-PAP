import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Task List Screen - Teste Mínimo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adiciona cor de fundo
  },
});

export default TaskListScreen;