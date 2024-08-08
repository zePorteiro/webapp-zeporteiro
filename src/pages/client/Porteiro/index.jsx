import React from "react";
import Style from "../../../assets/ClientPagesStyles";
import ListaPorteiros from "./ListPorteiros/index";
import MenuLateral from "../../../components/SideNavbar/index";
import Logo from "../../../components/Logo/index";

import { Section, Content, LogoContainer, ListaContainer } from "./styles";

const Porteiros = () => (
  <Section>
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
  </Section>
);

export default Porteiros;