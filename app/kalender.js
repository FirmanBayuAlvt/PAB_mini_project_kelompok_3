
import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';

export default function Kalender() {
    const today = useMemo(() => new Date(), []);
    const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(null);
    const [title, setTitle] = useState('');
    const [events, setEvents] = useState([]);

    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    function prevMonth() { setCurrent(new Date(year, month - 1, 1)); }
    function nextMonth() { setCurrent(new Date(year, month + 1, 1)); }

    function makeGrid() {
        const total = Math.ceil((firstDay + daysInMonth) / 7) * 7;
        const arr = [];
        for (let i = 0; i < total; i++) {
            const d = i - firstDay + 1;
            if (d < 1 || d > daysInMonth) arr.push(null);
            else arr.push(new Date(year, month, d));
        }
        return arr;
    }

    function addEvent() {
        if (!selectedDate || !title.trim()) return;
        const ev = { id: Date.now().toString(), date: selectedDate.toISOString(), title: title.trim() };
        setEvents(prev => [...prev, ev]);
        setTitle('');
    }

    const grid = makeGrid();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kalender</Text>
            <View style={styles.monthRow}>
                <TouchableOpacity onPress={prevMonth}><Text>{'‹'}</Text></TouchableOpacity>
                <Text style={styles.monthLabel}>{current.toLocaleString('id-ID', { month: 'long' })} {year}</Text>
                <TouchableOpacity onPress={nextMonth}><Text>{'›'}</Text></TouchableOpacity>
            </View>

            <View style={styles.weekRow}>
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(w => <Text key={w} style={styles.weekDay}>{w}</Text>)}
            </View>

            <View style={styles.grid}>
                {grid.map((d, idx) => {
                    const key = idx.toString();
                    if (!d) return <View key={key} style={styles.cellEmpty} />;
                    const iso = d.toISOString().slice(0, 10);
                    const dayEvents = events.filter(ev => ev.date.slice(0, 10) === iso);
                    const isSelected = selectedDate && selectedDate.toISOString().slice(0, 10) === iso;
                    return (
                        <TouchableOpacity key={key} style={[styles.cell, isSelected ? styles.cellSelected : null]} onPress={() => setSelectedDate(d)}>
                            <Text style={styles.cellDate}>{d.getDate()}</Text>
                            {dayEvents.slice(0, 2).map(ev => <Text key={ev.id} style={styles.dayEvent} numberOfLines={1}>{ev.title}</Text>)}
                            {dayEvents.length > 2 && <Text style={styles.more}>+{dayEvents.length - 2}</Text>}
                        </TouchableOpacity>
                    );
                })}
            </View>

            <Text style={{ alignSelf: 'flex-start', marginTop: 12, fontWeight: '600' }}>Tambah Event</Text>
            <Text style={{ color: '#666', marginBottom: 6 }}>{selectedDate ? selectedDate.toDateString() : 'Pilih tanggal'}</Text>
            <TextInput placeholder="Judul event" style={styles.input} value={title} onChangeText={setTitle} />
            <TouchableOpacity style={styles.primary} onPress={addEvent}><Text style={styles.primaryText}>Simpan Event</Text></TouchableOpacity>

            <Text style={[styles.subtitle, { marginTop: 12 }]}>Daftar Event</Text>
            <FlatList data={[...events].sort((a, b) => a.date.localeCompare(b.date))} keyExtractor={i => i.id} style={{ width: '100%' }}
                renderItem={({ item }) => (
                    <View style={styles.evRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '600' }}>{item.title}</Text>
                            <Text style={{ color: '#666' }}>{new Date(item.date).toLocaleString()}</Text>
                        </View>
                    </View>
                )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', padding: 24 },
    title: { fontSize: 28, fontWeight: '700' },
    monthRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, marginTop: 8 },
    monthLabel: { fontWeight: '700', fontSize: 18 },
    weekRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12 },
    weekDay: { width: '13%', textAlign: 'center', color: '#666' },
    grid: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 },
    cell: { width: '13%', height: 80, backgroundColor: '#fff', margin: 3, borderRadius: 8, padding: 6 },
    cellEmpty: { width: '13%', height: 80, margin: 3 },
    cellDate: { fontWeight: '700' },
    dayEvent: { fontSize: 11, color: '#333' },
    more: { fontSize: 11, color: '#666' },
    cellSelected: { borderWidth: 2, borderColor: '#2f80ed' },
    input: { width: '100%', padding: 10, backgroundColor: '#fff', borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: '#eee' },
    primary: { width: '100%', padding: 12, borderRadius: 10, backgroundColor: '#2f80ed', alignItems: 'center', marginTop: 10 },
    primaryText: { color: '#fff', fontWeight: '700' },
    subtitle: { alignSelf: 'flex-start', fontWeight: '700' },
    evRow: { width: '100%', padding: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: '#eee' },
});
