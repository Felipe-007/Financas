/**
 * configurações de rota quando esta logado
 */
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import New from "../pages/New";

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
  return (
    //configuração do estilo do menu lateral
    <AppDrawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#171717'
        },
        drawerLabelStyle: {
          fontWeight: 'bold'
        },
        drawerItemStyle: {
          marginVertical: 5,
        },
        drawerActiveTintColor: '#FFF',
        drawerActiveBackgroundColor: '#00b94a',
        drawerInactiveBackgroundColor: '#000',
        drawerInactiveTintColor: '#DDD',        
      }}
    >
      <AppDrawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <AppDrawer.Screen name="Registrar" component={New} options={{ headerShown: false }} />
      <AppDrawer.Screen name="Perfil" component={Profile} options={{ headerShown: false }} />
    </AppDrawer.Navigator>
  )
}

export default AppRoutes;