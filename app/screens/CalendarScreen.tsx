import React, { useState, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useTasks } from '../services/TaskContext';
import TaskCard from '../components/TaskCard';
import { styles } from './CalendarScreen.styles';
import { COLORS } from '../constants/theme';

// Configuração para Português
LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt';

const CalendarScreen: React.FC = () => {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Marcar no calendário os dias que têm tarefas
  const markedDates = useMemo(() => {
    const marks: any = {};
    tasks.forEach(task => {
      if (task.date) { // Certifica-te que a tua Task tem o campo 'date'
        marks[task.date] = { 
          marked: true, 
          dotColor: COLORS.primary 
        };
      }
    });
    
    // Destacar o dia selecionado
    marks[selectedDate] = {
      ...marks[selectedDate],
      selected: true,
      selectedColor: COLORS.primary,
    };
    
    return marks;
  }, [tasks, selectedDate]);

  // Filtrar tarefas do dia selecionado
  const filteredTasks = tasks.filter(t => t.date === selectedDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendário</Text>
      </View>

      <Calendar
        style={styles.calendar}
        theme={{
          todayTextColor: COLORS.primary,
          arrowColor: COLORS.primary,
          selectedDayBackgroundColor: COLORS.primary,
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
        }}
        onDayPress={(day: any) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
      />

      <View style={styles.taskList}>
        <Text style={styles.sectionTitle}>
          Tarefas de {selectedDate.split('-').reverse().join('/')}
        </Text>
        
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard task={item} onEdit={() => {}} /> 
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
              Nenhum lembrete para este dia.
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default CalendarScreen;