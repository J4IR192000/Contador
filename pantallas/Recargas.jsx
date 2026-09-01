import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function RechargeCounter() {
  // Estados para Recargas Individuales
  const [recargaInd, setRecargaInd] = useState('');
  const [tarjetasInd, setTarjetasInd] = useState('');

  // Estados para Recarga Auxiliar
  const [showAuxiliar, setShowAuxiliar] = useState(true);
  const [recargaAux, setRecargaAux] = useState('');
  const [tarjetasAux, setTarjetasAux] = useState('');

  // Limpiar solo valores numéricos
  const cleanInput = (text, allowDecimal = true) => {
    return allowDecimal ? text.replace(/[^0-9.]/g, '') : text.replace(/[^0-9]/g, '');
  };

  // Cálculos de Recargas Individuales
  const numRecargaInd = parseFloat(recargaInd) || 0;
  const numTarjetasInd = parseInt(tarjetasInd, 10) || 0;
  const totalTarjetasInd = numTarjetasInd * 15;
  const totalIndividuales = numRecargaInd + totalTarjetasInd;

  // Cálculos de Recarga Auxiliar
  const numRecargaAux = parseFloat(recargaAux) || 0;
  const numTarjetasAux = parseInt(tarjetasAux, 10) || 0;
  const totalTarjetasAux = numTarjetasAux * 15;
  const totalAuxiliar = numRecargaAux + totalTarjetasAux;

  // Total de Ambos
  const totalDeAmbos = totalIndividuales + totalAuxiliar;

  // Función de Limpieza
  const handleClean = () => {
    setRecargaInd('');
    setTarjetasInd('');
    setRecargaAux('');
    setTarjetasAux('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* SECCIÓN 1: RECARGAS INDIVIDUALES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recargas individuales</Text>

          {/* Campo Recarga */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>Recarga</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={recargaInd}
              onChangeText={(val) => setRecargaInd(cleanInput(val))}
            />
          </View>

          {/* Campo Tarjetas vendidas */}
          <View style={styles.inputRow}>
            <View style={styles.labelGroup}>
              <Text style={styles.label}>Tarjetas vendidas</Text>
              <Text style={styles.subLabel}>(físicas)</Text>
            </View>
            <View style={styles.cardInputGroup}>
              <TextInput
                style={styles.inputCard}
                keyboardType="numeric"
                value={tarjetasInd}
                onChangeText={(val) => setTarjetasInd(cleanInput(val, false))}
              />
              <Text style={styles.multiplyLabel}>x 15</Text>
            </View>
          </View>

          {/* Subtotal Individuales */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <View style={styles.lineResultContainer}>
              <Text style={styles.lineResultText}>
                {totalIndividuales > 0 ? `$${totalIndividuales.toLocaleString()}` : ''}
              </Text>
              <View style={styles.underline} />
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* SECCIÓN 2: RECARGA AUXILIAR */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.headerDropdown}
            onPress={() => setShowAuxiliar(!showAuxiliar)}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>Recarga Auxiliar</Text>
            <Text style={styles.arrowIcon}>{showAuxiliar ? '▼' : '►'}</Text>
          </TouchableOpacity>

          {showAuxiliar && (
            <View style={styles.auxContent}>
              {/* Campo Recarga Auxiliar */}
              <View style={styles.inputRow}>
                <Text style={styles.label}>Recarga</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={recargaAux}
                  onChangeText={(val) => setRecargaAux(cleanInput(val))}
                />
              </View>

              {/* Campo Tarjetas Auxiliar */}
              <View style={styles.inputRow}>
                <View style={styles.labelGroup}>
                  <Text style={styles.label}>Tarjetas vendidas</Text>
                  <Text style={styles.subLabel}>(físicas)</Text>
                </View>
                <View style={styles.cardInputGroup}>
                  <TextInput
                    style={styles.inputCard}
                    keyboardType="numeric"
                    value={tarjetasAux}
                    onChangeText={(val) => setTarjetasAux(cleanInput(val, false))}
                  />
                  <Text style={styles.multiplyLabel}>x 15</Text>
                </View>
              </View>

              {/* Subtotal Auxiliar */}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>TOTAL</Text>
                <View style={styles.lineResultContainer}>
                  <Text style={styles.lineResultText}>
                    {totalAuxiliar > 0 ? `$${totalAuxiliar.toLocaleString()}` : ''}
                  </Text>
                  <View style={styles.underline} />
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* SECCIÓN 3: TOTAL DE AMBOS */}
        <View style={styles.granTotalRow}>
          <Text style={styles.granTotalLabel}>TOTAL DE AMBOS</Text>
          <View style={styles.totalLineContainer}>
            <Text style={styles.granTotalValueText}>
              ${totalDeAmbos.toLocaleString()}
            </Text>
            <View style={styles.thickUnderline} />
          </View>
        </View>

        {/* Botón Limpiar */}
        <TouchableOpacity style={styles.cleanButton} onPress={handleClean}>
          <Text style={styles.cleanButtonText}>LIMPIAR</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // Cada sección ahora es una tarjeta independiente
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  divider: {
    // ya no hace falta, el espacio entre tarjetas cumple esa función
    display: 'none',
  },

  sectionTitle: {
    fontSize: 20,
    color: '#1C1C1E',
    fontWeight: '700',
    marginBottom: 14,
  },

  headerDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 16,
    color: '#8E8E93', // gris secundario iOS
    marginBottom: 14,
  },
  auxContent: {
    marginTop: 2,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  labelGroup: {
    flex: 1,
  },
  label: {
    fontSize: 17,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  subLabel: {
    fontSize: 13,
    color: '#8E8E93',
  },
  input: {
    width: 140,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    textAlign: 'right',
  },
  cardInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputCard: {
    width: 90,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
    textAlign: 'right',
  },
  multiplyLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#8E8E93',
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  lineResultContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  lineResultText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#007AFF',
  },
  underline: {
    display: 'none',
  },

  // Total general — tarjeta destacada
  granTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginTop: 4,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  granTotalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginRight: 10,
  },
  totalLineContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  granTotalValueText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#007AFF',
  },
  thickUnderline: {
    display: 'none',
  },

  cleanButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  cleanButtonText: {
    color: '#FF3B30',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});