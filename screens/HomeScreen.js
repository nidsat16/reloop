import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../src/supabase';

export default function HomeScreen({ navigation }) {
  const [credits, setCredits] = useState(0);
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    // Get user's credit balance
    const { data: userData } = await supabase
      .from('users')
      .select('creditBalance')
      .eq('id', user.id)
      .single();
    if (userData) setCredits(userData.creditBalance);

    // Get user's pickup history
    const { data: pickupData } = await supabase
      .from('pickups')
      .select('*')
      .eq('userId', user.id);
    if (pickupData) setPickups(pickupData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>♻ My Dashboard</Text>
      <View style={styles.creditBox}>
        <Text style={styles.creditLabel}>Your Credits</Text>
        <Text style={styles.creditAmount}>{credits} pts</Text>
      </View>
      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Schedule')}>
        <Text style={styles.buttonText}>+ Schedule Pickup</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Pickup History</Text>
      <FlatList data={pickups} keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.pickupItem}>
            <Text>{item.wasteType} — {item.quantity}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2D6A4F', marginTop: 48, marginBottom: 20 },
  creditBox: { backgroundColor: '#D8F3DC', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  creditLabel: { fontSize: 14, color: '#6B7280' },
  creditAmount: { fontSize: 40, fontWeight: 'bold', color: '#2D6A4F' },
  button: { backgroundColor: '#2D6A4F', padding: 14, borderRadius: 8, marginBottom: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  pickupItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 12,
    borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8 },
  status: { color: '#40916C', fontWeight: '600' },
});
