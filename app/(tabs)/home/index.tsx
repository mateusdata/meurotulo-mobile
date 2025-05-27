import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';

import * as Haptics from 'expo-haptics';
import {
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View
} from 'react-native';

type Alimento = {
  id: number;
  nome_pt: string;
  nome_us: string;
  nome_latim: string;
  funcao_principal: string;
  origin: string;
  categoria_id: number;
};

const API_URL = 'https://meurotulo.ifba.edu.br/api';

export default function HomeScreen() {
  const [categoria, setCategoria] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [sugestoes, setSugestoes] = useState<Alimento[]>([]);
  const [erro, setErro] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const headerHeight = useHeaderHeight();
  const colorScheme = useColorScheme();

  const logo = {
    dark: "https://meurotulo.ifba.edu.br/static/media/marca-dark.dba38672ed18bbddf5f3.png",
    light: "https://meurotulo.ifba.edu.br/static/media/marca.425a3adbe9379e03ac1c.png"
  };

  useEffect(() => {
    if (searchValue.trim().length > 0 && categoria) {
      buscarSugestoes(searchValue);
    } else {
      setSugestoes([]);
    }
  }, [searchValue, categoria]);

  const buscarSugestoes = async (texto: string) => {
    try {
      const response = await fetch(`${API_URL}/seach?values=${texto}&categoria=${categoria}`);
      const data = await response.json();
      setSugestoes(data);
    } catch (error) {
      console.error('Erro ao buscar sugestões', error);
    }
  };

  const buscarAlimentos = async () => {
    if (!searchValue || !categoria) return;

    try {
      const response = await fetch(`${API_URL}/seachalimentos?values=${searchValue}&categoria=${categoria}`);
      const data = await response.json();
      setAlimentos(data);
      setSugestoes([]);
      setSearchValue('');
      setErro(data.length < 1);
      Haptics.notificationAsync(
        data.length > 0
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Error
      );
    } catch (error) {
      console.error('Erro ao buscar alimentos', error);
      setErro(true);
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      );
    }
  };

  const selecionarSugestao = (item: Alimento) => {
    setSearchValue(item.nome_pt);
    setSugestoes([]);
    Keyboard.dismiss();
  };

  const categoriaLabel = (id: number) => {
    if (id === 1) return 'Alimentícios';
    if (id === 2) return 'Corporais';
    return 'Saneantes';
  };

  const categoriaLabelByValue = (value: string) => {
    if (value === '1') return 'Alimentícios';
    if (value === '2') return 'Corporais';
    if (value === '3') return 'Saneantes';
    return 'Selecione';
  };

  return (
    <ThemedScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: Platform.OS === 'ios' ? headerHeight : 0, paddingBottom: 80 }}
    >
      <ThemedView style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: logo[colorScheme ?? 'light'] }}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        {/* Campo de busca */}
        <View style={styles.searchContainer}>
          <View style={styles.comboContainer}>
            <TouchableOpacity
              style={[
                styles.selectButton,
                { backgroundColor: colorScheme === 'dark' ? '#222' : '#e0e0e0' }
              ]}
              onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                setModalVisible(true);
              }}
            >
              <ThemedText
                onPress={() => {
                  setModalVisible(true);
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                }}
                style={{ color: colorScheme === 'dark' ? '#fff' : '#222' }}
              >
                {categoriaLabelByValue(categoria)}
              </ThemedText>
              <MaterialIcons
                name="arrow-drop-down"
                size={22}
                color={colorScheme === 'dark' ? '#fff' : '#333'}
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>

            <TextInput
              style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
              placeholder="Digite uma substância"
              placeholderTextColor="#888"
              value={searchValue}
              onChangeText={setSearchValue}
              editable={!!categoria}
              onSubmitEditing={buscarAlimentos}
            />

            <TouchableOpacity style={styles.searchButton} onPress={buscarAlimentos}>
              <ThemedText style={styles.searchIcon}>🔍</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <ThemedView style={styles.modalBox}>
                <ThemedText style={styles.modalTitle}>Escolha uma categoria</ThemedText>
                {[
                  { label: 'Alimentícios', value: '1' },
                  { label: 'Corporais', value: '2' },
                  { label: 'Saneantes', value: '3' },
                ].map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    style={styles.modalItem}
                    onPress={() => {
                      setCategoria(cat.value);
                      setModalVisible(false);
                    }}
                  >
                    <ThemedText style={styles.modalItemText}>{cat.label}</ThemedText>
                  </TouchableOpacity>
                ))}
              </ThemedView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {sugestoes.length > 0 && (
          <ScrollView
            style={[styles.suggestionsBox, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            keyboardDismissMode="on-drag"
            contentContainerStyle={{ paddingVertical: 0 }}
          >
            {sugestoes.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => selecionarSugestao(item)}
                style={styles.suggestionItem}
              >
                <ThemedText>{item.nome_pt}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {alimentos.length > 0 && (
          <ThemedView style={styles.resultBox}>
            <ThemedText type="title">{alimentos[0].nome_pt}</ThemedText>
            <ThemedText>Nome em inglês: {alimentos[0].nome_us}</ThemedText>
            <ThemedText>Nome alternative: {alimentos[0].nome_latim}</ThemedText>
            <ThemedText style={styles.resultSection}>Função Principal</ThemedText>
            <ThemedText>{alimentos[0].funcao_principal}</ThemedText>
            <ThemedText style={styles.resultSection}>Origem</ThemedText>
            <ThemedText>{alimentos[0].origin}</ThemedText>
            <ThemedText style={styles.resultSection}>Categoria</ThemedText>
            <ThemedText>{categoriaLabel(alimentos[0].categoria_id)}</ThemedText>
          </ThemedView>
        )}

        {erro && <ThemedText style={styles.error}>Substância não encontrada</ThemedText>}
      </ThemedView>
    </ThemedScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  logoContainer: { alignItems: 'center', marginTop: 30, marginBottom: 20 },
  logo: { width: 220, height: 70 },
  searchContainer: { alignItems: 'center' },
  comboContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectButton: {
    flexDirection: 'row',
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#2ebf4f',
    height: 50,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: { fontSize: 20, color: '#fff' },
  suggestionsBox: {
    position: 'absolute',
    top: 180, // ajuste conforme necessário
    left: 16,
    right: 16,
    zIndex: 999,
    maxHeight: 250,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  suggestionItem: { padding: 10, borderBottomColor: '#eee', borderBottomWidth: 1 },
  resultBox: { marginTop: 20, padding: 0, borderRadius: 8 },
  resultSection: { marginTop: 10, fontWeight: '600' },
  error: { color: 'orange', marginTop: 16, textAlign: 'center', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: '80%', padding: 20, borderRadius: 8 },
  modalTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  modalItem: { paddingVertical: 10 },
  modalItemText: { fontSize: 16 },
});
