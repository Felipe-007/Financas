/**
 * 
 */
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";  //onde são armazenados os dados do usuário
import { Background, Container, Nome, Saldo, Title } from "./styles";
import Header from "../../components/Header";  //menu de hamburger

export default function Home() {

  const { user } = useContext(AuthContext); //pega os dados do usuário

  return (
    <Background>
      <Header />

      <Container>
        <Nome>Felipe Lopes</Nome>
        <Saldo>R$ 20,00</Saldo>
      </Container>

      <Title>Últimas movimentações</Title>
    </Background>
  )
}