/**
 * Adicionando uma nova despesa
 */
import React, { useState } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback} from 'react-native';

import Header from '../../components/Header';
import { Background, Input, SubmitButton, SubmitText} from './styles';
import Picker from '../../components/Picker';  //mostrará de formas distitas para ios e android

export default function New() {
 const [valor, setValor] = useState('');
 const [tipo, setTipo] = useState('receita');

 return (
    // faz com que o teclado feche quando clicado em outro lugar
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
   <Background>
       <Header/>

       <SafeAreaView style={{ alignItems: 'center' }}>
         <Input
         placeholder="Valor desejado"
         keyboardType="numeric"
         returnKeyType="next"
         onSubmitEditing={ () => Keyboard.dismiss() }
         value={valor}
         onChangeText={ (text) => setValor(text) }
         />
         
         <Picker onChange={setTipo} tipo={tipo} />  //mostrará de formas distitas para ios e android

        <SubmitButton>
          <SubmitText>Registrar</SubmitText>
        </SubmitButton>

       </SafeAreaView>

   </Background>
   </TouchableWithoutFeedback>
  );
}