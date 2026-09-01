import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Parcial from './pantallas/Parcial';
import Recargas from './pantallas/Recargas';

export default function App() {
  const [screen, setScreen] = useState('Parcial');

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>{screen === 'Parcial' ? <Parcial /> : <Recargas />}</View>
      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.menuButton, screen === 'Parcial' && styles.menuButtonActive]}
          onPress={() => setScreen('Parcial')}
        >
          <Text style={[styles.menuText, screen === 'Parcial' && styles.menuTextActive]}>
            Parcial
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, screen === 'Recargas' && styles.menuButtonActive]}
          onPress={() => setScreen('Recargas')}
        >
          <Text style={[styles.menuText, screen === 'Recargas' && styles.menuTextActive]}>
            Recargas
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#e7e7e7',
    alignItems: 'center',
  },
  menuButtonActive: {
    backgroundColor: '#1d4ed8',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  menuTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
});
