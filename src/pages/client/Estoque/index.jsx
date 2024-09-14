import React from "react";
import Style from "../../../assets/ClientPagesStyles";
import ListaEncomenda from "./ListEncomendas/index";
import MenuLateral from "../../../components/SideNavbar/index";
import Titulo from "../../../components/Title/index"

import { Container, Content, TitleDiv, List } from "./styles";

const Estoque = () => (
  <Container>
    <Style />
    <MenuLateral />
    <Content>
      <TitleDiv>
        <Titulo texto="Encomendas" />
      </TitleDiv>
      <List>
        <ListaEncomenda />
      </List>
    </Content>
  </Container>
);

export default Estoque;
