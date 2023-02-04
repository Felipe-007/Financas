/**
 * Data
 * 
 * npx expo install @react-native-community/datetimepicker
 */
import React, { useState } from "react";
import { Container, Header } from "./styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Platform, TouchableOpacity, Text } from "react-native";

export default function DatePicker({ onClose, date, onChange }) {  //pega as propriedades do home/index.js

  const [dateNow, setDateNow] = useState(new Date(date));  //mostra a data de hoje

  return (
    <Container>
      {Platform.OS === 'ios' && (
        <Header>
          <TouchableOpacity onPress={onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </Header>
      )}

      <DateTimePicker
        value={dateNow}
        mode="date"
        display="default"
        onChange={(event, date) => {  //pega a data selecionada e envia para a home
          const currentDate = date || dateNow  // se não tiver nenhuma data sera mostrada a data atual
          setDateNow(currentDate)
          onChange(currentDate)
        }}
        style={{ backgroundColor: 'white' }}
      />
    </Container>
  )
}