import React, { useState, useMemo } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useTasks } from '../services/TaskContext';
import { styles } from './CalendarScreen.styles'; 
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons'; 

// Configuração do idioma
LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'], 
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

const CalendarScreen: React.FC = () => {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const markedDates = useMemo(() => {
    const marks: any = {};

    const tasksByDate = tasks.reduce((acc: any, task) => {
      if (!acc[task.date]) acc[task.date] = [];
      acc[task.date].push(task);
      return acc;
    }, {});

    Object.keys(tasksByDate).forEach(date => {
      const dayTasks = tasksByDate[date];
      const allDone = dayTasks.every((t: any) => t.isCompleted === true);

      marks[date] = {
        customStyles: {
          container: {
            backgroundColor: allDone ? '#2ECC71' : '#E74C3C',
            borderRadius: 8,
          },
          text: {
            color: 'white',
            fontWeight: 'bold',
          },
        },
      };
    });

    marks[selectedDate] = {
      ...marks[selectedDate],
      selected: true,
      customStyles: {
        container: {
          ...(marks[selectedDate]?.customStyles?.container || {}),
          borderWidth: 3,
          borderColor: COLORS.primary,
          borderRadius: 8,
        },
        text: {
          ...(marks[selectedDate]?.customStyles?.text || { color: 'black' }),
          fontWeight: 'bold',
        }
      }
    };

    return marks;
  }, [tasks, selectedDate]);

  // Filtra as tarefas do dia clicado para o Modal
  const filteredTasks = tasks.filter(t => t.date === selectedDate);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          markingType={'custom'}
          onDayPress={handleDayPress}
          markedDates={markedDates}
          style={styles.calendar}
          firstDay={1}
          theme={{
            todayTextColor: COLORS.primary,
            textDayFontSize: 20,
            textMonthFontSize: 26,
            textDayHeaderFontSize: 14,
            textDayHeaderFontWeight: 'bold',
            // @ts-ignore
            'stylesheet.calendar.main': {
              week: {
                marginTop: 20,
                marginBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }
            }
          } as any}
        />
      </View>

      {/* Modal das Tarefas */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tarefas: {selectedDate.split('-').reverse().join('/')}</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close-circle" size={32} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={filteredTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.taskItem}>
                  <Text style={[styles.taskText, item.isCompleted && styles.completedText]}>
                    {item.title}
                  </Text>
                  {item.isCompleted ? (
                    <Ionicons name="checkmark-circle" size={26} color="#2ECC71" />
                  ) : (
                    <Ionicons name="ellipse-outline" size={26} color="#E74C3C" />
                  )}
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Sem tarefas para este dia.</Text>
              }
            />
          </View>
        </View>
      </Modal>

      <View style={styles.footerLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#2ECC71' }]} />
          <Text style={{ fontSize: 16 }}>Concluído</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#E74C3C' }]} />
          <Text style={{ fontSize: 16 }}>Pendente</Text>
        </View>
      </View>
    </View>
  );
};

export default CalendarScreen;