import React from "react";
import Style from "../../../assets/ClientPagesStyles"; // Verificar o que esse arquivo contém
import ListaApartamentos from "./ListApartamentos/index";
import MenuLateral from "../../../components/SideNavbar/index";
import Titulo from "../../../components/Title/index";

import { Container, Content, List, TitleDiv } from "./styles";

function Apartamentos() {
  return (
    <Container>
      {/* Se Style for um CSS ou Styled Component, certifique-se de importá-lo corretamente */}
      <Style /> {/* Verifique a função de Style */}
      
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
