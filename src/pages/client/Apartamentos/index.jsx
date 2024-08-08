import React from "react";
import Style from "../../../assets/ClientPagesStyles";
import ListaApartamentos from "./ListApartamentos/index";
import MenuLateral from "../../../components/SideNavbar/index";
import Titulo from "../../../components/Title/index"

import { Container, Content, List, TitleDiv } from "./styles";

function Apartamentos() {
  return (
    <Container>
      <Style />
      <MenuLateral />
      <Content>
        <TitleDiv>
          <Titulo texto="Apartamentos" />
        </TitleDiv>
        <List>
          <ListaApartamentos />
        </List>
      </Content>
    </Container>
  );
}

export default Apartamentos;