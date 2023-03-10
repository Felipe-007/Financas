/**
 * Renderiza a pagina HistoricoList de acordo com o numero de elementos da lista Home
 * 
 */
import React from "react";
import { Container, Tipo, IconView, TipoText, ValorText } from "./styles";
import { Feather } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from "react-native";  //quando presiona cada valor ele irá fazer uma ação

export default function HistoricoList({ data, deleteItem }) {  //recebe a lista de data home/index.js e o deleteItem

  return (
    //deleteItem vem do home/index.js
    <TouchableWithoutFeedback onPress={ () => deleteItem(data) }>
      <Container>
        <Tipo>
          <IconView tipo={data.tipo}>
            <Feather
              name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'}  //se o tipo for despesa a flecha será para baixo, se não será para cima
              size={20}
              color="#FFF" />
            <TipoText>{data.tipo}</TipoText>
          </IconView>
        </Tipo>

        <ValorText>
          R$ {data.valor}
        </ValorText>
      </Container>
    </TouchableWithoutFeedback>
  )
}