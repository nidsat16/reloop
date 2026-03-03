import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function OnboardScreen() {
  return (<View style={styles.container}><Text style={styles.text}>Onboard Screen</Text><Text style={styles.sub}>Placeholder</Text></View>);
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  text: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32' },
  sub: { fontSize: 14, color: '#999', marginTop: 8 },
});
