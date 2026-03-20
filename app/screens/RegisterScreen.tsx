import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth, db } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return Alert.alert("Erro", "Preenche todos os campos");
    }

    try {
      // 1. Cria o utilizador no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // 2. Guarda os dados no Firestore
      // 🚨 MUDEI DE displayName PARA nome PARA BATER CERTO COM A TASKLISTSCREEN 🚨
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        nome: name.trim(), 
        email: email.trim(),
        createdAt: new Date().toISOString()
      });

      Alert.alert("Sucesso!", `Bem-vindo, ${name}!`);
      // O Firebase deteta o login automaticamente e o App.tsx vai redirecionar-te
    } catch (error: any) {
      Alert.alert("Erro no Registo", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Perfil</Text>
      
      <TextInput 
        placeholder="Como te chamas?" 
        value={name} 
        onChangeText={setName} 
        style={styles.input} 
      />
      
      <TextInput 
        placeholder="Teu Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        autoCapitalize="none" 
        keyboardType="email-address"
      />
      
      <TextInput 
        placeholder="Escolhe uma Senha" 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} 
        secureTextEntry 
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>REGISTAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
        <Text style={styles.linkText}>Já tenho conta. Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#125F05', textAlign: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10 },
  button: { backgroundColor: '#125F05', padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 20 },
  linkText: { color: '#666', textAlign: 'center', textDecorationLine: 'underline' }
});

export default RegisterScreen;