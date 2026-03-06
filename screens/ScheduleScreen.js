import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import { supabase } from "../src/supabase";

const wasteOptions = ["Plastic bottles", "Food wrappers", "HDPE containers", "Metal cans", "Paper"];
const bagOptions = ["Small", "Medium", "Large"];

export default function ScheduleScreen({ route, navigation }) {
  const company = route?.params?.company;
  const [wasteType, setWasteType] = useState(wasteOptions[0]);
  const [bagSize, setBagSize] = useState(bagOptions[0]);
  const [location, setLocation] = useState("Near my area");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const savePickup = async () => {
    setMsg("");
    if (loading) return;
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("pickups").insert([{
        wasteType: wasteType,
        quantity: bagSize,
        location: location,
        status: "pending",
        creditsEarned: 0,
        userId: user?.id,
      }]);
      if (error) {
        Alert.alert("Error", error.message);
        setMsg(error.message);
        return;
      }
      Alert.alert("Success", "Pickup scheduled!");
      navigation.navigate("Home");
    } catch (e) {
      Alert.alert("Error", e.message);
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Schedule Pickup</Text>
      <Text style={styles.subtitle}>Company: {company?.name ?? "-"}</Text>
      <Text style={styles.section}>Waste type</Text>
      {wasteOptions.map((w) => (
        <TouchableOpacity key={w} style={styles.row} onPress={() => setWasteType(w)}>
          <Text>{wasteType === w ? "✅ " : "☐ "} {w}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.section}>Bag size</Text>
      {bagOptions.map((b) => (
        <TouchableOpacity key={b} style={styles.row} onPress={() => setBagSize(b)}>
          <Text>{bagSize === b ? "✅ " : "☐ "} {b}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.section}>Location</Text>
      <TextInput value={location} onChangeText={setLocation} style={styles.input} placeholder="Enter location" />
      <TouchableOpacity style={[styles.btn, loading && { opacity: 0.5 }]} onPress={savePickup} disabled={loading}>
        <Text style={{ fontWeight: "700", color: "#fff" }}>{loading ? "Saving..." : "Save Pickup"}</Text>
      </TouchableOpacity>
      {!!msg && <Text style={{ marginTop: 10, color: "red" }}>{msg}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", color: "#2D6A4F", marginTop: 48 },
  subtitle: { marginTop: 6, marginBottom: 10, color: "#444" },
  section: { marginTop: 14, fontWeight: "700" },
  row: { paddingVertical: 10 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginTop: 8 },
  btn: { marginTop: 18, padding: 14, borderRadius: 10, backgroundColor: "#2D6A4F", alignItems: "center", marginBottom: 40 },
});
