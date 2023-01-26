/**
 * 
 */
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../contexts/auth";  //onde são armazenados os dados do usuário

export default function Home(){

  const { user } = useContext(AuthContext); //pega os dados do usuário

  return(
    <View>
      <Text>{user && user.nome}</Text>
      <Text>{user && user.email}</Text>
    </View>
  )
}