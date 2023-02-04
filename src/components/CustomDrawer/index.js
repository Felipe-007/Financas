/**
 * Drawer personalizado
 * 
 */
import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { DrawerItemList, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";  // DrawerContentScrollView faz o scrool se a lista for grande, DrawerItemList mostra todos os outros itens que ja tem, DrawerItem cria um novo icone
import { AuthContext } from "../../contexts/auth";

export default function CustomDrawer(props) {  //props pega todas as propriedades do routes/app.routes.js

  const { user, signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
        <Image
          source={require('../../assets/Logo.png')}
          style={{ width: 85, height: 85 }}
          resizeMode='contain'  //redimenciona a imagem proporcionalmente
        />

        <Text style={{ color: '#FFF', fontSize: 18, marginTop: 5 }}>
          Bem vindo
        </Text>

        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', paddingBottom: 25 }}>
          { user && user.nome }
        </Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        {...props}
        label="Sair"
        inactiveBackgroundColor="#c62c36"
        onPress={ () => signOut() }
      />
    </DrawerContentScrollView>
  )
}