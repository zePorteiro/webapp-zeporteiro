import React from "react";
import Style from "../../../assets/ClientPagesStyles";
import ListaPorteiros from "./ListPorteiros/index";
import MenuLateral from "../../../components/SideNavbar/index";
import Titulo from "../../../components/Title/index"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Section, Content, TitleDiv, ListaContainer } from "./styles";

const queryClient = new QueryClient();

const Porteiros = () => (
  <Section>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </Section>
);

export default Porteiros;