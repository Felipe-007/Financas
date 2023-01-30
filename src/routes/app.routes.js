/**
 * configurações de rota quando esta logado
 */
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/Home";

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
  return (
    //configuração do estilo do menu lateral
    <AppDrawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#171717'
        },//aqui        
      }}
    >
      <AppDrawer.Screen name="Home" component={Home} />
    </AppDrawer.Navigator>
  )
}

export default AppRoutes;