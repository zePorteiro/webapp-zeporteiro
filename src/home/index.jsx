import React from 'react';
import GlobalStyle from '../assets/GlobalStyle';
import Navigation from '../components/Navbar/index';
import PaginaPrincipal from './PaginaPrincipal/index';
import SobreNos from './SobreNos/index';
import Vantagens from './Vantagens/index';
import Aplicativo from './Aplicativo/index';
import Footer from '../components/Footer/index';
import BotaoScroll from '../components/Buttons/ScrollUp/index';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { AppContainer, AppHeader } from './AppStyles';
import { useScroll } from './AppHooks/useScroll';

function App() {
  const { mostrarBotao, rolarParaTopo } = useScroll();

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
}

export default App;