
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Dompet from "./dompet";
import Kalender from "./kalender";
import Home from "./home";


export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'dompet' | 'kalender'

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {page === 'home' && (
          <>
            <Text style={styles.title}>Selamat Datang</Text>
            <Text style={styles.subtitle}>Di Aplikasi Kas Firalvi Terpercaya.</Text>
          </>
        )}
        {page === 'dompet' && <Dompet />}
        {page === 'kalender' && <Kalender />}
        {page === 'home' && <Home navigation={setPage} />}
      </View>

      <View style={styles.nav}>
        <TouchableOpacity onPress={() => setPage('home')} style={[styles.navBtn, page === 'home' && styles.navActive]}>
          <Text style={page === 'home' ? styles.navTextActive : styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage('dompet')} style={[styles.navBtn, page === 'dompet' && styles.navActive]}>
          <Text style={page === 'dompet' ? styles.navTextActive : styles.navText}>Dompet</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage('kalender')} style={[styles.navBtn, page === 'kalender' && styles.navActive]}>
          <Text style={page === 'kalender' ? styles.navTextActive : styles.navText}>Kalender</Text>
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
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    width: '100%',
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  nav: { height: 64, flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderColor: '#eee' },
  navBtn: { flex: 1, alignItems: 'center', padding: 12 },
  navActive: { backgroundColor: '#eef6ff' },
  navText: { color: '#666' },
  navTextActive: { color: '#2f80ed', fontWeight: '700' },
});
