/**
 * Menu hamburger
 * 
 * https://icons.expo.fyi/
 */
import { Container, ButtonMenu } from "./styles";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation()

  return (
    <Container>
      <ButtonMenu onPress={() => navigation.toggleDrawer()}>
        <Feather name="menu" size={30} color="#FFF" />
      </ButtonMenu>
    </Container>
  )
}