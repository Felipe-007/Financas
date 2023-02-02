/**
 * Adicionando uma nova despesa
 * 
 * expo install date-fns  //faz o controle e formatação das datas
 */
import React, { useState, useContext } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';

import Header from '../../components/Header';
import { Background, Input, SubmitButton, SubmitText } from './styles';
import Picker from '../../components/Picker';  //mostrará de formas distitas para ios e android
import firebase from "../../services/firebaseConnection";
import format from 'date-fns/format';  //faz o controle e formatação das datas
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';  //consome os dados do usuário

export default function New() {

  const navigation = useNavigation();
  const { user: usuario } = useContext(AuthContext);  //consome os dados do usuário, user: usuario renomeia a variavel somente aqui para usuario

  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');

  function handleSubmit() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor)) || tipo === null) { //verifica se realmente é um numero, tipo === null e se o campo não esta vazio
      alert('Preencha todos os campos!');
    return;
  }

    //faz um alerta personalizado
    Alert.alert(
      'Confirmando dados',
      `Tipo ${tipo} - Valor: ${parseFloat(valor)} `,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  
   }

  //adiciona ou remove a despesa
  async function handleAdd() {
    let uid = usuario.uid;  //recebe o uid do AuthContext, que foi alterado somente aqui o nome para usuario

    let key = await firebase.database().ref('historico').child(uid).push().key;  //pego o usuário de acordo com o uid
    await firebase.database().ref('historico').child(uid).child(key).set({  //cria uma database historico com base no uid
      tipo: tipo,  //sera Receita ou Despesa
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yy')
    })

    //Atualizar o nosso saldo
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot)=>{
      let saldo = parseFloat(snapshot.val().saldo);  //pegar o valor e coloca dentro da variavel saldo

      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);  //se o tipo for despesa pegará o valor e irá subtrair, se nao irá somar

      user.child('saldo').set(saldo);  //salva o valor atualizado
    });

    Keyboard.dismiss();
    setValor('');
    navigation.navigate('Home');
  }

  return (
    // faz com que o teclado feche quando clicado em outro lugar
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />

        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={(text) => setValor(text)}
          />

          <Picker onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>

      </Background>
    </TouchableWithoutFeedback>
  );
}