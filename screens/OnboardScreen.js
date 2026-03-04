import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { supabase } from "../src/supabase";

const COMPANIES = [
  { id: "c1", name: "FizzCo", tagline: "Refreshing responsibly" },
  { id: "c2", name: "PureLine", tagline: "Clean products, cleaner planet" },
  { id: "c3", name: "NourishCo", tagline: "Good for you, good for earth" },
];

export default function OnboardScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = async (company) => {
    setSelected(company.id);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("users").upsert({
      id: user.id,
      email: user.email,
      linkedCompanyId: company.id,
      creditBalance: 0,
    });
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose Your Recycling Partner</Text>
      {COMPANIES.map((c) => (
        <TouchableOpacity
          key={c.id}
          style={[styles.card, selected === c.id && styles.selectedCard]}
          onPress={() => handleSelect(c)}>
          <Text style={styles.cardTitle}>{c.name}</Text>
          <Text style={styles.cardSub}>{c.tagline}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", color: "#2D6A4F", marginTop: 48, marginBottom: 24 },
  card: { padding: 16, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginBottom: 12 },
  selectedCard: { borderColor: "#2D6A4F", backgroundColor: "#D8F3DC" },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardSub: { fontSize: 13, color: "#666", marginTop: 4 },
});
