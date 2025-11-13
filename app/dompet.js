
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function Dompet() {
    const [transactions, setTransactions] = useState([
        { id: 't1', type: 'in', amount: 500000, desc: 'Saldo awal', date: new Date().toISOString() },
    ]);
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('in');

    const balance = transactions.reduce((s, t) => s + (t.type === 'in' ? t.amount : -t.amount), 0);

    function addTx() {
        const a = parseFloat(amount.replace(/[^0-9.-]/g, '')) || 0;
        if (a <= 0) return;
        const tx = { id: Date.now().toString(), type, amount: a, desc: desc || (type === 'in' ? 'Pemasukan' : 'Pengeluaran'), date: new Date().toISOString() };
        setTransactions(prev => [...prev, tx]);
        setAmount(''); setDesc('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dompet — Kas Pribadi</Text>
            <View style={styles.card}>
                <Text style={styles.label}>Saldo</Text>
                <Text style={styles.balance}>Rp {balance.toFixed(0)}</Text>
            </View>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => setType('in')} style={[styles.typeBtn, type === 'in' && styles.typeActive]}>
                    <Text style={styles.typeText}>Pemasukan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType('out')} style={[styles.typeBtn, type === 'out' && styles.typeActive]}>
                    <Text style={styles.typeText}>Pengeluaran</Text>
                </TouchableOpacity>
            </View>

            <TextInput value={amount} onChangeText={setAmount} placeholder="Jumlah (example: 150000)" keyboardType="numeric" style={styles.input} />
            <TextInput value={desc} onChangeText={setDesc} placeholder="Deskripsi (opsional)" style={styles.input} />
            <TouchableOpacity onPress={addTx} style={styles.primary}><Text style={styles.primaryText}>Tambah Transaksi</Text></TouchableOpacity>

            <Text style={styles.subtitle}>Riwayat</Text>
            <FlatList data={[...transactions].reverse()} keyExtractor={i => i.id} style={{ width: '100%' }}
                renderItem={({ item }) => (
                    <View style={styles.tx}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.txDesc}>{item.desc}</Text>
                            <Text style={styles.txDate}>{new Date(item.date).toLocaleString()}</Text>
                        </View>
                        <Text style={[styles.txAmount, item.type === 'in' ? styles.in : styles.out]}>
                            {item.type === 'in' ? '+' : '-'} Rp {item.amount.toFixed(0)}
                        </Text>
                    </View>
                )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', padding: 24 },
    title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
    card: { width: '100%', padding: 12, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#eee', marginBottom: 8 },
    label: { color: '#666' },
    balance: { fontSize: 22, fontWeight: '700', marginTop: 6 },
    row: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    typeBtn: { flex: 1, padding: 10, margin: 4, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
    typeActive: { backgroundColor: '#eaf1ff', borderColor: '#2f80ed' },
    typeText: { fontWeight: '700' },
    input: { width: '100%', padding: 10, backgroundColor: '#fff', borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: '#eee' },
    primary: { width: '100%', padding: 12, borderRadius: 10, backgroundColor: '#2f80ed', alignItems: 'center', marginTop: 10 },
    primaryText: { color: '#fff', fontWeight: '700' },
    subtitle: { alignSelf: 'flex-start', fontWeight: '700', marginTop: 12 },
    tx: { width: '100%', padding: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: '#eee' },
    txDesc: { fontWeight: '600' },
    txDate: { color: '#666', fontSize: 12 },
    txAmount: { fontWeight: '700' },
    in: { color: '#2ecc71' },
    out: { color: '#e74c3c' },
});
