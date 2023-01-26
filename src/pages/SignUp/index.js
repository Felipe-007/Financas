/**
 * Tela Cadastro
 */
import React, { useState, useContext } from "react";
import { Platform } from "react-native";
import { Background, Container, AreaInput, Input, SubmitButton, SubmitText } from "./styles";
import { AuthContext } from "../../context/auth";  //onde são armazenados os dados do usuário


export default function SignUp() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp } = useContext(AuthContext);  //signUp funcao que vem do context/auth.js 

  function handleSignUp(){
    signUp(email, password, nome)
  }

  return (
    <Background behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
      <Container>        
        <AreaInput>
          <Input
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={ (text) => setEmail(setNome) }
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={ (text) => setEmail(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={ (text) => setPassword(text) }
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  )
}