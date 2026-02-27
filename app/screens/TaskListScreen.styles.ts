import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Fundo cinza muito leve (estilo moderno)
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // --- NOVO HEADER ---
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: '500',
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1C1E',
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: '#125F05',
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // --- LISTA ---
  list: {
    paddingBottom: 120, // Espaço extra para não bater nos botões do fundo
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
  // --- MODAL ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end', // Abre de baixo para cima como apps premium
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1A1C1E',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    color: '#495057',
  },
  input: {
    backgroundColor: '#F1F3F5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  saveButton: {
    flex: 2,
    backgroundColor: '#125F05',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonTextWhite: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  buttonTextBlack: { color: '#495057', fontWeight: 'bold', fontSize: 16 },
  // --- BOTÕES FLUTUANTES NO FUNDO ---
  footerButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    gap: 10,
  },
  mainButton: {
    backgroundColor: '#125F05',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#125F05',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});