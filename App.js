import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Parcial from './pantallas/Parcial';
import Recargas from './pantallas/Recargas';

const TAPS_REQUERIDOS = 5;
const TIEMPO_LIMITE_MS = 1500;

function AppContent() {
  const [screen, setScreen] = useState('Parcial');
  const [creditosVisible, setCreditosVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const tapCount = useRef(0);
  const lastTapTime = useRef(0);

  const handleRecargasPress = () => {
    const now = Date.now();
    if (now - lastTapTime.current > TIEMPO_LIMITE_MS) {
      tapCount.current = 0;
    }
    tapCount.current += 1;
    lastTapTime.current = now;

    if (tapCount.current >= TAPS_REQUERIDOS) {
      tapCount.current = 0;
      setCreditosVisible(true);
      return;
    }
    setScreen('Recargas');
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.content}>
        <View style={{ flex: 1, display: screen === 'Parcial' ? 'flex' : 'none' }}>
          <Parcial />
        </View>
        <View style={{ flex: 1, display: screen === 'Recargas' ? 'flex' : 'none' }}>
          <Recargas />
        </View>
      </View>

      {/* Menú con padding dinámico según el inset inferior del dispositivo */}
      <View style={[styles.menu, { paddingBottom: insets.bottom }]}>
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
          onPress={handleRecargasPress}
        >
          <Text style={[styles.menuText, screen === 'Recargas' && styles.menuTextActive]}>
            Recargas
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={creditosVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCreditosVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* <Text style={styles.modalTitle}>Créditos</Text> */}
            <Text style={styles.modalText}>App Contador</Text>
            <Text style={styles.modalText}>Desarrollado por JAIR</Text>
            <Image source={require('./assets/icon.png')} style={styles.modalIcon} />
            <Text style={styles.modalVersion}>v3.2.0</Text>
            <Text style={styles.modalVersion}>App creada para mi novia Diana ❤️</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setCreditosVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <AppContent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    flex: 1,
  },
  menu: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  menuButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  menuButtonActive: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8E8E93',
  },
  menuTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 28,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000',
  },
  modalText: {
    fontSize: 16,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  modalIcon: {
    width: 80,
    height: 80,
    marginVertical: 12,
    resizeMode: 'contain',
  },
  modalVersion: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
});