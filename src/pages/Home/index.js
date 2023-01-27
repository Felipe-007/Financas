/**
 * 
 */
import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../contexts/auth";  //onde são armazenados os dados do usuário

export default function Home() {

  const { user, signOut } = useContext(AuthContext); //pega os dados do usuário

  return (
    <View>
      <Text>{user && user.nome}</Text>
      <Text>{user && user.email}</Text>
      <Button
        title="Sair"
        onPress={() => signOut()}
      />
    </View>
  )
}