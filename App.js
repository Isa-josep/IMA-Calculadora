import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import {StyleSheet,Text,View,TouchableWithoutFeedback,Alert,TextInput,TouchableOpacity,Image, Linking, Modal,Picker} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [n1, setn1] = useState('');
  const [n2, setn2] = useState('');
  const [r, setR] = useState('');
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [condicion, setCondicion] = useState('');
  const [mod, setHide] = useState(false);

  const showmod = () => {
    setHide(true);
    console.log('Showmod');
  };
  const hidemod = () => {
    setHide(false);
    console.log('cerrar');
  };
  var rr;
  const suma = () => {
    if (n1 == '' || n2 == '') {
      Alert.alert('Error', 'Debes llenar los campos');
    } else {
      const ele = Math.pow(n2, 2);
      const r = parseInt(n1) / parseFloat(ele);
      const redondear = r.toFixed(1);
      rr = redondear;
      setR(rr.toString());
    }
    if (rr < 18.5) {
      setCondicion('bajo');
    } 
    else if (rr >= 18.5 && rr <= 24.4) {
      setCondicion('normal');
    } 
    else if (rr >= 25 && rr <= 29.9) {
      setCondicion('sobrepeso');
    } 
    else if (rr >= 30 && rr <= 34.9) {
      setCondicion('Obesidad 1');
    } 
    else if (rr >= 35 && rr <= 39.9) {
      setCondicion('obesidad 2');
    } 
    else if (rr >= 40) {
      setCondicion('obesidad 3');
    }
  };
  const mostrar = () => {
    Linking.openURL(
      'https://www.gob.mx/issste/articulos/que-es-el-indice-de-masa-corporal'
    );
    setCondicion('salud');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora De Indice De Masa Corporal </Text>
      <Image style={styles.deg} source={require('./IMG.png')} />
      <TextInput
        style={styles.input}
        placeholder="Ingrese Su Peso En 'KG'"
        keyboardType="numeric"
        value={n1}
        onChangeText={setn1}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese Su Estatura En 'Mts'"
        keyboardType="numeric"
        value={n2}
        onChangeText={setn2}
      />
      {/* <TextInput
      style={styles.input}
      placeholder="Resultado"
      value={r}
      editable={false} 
    /> */}

      {/* <View style={{ flexDirection: 'row' }}> */}
      <TouchableOpacity
        style={styles.contenedor}
        onPress={() => {
          suma();
          setMostrarTexto(true);
        }}>
        <LinearGradient
          colors={['#D5AAFF', '#C5A3']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.button}>
          <Text style={styles.text}>Calcular</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contenedor} onPress={showmod}>
        <LinearGradient
          colors={['#D5AAFF', '#C5A3']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.button}>
          <Text style={styles.text}>¿Que es el IMC?</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* </View> */}
      {mostrarTexto && (
        <Text style={styles.texto}>Tu índice de masa corporal es: {r} </Text>
      )}
      
      {mostrarTexto && (
        <Text
          value={condicion}
          onChangeText={setCondicion}
          style={styles.texto}>
          {condicion}
        </Text>
      )}

      <View style={styles.modal}>
        <Modal visible={mod} animationType="slide">
          <TouchableOpacity onPress={hidemod}>
            <View style={styles.content_ico}>
              <Image source={require('./src/cerrar2.png')} style={styles.ico} />
            </View>
          </TouchableOpacity>
          <View style={styles.card}>
            <Text style={styles.modalTxt}>
              El índice de masa corporal (IMC) es el peso de una persona en
              kilogramos dividido por el cuadrado de la estatura en metros. El
              IMC es un método de evaluación fácil y económico para la categoría
              de peso: bajo peso, peso saludable, sobrepeso, y obesidad.
            </Text>
          </View>
        </Modal>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
    padding: 30,
  },
  texto: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    padding: 10,
  },
  deg: {
    width: 180,
    height: 120,
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 30,
  },
  input: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    margin: 1,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  contenedor: {
    width: 200,
    alignItems: 'center',
    marginTop: 25,
  },
  modal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalTxt: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    padding: 10,
  },
  ico: {
    height: 40,
    width: 40,
    borderColor: '#ddd',
  },
  content_ico: {
    marginTop: 20,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  card: {
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 170,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: 5,
    paddingEnd: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
  },
})
;