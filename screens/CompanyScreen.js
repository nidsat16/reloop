import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { supabase } from "../src/supabase";

export default function CompanyScreen({ route }) {
  const companyId = route?.params?.companyId;
  const companyName = route?.params?.companyName ?? "Company";

  const [pickups, setPickups] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!companyId) return;
    loadPickups();
  }, [companyId]);

  const loadPickups = async () => {
    setErrorMsg("");
    const { data, error } = await supabase
      .from("pickups")
      .select("*")
      .eq("company_id", companyId)
      .order("id", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setPickups(data ?? []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{companyName} Pickups</Text>
      {!!errorMsg && <Text style={{ color: "red", marginTop: 10 }}>{errorMsg}</Text>}

      <FlatList
        style={{ marginTop: 12 }}
        data={pickups}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={{ marginTop: 10 }}>No pickups yet</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight: "700" }}>{item.item}</Text>
            <Text>{item.location}</Text>
            {item.status ? <Text>Status: {item.status}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700" },
  card: { paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee" },
});