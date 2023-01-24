/**
 * Finanças
 * 
 * expo install styled-components
 * expo install firebase@8.8.1
 */
import React from "react";
import { Cointainer, Texto } from "./src/styles";
import firebase from './src/services/firebaseConnection';

export default function App(){
  return(
    <Cointainer>
      <Texto>Finanças</Texto>
    </Cointainer>
  )
}