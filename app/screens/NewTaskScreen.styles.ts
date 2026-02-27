import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1C1E',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F1F3F5',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
  },
  // Estilo específico para os botões de Data e Hora
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 5,
  },
  dateTimeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F3F5',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    gap: 8,
  },
  dateTimeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#495057',
  },
  // Contentor das Categorias
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 5,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  categoryButtonActive: {
    backgroundColor: '#125F05', // O teu verde da PAP
    borderColor: '#125F05',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  // Botão de Guardar no fundo
  mainSaveButton: {
    backgroundColor: '#125F05',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 'auto', // Empurra o botão para o fundo do ecrã
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainSaveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});