import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../src/supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Create new account
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      } else {
        // Log into existing account
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigation.navigate('Onboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>♻ ReLoop</Text>
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text>{isSignUp ? 'Already have account? Log In' : 'No account? Sign Up'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#2D6A4F', textAlign: 'center', marginBottom: 32 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
  button: { backgroundColor: '#2D6A4F', padding: 14, borderRadius: 8, marginBottom: 12 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});
