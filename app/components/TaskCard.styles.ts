// app/components/TaskCard.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
    flexDirection: 'row', 
    alignItems: 'center',
    borderLeftWidth: 6,
    borderLeftColor: '#125F05',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  info: { 
    flex: 1, 
    paddingRight: 10 
  },
  title: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  description: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 2 
  },
  category: { 
    fontSize: 11, 
    color: '#125F05', 
    marginTop: 6, 
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  actions: {
    flexDirection: 'column', 
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  editButton: { 
    backgroundColor: '#007AFF' 
  },
  deleteButton: { 
    backgroundColor: '#FF3B30' 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 12 
  }
});