/**
 * aqui sera armazenado o usuário, afim de ser utilizado em outros componentes = onde são armazenados os dados do usuário
 * onde são armazenados os dados do usuário
 * o authprovider repassa tudo o que tem dentro dele, e por causa do createContext ele poderá ter acesso ao valor do USER
 */
import React, { useState, createContext, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";  //mantem o usuário logado

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);  //faz o loading

  //quando o aplicativo for iniciado ele irá verificar se tem alguem logado aqui, 
  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');  //procura dentro do AsyncStorage o Auth_user

      if (storageUser) {  //se tiver algum usuário dentro do AsyncStorage cai aqui
        setUser(JSON.parse(storageUser));  //passa para o setUser os valores de storageUser
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  //Função para Logar o usuário
  async function signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (value) => {  //se der tudo certo cai no .then que pega os valores atraves do value
        let uid = value.user.uid;  //cria uid para pegar o id do usuario
        await firebase.database().ref('users').child(uid).once('value')  //once busca somente uma vez o usuário no firebase
          .then((snapshot) => {  //se der tudo certo cai no .then onde a data tera o uid, nome e email
            let data = {
              uid: uid,
              nome: snapshot.val().nome,
              email: value.user.email
            };

            setUser(data);  //o setUser receberá os valores de data 
            storageUser(data);  //tbem recebe o data para poder salvar no AsyncStorage
          })
      })
      .catch((error) => {
        alert(error.code);
      });
  }

  //Cadastrar usuário
  async function signUp(email, password, nome) {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (value) => {  //se der tudo certo cai no .then que pega os valores atraves do value
        let uid = value.user.uid;  //cria uid para pegar o id do usuario
        await firebase.database().ref('users').child(uid).set({  //faz o users de acordo com uid criada, colocando nela o nome recebido e um saldo 0
          saldo: 0,
          nome: nome
        })
          .then(() => {  //se der tudo certo cai no .then onde a data tera o uid, nome e email
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
            };
            setUser(data);  //o setUser receberá os valores de data
            storageUser(data);  //tbem recebe o data para poder salvar no AsyncStorage
          })
      })
      .catch((error) => {
        alert(error.code);
      });
  }

  //Função para manter o usuário logado
  async function storageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));  //salva dentro do AsyncStorage um objeto Auth_user com as propriedades do data(dados do usuário)
  }

  //Função para deslogar
  async function signOut() {
    await firebase.auth().signOut();
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
      })
  }

  return (
    //!!user converte o valor para booleano
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>  //signUp, signIn, loading tbem será exportada, children faz com que todas as rotas tenham acesso a signUp
  )
}

export default AuthProvider;