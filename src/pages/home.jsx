import { View, Text, StyleSheet } from 'react-native';

const Home = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Challengers APP</Text>
    </View>
  );
};

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
