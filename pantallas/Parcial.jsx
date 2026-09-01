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

const DENOMINATIONS = [500, 200, 100, 50, 20, 10];

export default function CashCounter() {
  // Estado para la cantidad de billetes/monedas
  const [quantities, setQuantities] = useState({
    500: '',
    200: '',
    100: '',
    50: '',
    20: '',
    10: '',
  });

  // Estado para la lista dinámica de parciales adicionales
  const [parciales, setParciales] = useState([{ id: 1, value: '' }]);

  // Manejar el cambio de cantidad de billetes
  const handleQuantityChange = (denom, value) => {
    // Acepta solo números
    const cleanValue = value.replace(/[^0-9]/g, '');
    setQuantities((prev) => ({ ...prev, [denom]: cleanValue }));
  };

  // Agregar un nuevo parcial
  const addParcial = () => {
    setParciales((prev) => [
      ...prev,
      { id: Date.now(), value: '' },
    ]);
  };

  // Eliminar un parcial específico
  const removeParcial = (id) => {
    if (parciales.length > 1) {
      setParciales((prev) => prev.filter((item) => item.id !== id));
    } else {
      // Si solo queda 1, se borra su contenido en lugar de eliminar la fila
      setParciales([{ id: 1, value: '' }]);
    }
  };

  // Manejar el cambio en los inputs de parciales
  const handleParcialChange = (id, value) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setParciales((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: cleanValue } : item))
    );
  };

  // Limpiar todo el formulario
  const handleClean = () => {
    setQuantities({
      500: '',
      200: '',
      100: '',
      50: '',
      20: '',
      10: '',
    });
    setParciales([{ id: 1, value: '' }]);
  };

  // Cálculo del subtotal por denominación
  const getSubtotal = (denom) => {
    const qty = parseInt(quantities[denom], 10) || 0;
    return qty * denom;
  };

  // Cálculo del total de los billetes
  const totalBilletes = DENOMINATIONS.reduce(
    (acc, denom) => acc + getSubtotal(denom),
    0
  );

  // Cálculo del total de los parciales adicionales
  const totalParciales = parciales.reduce(
    (acc, item) => acc + (parseFloat(item.value) || 0),
    0
  );

  // Gran Total
  const granTotal = totalBilletes + totalParciales;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>PARCIAL</Text>
        <View style={styles.card}>
        {/* Filas de Denominaciones */}
            {DENOMINATIONS.map((denom) => {
            const subtotal = getSubtotal(denom);
            return (
                <View key={denom} style={styles.denomRow}>
                <TextInput
                    style={styles.inputSquare}
                    keyboardType="numeric"
                    value={quantities[denom]}
                    onChangeText={(val) => handleQuantityChange(denom, val)}
                />
                <Text style={styles.denomLabel}>${denom}</Text>
                <View style={styles.lineResultContainer}>
                    <Text style={styles.lineResultText}>
                    {subtotal > 0 ? `$${subtotal.toLocaleString()}` : ''}
                    </Text>
                    <View style={styles.underline} />
                </View>
                </View>
            );
            })}
        </View>

        {/* Sección de Parciales Dinámicos */}
        <View style={styles.parcialesContainer}>
          {parciales.map((item, index) => {
            const isFirst = index === 0;
            return (
              <View key={item.id} style={styles.parcialRow}>
                <Text style={styles.parcialLabel}>Parcial {index + 1}</Text>
                <TextInput
                  style={styles.parcialInput}
                  keyboardType="numeric"
                  value={item.value}
                  onChangeText={(val) => handleParcialChange(item.id, val)}
                />
                {isFirst ? (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.addButton]}
                    onPress={addParcial}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => removeParcial(item.id)}
                  >
                    <Text style={styles.buttonText}>🗑</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Gran Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <View style={styles.totalLineContainer}>
            <Text style={styles.totalValueText}>
              ${granTotal.toLocaleString()}
            </Text>
            <View style={styles.totalUnderline} />
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
    backgroundColor: '#F2F2F7', // gris sistema de iOS (fondo agrupado)
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
    letterSpacing: 0.3,
  },

  // Tarjeta contenedora para las denominaciones
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  denomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  inputSquare: {
    width: 64,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  denomLabel: {
    fontSize: 20,
    fontWeight: '500',
    width: 80,
    marginLeft: 12,
    color: '#1C1C1E',
  },
  lineResultContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  lineResultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  underline: {
    // ya no se necesita una línea dibujada; el borde de la fila cumple esa función
    display: 'none',
  },

  parcialesContainer: {
    marginTop: 4,
    marginBottom: 20,
  },
  parcialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  parcialLabel: {
    fontSize: 17,
    fontWeight: '500',
    width: 100,
    color: '#1C1C1E',
  },
  parcialInput: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    fontSize: 17,
    marginRight: 10,
    color: '#000',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18, // círculo, look nativo de iOS
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#34C759', // verde sistema iOS
  },
  deleteButton: {
    backgroundColor: '#FF3B30', // rojo sistema iOS
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    width: 100,
    color: '#1C1C1E',
  },
  totalLineContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  totalValueText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#007AFF', // azul sistema iOS (destaca el total)
  },
  totalUnderline: {
    display: 'none', // ya no hace falta, la tarjeta reemplaza la línea
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