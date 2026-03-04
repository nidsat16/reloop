import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { supabase } from "../src/supabase";

export default function ScheduleScreen({ route, navigation }) {
  const company = route?.params?.company;

  const wasteOptions = [
    "Plastic bottles",
    "Food wrappers",
    "HDPE containers",
    "Metal cans",
    "Paper",
  ];
  const bagOptions = ["Small", "Medium", "Large"];

  const [wasteType, setWasteType] = useState(wasteOptions[0]);
  const [bagSize, setBagSize] = useState(bagOptions[0]);
  const [location, setLocation] = useState("Near my area");
  const [msg, setMsg] = useState("");

  const savePickup = async () => {
    setMsg("");

    if (!company?.id) {
      setMsg("No company selected");
      return;
    }

    // Save a pickup row
    const { error } = await supabase.from("pickups").insert([
      {
        company_id: company.id,     // IMPORTANT: should match companies.id type (int8)
        item: `${wasteType} (${bagSize})`,
        location: location,
        status: "pending",
      },
    ]);

    if (error) {
      setMsg(error.message);
      return;
    }

    // Go to Company screen to see pickups list
    navigation.navigate("Company", {
      companyId: company.id,
      companyName: company.name,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Pickup</Text>
      <Text style={styles.subtitle}>Company: {company?.name ?? "-"}</Text>

      <Text style={styles.section}>Waste type</Text>
      {wasteOptions.map((w) => (
        <TouchableOpacity key={w} style={styles.row} onPress={() => setWasteType(w)}>
          <Text>{wasteType === w ? "✅ " : "⬜ "} {w}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Bag size</Text>
      {bagOptions.map((b) => (
        <TouchableOpacity key={b} style={styles.row} onPress={() => setBagSize(b)}>
          <Text>{bagSize === b ? "✅ " : "⬜ "} {b}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        style={styles.input}
        placeholder="Enter location"
      />

      <TouchableOpacity style={styles.btn} onPress={savePickup}>
        <Text style={{ fontWeight: "700" }}>Save Pickup</Text>
      </TouchableOpacity>

      {!!msg && <Text style={{ marginTop: 10, color: "red" }}>{msg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700" },
  subtitle: { marginTop: 6, marginBottom: 10, color: "#444" },
  section: { marginTop: 14, fontWeight: "700" },
  row: { paddingVertical: 10 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginTop: 8 },
  btn: { marginTop: 18, padding: 14, borderRadius: 10, borderWidth: 1, alignItems: "center" },
});