/**
 * 
 */
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";  //onde são armazenados os dados do usuário
import { Background, Container, Nome, Saldo, Title, List } from "./styles";
import Header from "../../components/Header";  //menu de hamburger
import HistoricoList from "../../components/HistoricoList";

export default function Home() {

  const { user } = useContext(AuthContext); //pega os dados do usuário

  //lista
  const [historico, setHistorico] = useState([
    { key: '1', tipo: 'receita', valor: 1200 },
    { key: '2', tipo: 'despesa', valor: 200 },
    { key: '3', tipo: 'despesa', valor: 40 },
    { key: '4', tipo: 'receita', valor: 89.69 },
    { key: '5', tipo: 'receita', valor: 89.69 },
    { key: '6', tipo: 'receita', valor: 189.69 },
    { key: '7', tipo: 'receita', valor: 9.69 },
    { key: '8', tipo: 'despesa', valor: 69 },
    { key: '9', tipo: 'receita', valor: 89 },
    { key: '10', tipo: 'despesa', valor: 89.69 },
  ]);

  return (
    <Background>
      <Header />

      <Container>
        <Nome>{ user && user.nome }</Nome>
        <Saldo>R$ 20,00</Saldo>
      </Container>

      <Title>Últimas movimentações</Title>

      <List
        showVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}  //pega a key do item
        renderItem={({ item }) => (<HistoricoList data={item} />)}  //renderiza a pagina HistoricoList de acordo com o numero de elementos da lista
      />
    </Background>
  )
}