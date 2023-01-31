/**
 * Tela do Perfil
 * 
 * {user && user.nome} se tiver um usuario mostrará o usuario e o nome 
 * onPress={() => signOut()} = Arrow function: a função anonima será chamada somente quando clicada, afim de evitar o loop infinito quando a pagina carregar 
 */
import React, { useContext } from "react";
import { Container, Nome, NewLink, NewText, LogOut, LogOutText } from "./styles";
import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";  //menu de hamburger

export default function Profile() {

  const { user, signOut } = useContext(AuthContext);  //consome os dados do AuthContext, onde estão armazenados os dados do usuario
  const navigation = useNavigation()  //faz a navegação entre as rotas

  return (
    <Container>
      <Header />
      <Nome>
        {user && user.nome}
      </Nome>

      <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewText>Registrar gastos</NewText>
      </NewLink>

      <LogOut onPress={() => signOut()}>
        <LogOutText>Sair</LogOutText>
      </LogOut>
    </Container>
  )
}