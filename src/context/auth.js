/**
 * aqui sera armazenado o usuário, afim de ser utilizado em outros componentes = onde são armazenados os dados do usuário
 * o authprovider repassa tudo o que tem dentro dele, e por causa do createContext ele poderá ter acesso ao valor do USER
 */
import React, { useState, createContext } from "react";

export const AuthContext = createContext({});

function Authprovider({ children }) {
  const [user, setUser] = useState({
    nome: 'Felipe',
    uid: '132154'
  })

  return(
    <AuthContext.Provider value={{ user }}>
      { children }
    </AuthContext.Provider>
  )
}

export default Authprovider;