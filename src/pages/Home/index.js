/**
 * 
 */
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";  //onde são armazenados os dados do usuário
import { Background, Container, Nome, Saldo, Title, List } from "./styles";
import Header from "../../components/Header";  //menu de hamburger
import HistoricoList from "../../components/HistoricoList";
import firebase from "../../services/firebaseConnection";
import format from 'date-fns/format';  //faz o controle e formatação das datas

export default function Home() {

  const [historico, setHistorico] = useState([]);  //lista
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext); //pega os dados do usuário
  const uid = user && user.uid;  //traz o id do usuario

  //será executada quando o aplicativo iniciar
  useEffect(() => {
    async function loadList() {
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);  //atualiza o setSaldo de acordo com o saldo do usuário
      });

      await firebase.database().ref('historico')
        .child(uid)
        .orderByChild('date').equalTo(format(new Date, 'dd/MM/yy'))
        .limitToLast(10).on('value', (snapshot) => {  //limite de 10 por pagina
          setHistorico([]);  //zera a lista afim de evitar duplicidade

          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor
            };

            setHistorico(oldArray => [...oldArray, list].reverse());  //pega todos os item que tem na lista e coloca o ultimo digitado, .reverse() = o ultimo sera o primeiro
          })
        })
    }

    loadList();
  }, []);

  return (
    <Background>
      <Header />

      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
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