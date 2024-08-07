import React from "react";
import Style from "../../../assets/ClientPagesStyles";
import ListaPorteiros from "./ListPorteiros/index";
import MenuLateral from "../../../components/SideNavbar/index";
import Logo from "../../../components/Logo/index";

import { Container, Content, LogoContainer, ListaContainer, Container } from "./styles";

const Porteiros = () => (
  <Container>
    <Style />
    <MenuLateral />
    <Content>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <ListaContainer>
        <ListaPorteiros />
      </ListaContainer>
    </Content>
  </Container>
);

export default Porteiros;