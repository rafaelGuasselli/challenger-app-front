import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = ({ user }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Challengers APP</Text>
    </View>
  );
};

export const homeOptions = ({ navigation }) => ({
  title: 'Home',
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      style={{ marginRight: 16 }}
    >
      <Text style={{ color: '#1976d2', fontWeight: '600' }}>Perfil</Text>
    </TouchableOpacity>
  ),
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  title: {
    fontSize: 24, 
    fontWeight: '600',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1976d2',
  },
});

