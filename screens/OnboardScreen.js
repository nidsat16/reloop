import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../src/supabase";

export default function OnboardScreen({ navigation }) {
  const [companies, setCompanies] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    setErrorMsg("");
    const { data, error } = await supabase.from("companies").select("*");

    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setCompanies(data ?? []);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Recycling Partner</Text>

      {!!errorMsg && <Text style={styles.err}>{errorMsg}</Text>}

      {companies.map((c) => (
        <TouchableOpacity
          key={String(c.id)}
          style={styles.card}
          onPress={() => navigation.navigate("Schedule", { company: c })}
        >
          <Text style={styles.name}>{c.name}</Text>
          <Text>{c.tagline}</Text>
          <Text>Recycles: {c.wastetype}</Text>
          <Text>Offer: {c.creditoffer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: 10, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: "bold" },
  err: { color: "red", marginBottom: 10 },
});