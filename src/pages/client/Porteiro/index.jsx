import React from "react";
import Style from "../../../assets/ClientPagesStyles";
import ListaPorteiros from "./ListPorteiros/index";
import MenuLateral from "../../../components/SideNavbar/index";
import Titulo from "../../../components/Title/index"

import { Section, Content, TitleDiv, ListaContainer } from "./styles";

const Porteiros = () => (
  <Section>
    <Style />
    <MenuLateral />
    <Content>
      <TitleDiv>
        <Titulo texto="Porteiros" />
      </TitleDiv>
      <ListaContainer>
        <ListaPorteiros />
      </ListaContainer>
    </Content>
  </Section>
);

export default Porteiros;