import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

export default function Home({ navigation }) {
    const [saldo, setSaldo] = useState(1250000);
    const [transaksiCount, setTransaksiCount] = useState(8);
    const [events, setEvents] = useState([
        { id: "e1", title: "Bayar listrik", date: "2025-11-15" },
        { id: "e2", title: "Beli pakan", date: "2025-11-20" },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selamat Datang 👋</Text>
            <Text style={styles.subtitle}>Ringkasan Kas Pribadi Anda</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Saldo Saat Ini</Text>
                <Text style={styles.value}>Rp {saldo.toLocaleString("id-ID")}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Jumlah Transaksi</Text>
                <Text style={styles.value}>{transaksiCount} transaksi</Text>
            </View>

            <Text style={[styles.subtitle, { marginTop: 12 }]}>Event Terdekat</Text>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.eventRow}>
                        <Text style={{ flex: 1, fontWeight: "600" }}>{item.title}</Text>
                        <Text style={{ color: "#666" }}>
                            {new Date(item.date).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </Text>
                    </View>
                )}
            />

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation && navigation("dompet")}
                >
                    <Text style={styles.btnText}>Ke Dompet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation && navigation("kalender")}
                >
                    <Text style={styles.btnText}>Ke Kalender</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
        backgroundColor: "#f8f9fb",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 10,
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#eee",
        marginTop: 10,
    },
    label: {
        color: "#666",
    },
    value: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 4,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 16,
    },
    btn: {
        backgroundColor: "#2f80ed",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    btnText: {
        color: "#fff",
        fontWeight: "700",
    },
    eventRow: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#eee",
        marginTop: 6,
        flexDirection: "row",
        alignItems: "center",
    },
});
