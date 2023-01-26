/**
 * aqui sera armazenado o usuário, afim de ser utilizado em outros componentes = onde são armazenados os dados do usuário
 * onde são armazenados os dados do usuário
 * o authprovider repassa tudo o que tem dentro dele, e por causa do createContext ele poderá ter acesso ao valor do USER
 */
import React, { useState, createContext } from "react";
import firebase from "../services/firebaseConnection";

export const AuthContext = createContext({});

function Authprovider({ children }) {
  const [user, setUser] = useState(null)

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
          })
      })
  }

  return (
    //!!user converte o valor para booleano
    <AuthContext.Provider value={{ signed: !!user, user, signUp }}>
      {children}
    </AuthContext.Provider>  //signUp tbem será exportada
  )
}

export default Authprovider;