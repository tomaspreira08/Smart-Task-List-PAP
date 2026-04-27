import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; // 👈 Importa o hook de navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { sendPasswordResetEmail } from 'firebase/auth'; // Adiciona este import

// Tipagem para a navegação
type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenProp>(); // 👈 Inicializa a navegação
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: any) {
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      return Alert.alert("Atenção", "Introduz o teu email primeiro para enviarmos o link de recuperação.");
    }
  
    sendPasswordResetEmail(auth, email.trim())
      .then(() => {
        Alert.alert("Sucesso", "Enviámos um link de redefinição para o teu email! Verifica também a pasta de Spam.");
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível enviar o email. Verifica se o endereço está correto.");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Remindly</Text>
        
        <TextInput 
          placeholder="Email" 
          value={email} 
          onChangeText={setEmail} 
          style={styles.input} 
          autoCapitalize="none" 
          keyboardType="email-address" 
        />
        
        <TextInput 
          placeholder="Senha" 
          value={password} 
          onChangeText={setPassword} 
          style={styles.input} 
          secureTextEntry 
        />

        <TouchableOpacity onPress={handleLogin} style={styles.btn}>
          <Text style={styles.btnTxt}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotLink}>
          <Text style={styles.forgotText}>Esqueci-me da senha</Text>
        </TouchableOpacity>

        {/* 🚨 BOTÃO ALTERADO: Agora navega para o ecrã de Registo 🚨 */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Register')} 
          style={styles.link}
        >
          <Text style={styles.linkTxt}>Não tem conta? Criar conta personalizada</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  
};

const styles = StyleSheet.create({
    container: { 
    flex: 1, 
    backgroundColor: '#FFF'
  },

  box: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 30
  },

  title: {
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 40, 
    color: '#125F05'
  },

  input: { 
    borderBottomWidth: 1, 
    borderColor: '#CCC', 
    marginBottom: 20, 
    padding: 8
  },

  btn: { 
    backgroundColor: '#125F05', 
    padding: 15, 
    borderRadius: 8, 
    marginTop: 10
  },

  btnTxt: { 
    color: '#FFF', 
    textAlign: 'center', 
    fontWeight: 'bold'
  },

  forgotLink: {
    marginTop: 15,
    alignSelf: 'center', // Centraliza o link
  },
  forgotText: {
    color: '#125F05', // Cor verde do teu projeto
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline', // Dá o aspeto de link clicável
  },

  link: { 
    marginTop: 25
  },

  linkTxt: { 
    color: '#666', 
    textAlign: 'center', 
    textDecorationLine: 'underline'
  },
});

export default LoginScreen;