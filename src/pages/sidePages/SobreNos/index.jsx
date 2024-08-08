import React, { useState, useEffect } from 'react';
import { Section } from './styles';

import BarraNavegacao from "../../../components/Navbar/index";
import Titulos from "./Title/index";
import Imagem from "./Image/index";
import MeioTextos from "./MidContent/index";
import Conteudo from "./Content/index";
import BotaoScroll from '../../../components/Buttons/ScrollUp/index';
import Footer from "../../../components/Footer/index";


export default function SobreNos() {

  const [mostrarBotao, setMostrarBotao] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setMostrarBotao(true);
    } else {
      setMostrarBotao(false);
    }
  };

  const rolarParaTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Section>
      <BarraNavegacao />
      <Titulos />
      <Imagem />
      <MeioTextos/>
      <Conteudo/>
      <BotaoScroll mostrar={mostrarBotao} aoClicar={rolarParaTopo} />
      <Footer/>
    </Section>
  );
}