/**
 * aqui decide se esta logado ou nao
 */
import React, { useContext } from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { AuthContext } from "../contexts/auth";  //pega daqui todos os dados do usuário
import { View, ActivityIndicator } from "react-native";  //ActivityIndicator é o icone de loading

function Routes() {
  const { signed, loading } = useContext(AuthContext);  //const signed recebe useContext que passou os dados do usuario atraves do AuthContext, pega o loading do contexts/auth.js

  if (loading) {  //se o loading for true cai aqui, o loading vem do contexts/auth.js
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#131313" />
      </View>
    )
  }

  return (
    signed ? <AppRoutes /> : <AuthRoutes />  //se tiver usuario cai no AppRoutes=logado, se nao cai na tela de cadastro AuthRoutes
  )
}

export default Routes;