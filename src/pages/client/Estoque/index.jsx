import React from "react";
import Style from "../../../assets/ClientPagesStyles";
import ListaEncomenda from "./ListEncomendas/index";
import MenuLateral from "../../../components/SideNavbar/index";
import Kpis from "./KPIs";
import Logo from "../../../components/Logo/index";

import { Container, Content, LogoContainer, KpisContainer } from "./styles";

const Estoque = () => (
  <Container>
    <Style />
    <MenuLateral />
    <Content>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <KpisContainer>
        <Kpis />
      </KpisContainer>
      <ListaEncomenda />
    </Content>
  </Container>
);

export default Estoque;
