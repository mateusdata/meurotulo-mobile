import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AntDesign } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { Linking, Pressable, StyleSheet } from 'react-native';

export default function SobreProjetoScreen() {
  const headerHeight = useHeaderHeight();

  return (
    <ThemedScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: 80 }}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Sobre o Projeto de Pesquisa
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          A plataforma web "O que é isso no meu rótulo?" é fruto de um projeto de pesquisa para divulgação científica que consiste em um buscador de interface simples, e que permite às pessoas consultarem informações sobre origem e função dos ingredientes informados em rótulos de produtos utilizados no cotidiano, tais como produtos alimentícios, higiene pessoal, cosméticos e saneantes. Estamos constantemente atualizando a base de dados com novos ingredientes para que nossa plataforma esteja cada vez mais completa e útil para a sociedade.
        </ThemedText>

        <ThemedText type="title" style={styles.sectionTitle}>
          Qual a motivação?
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          A lista de ingredientes pouco comunica ao público consumidor em geral, uma vez que trata-se de nomes técnicos, impressos em letras pequenas e que ainda podem aparecer em língua inglesa.
        </ThemedText>

        <ThemedText type="title" style={styles.sectionTitle}>
          O projeto
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Idealizado pelo professor Emanoel Igor da Silva Oliveira, pesquisador nos grupos NEPCENT e GEPMES, e atualmente, sob a coordenação do professor Raimundo Carvalho Rabelo Filho, pesquisador nos grupos NEPCENT e LAPSID, ambos do IFBA campus Feira de Santana, o projeto, em parceria com pesquisadores das áreas de Química e Ciência da Computação e a participação de estudantes de graduação e ensino médio, tem sido desenvolvido desde 2021 vinculado à editais de pesquisa e de fluxo contínuo, contando com o apoio da PRPGI/IFBA, através de bolsas no programa de iniciação científica e tecnológica.
        </ThemedText>

        <ThemedText type="title" style={styles.sectionTitle}>
          Participantes
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Fernanda Castelo Branco - Professora BSI{'\n'}
          Davy Matos - Estudante BSI{'\n'}
          Mateus dos Santos Silva - Estudante BSI{'\n'}
          Felipe Jesus Macedo - Estudante BSI{'\n'}
          Ericka Almeida de Lima - PIBITI-EM 2021{'\n'}
          Jacson Bacellar Bittencourt - PIBITI-EM 2022{'\n'}
          Ana Luiza Araujo da Silva - PIBITI-EM 2023
        </ThemedText>

        <ThemedView style={styles.footerContainer}>
          <ThemedText style={styles.footerText}>
            Desenvolvido por Mateus Santos
          </ThemedText>
          <Pressable
            onPress={() => Linking.openURL('https://github.com/mateusdata')}
            style={styles.githubLink}
          >
            <AntDesign name="github" size={20} style={styles.githubIcon} />
            <ThemedText style={styles.githubText}>
              github.com/mateusdata
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    lineHeight: 22,
    fontSize: 16,
  },
  footerContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.7,
  },
  githubLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  githubIcon: {
    marginRight: 8,
    opacity: 0.8,
  },
  githubText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
