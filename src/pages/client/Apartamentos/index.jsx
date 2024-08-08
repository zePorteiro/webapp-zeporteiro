import React from "react";
import Style from "../../../assets/ClientPagesStyles";
import ListaApartamentos from "./ListApartamentos/index";
import MenuLateral from "../../../components/SideNavbar/index";
import Logo from "../../../components/Logo/index";

import { Container, Content, LogoContainer, List } from "./styles";

function Apartamentos() {
  return (
    <Container>
      <Style />
      <MenuLateral />
      <Content>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <List>
          <ListaApartamentos />
        </List>
      </Content>
    </Container>
  );
}

export default Apartamentos;