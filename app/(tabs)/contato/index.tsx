import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { Linking, Platform, Pressable, StyleSheet } from 'react-native';

export default function ContatoScreen() {
  const headerHeight = useHeaderHeight();

  const emails = [
    { icon: 'mail-outline', label: 'emanoeloliveira@ifba.edu.br' },
    { icon: 'mail-outline', label: 'rabelo@ifba.edu.br' },
    { icon: 'mail-outline', label: 'mateuspele2015@gmail.com' },
  ];

  return (
    <ThemedScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{   paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? headerHeight : 10, paddingBottom: 80 }}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Entre em contato conosco
        </ThemedText>

        <ThemedText style={styles.paragraph}>
          Não encontrou algum ingrediente? Gostaria de sugerir uma atualização? Quer estabelecer uma parceria?
        </ThemedText>

        <ThemedText style={styles.paragraph}>
          Entre em contato e vamos conversar!
        </ThemedText>

        <ThemedView style={styles.emailList}>
          {emails.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => Linking.openURL(`mailto:${item.label}`)}
              style={styles.emailItem}
            >
              <Ionicons color={Colors.primary} name={item.icon as any} size={20} style={styles.icon} />
              <ThemedText style={styles.emailText}>{item.label}</ThemedText>
            </Pressable>
          ))}
        </ThemedView>

     
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  emailList: {
    marginTop: 16,
    gap: 12,
  },
  emailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    opacity: 0.8,
  },
  emailText: {
    fontSize: 16,
  },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.6,
  },
});
