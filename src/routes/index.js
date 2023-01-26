/**
 * aqui decide se esta logado ou nao
 */
import React, { useContext } from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { AuthContext } from "../context/auth";  //pega daqui todos os dados do usuário

function Routes() {
  const { signed } = useContext(AuthContext);  //const signed recebe useContext que passou os dados do usuario atraves do AuthContext

  return (
    signed ? <AppRoutes /> : <AuthRoutes />  //se tiver usuario cai no AppRoutes=logado, se nao cai na tela de cadastro AuthRoutes
  )
}

export default Routes;