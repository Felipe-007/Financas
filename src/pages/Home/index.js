/**
 * 
 */
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";  //onde são armazenados os dados do usuário
import { Background, Container, Nome, Saldo, Title, List } from "./styles";
import Header from "../../components/Header";  //menu de hamburger
import HistoricoList from "../../components/HistoricoList";
import firebase from "../../services/firebaseConnection";
import { format, isBefore } from 'date-fns';  //faz o controle e formatação das datas, isPast verifica se a data já passou
import { Alert } from 'react-native';

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
        .orderByChild('date').equalTo(format(new Date, 'dd/MM/yyyy'))
        .limitToLast(10).on('value', (snapshot) => {  //limite de 10 por pagina
          setHistorico([]);  //zera a lista afim de evitar duplicidade

          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              date: childItem.val().date,
            };

            setHistorico(oldArray => [...oldArray, list].reverse());  //pega todos os item que tem na lista e coloca o ultimo digitado, .reverse() = o ultimo sera o primeiro
          })
        })
    }

    loadList();
  }, []);

  //alerta para excluir
  function handleDelete(data) {

    //Pegando data do item:
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);
    console.log(dateItem);

    //Pegando data hoje:
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);
    console.log(dateHoje);



    if (isBefore(dateItem, dateHoje)) {
      // Se a data do registro já passou vai entrar aqui!
      alert('Voce nao pode excluir um registro antigo!');
      return;
    }

    Alert.alert(
      'Cuidado Atençao!',
      `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data)  //chama o excluir abaixo
        }
      ]
    )

  }

  //excluir o registro
  async function handleDeleteSuccess(data) {
    await firebase.database().ref('historico')
      .child(uid).child(data.key).remove()
      .then(async () => {
        let saldoAtual = saldo;  //o saldoAtual recebe o valor de saldo
        data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);  //se o tipo for igual a despesa ira pegar o valor do saldo e somar, se nao ira subtrair

        await firebase.database().ref('users').child(uid)
          .child('saldo').set(saldoAtual);
      })
      .catch((error) => {
        console.log(error);
      })
  }

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
        renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}  //renderiza a pagina HistoricoList de acordo com o numero de elementos da lista, passando tbem a função deleteItem={handleDelete}
      />
    </Background>
  )
}