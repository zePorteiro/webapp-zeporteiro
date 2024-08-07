import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyle from "../assets/GlobalStyle";
import Navigation from "../components/Navbar/index";
import PaginaPrincipal from "./PaginaPrincipal/index";
import SobreNos from "./SobreNos/index";
import Vantagens from "./Vantagens/index";
import Aplicativo from "./Aplicativo/index";
import Footer from "../components/Footer/index";
import BotaoScroll from "../components/btnScrollUp/index";

const AppContainer = styled.div`
  font-family: "Open Sans", "Montserrat", "Mulish", Arial, Helvetica, sans-serif;
  width: 100vw;
  height: 100vh;
  background-color: var(--background);
  box-sizing: border-box;
  scroll-behavior: smooth;
  scrollbar-width: none;
`;

const AppHeader = styled.div`
  position: relative;
  display: flex;
`;

function App() {
  const [mostrarBotao, setMostrarBotao] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setMostrarBotao(true);
    } else {
      setMostrarBotao(false);
    }
  };

  const rolarParaTopo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <GlobalStyle />

      <AppContainer>
        <AppHeader>
          <Navigation />
        </AppHeader>

        <PaginaPrincipal />
        <SobreNos />
        <Vantagens />
        <Aplicativo />
        <BotaoScroll mostrar={mostrarBotao} aoClicar={rolarParaTopo} />
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;
