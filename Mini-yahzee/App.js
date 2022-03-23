import { ScrollView } from 'react-native';
import Header from "./components/Header";
import styles from "./style/style";
import Footer from "./components/Footer";
import Mainboard from "./components/Mainboard";


export default function App() {
  return (
    <ScrollView style={styles.scrollView}>
      <Header />
      <Mainboard />
      <Footer />
    </ScrollView>

    
  );
}

