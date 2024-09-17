import { useState, useEffect } from 'react';

export const useScroll = () => {
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

  return { mostrarBotao, rolarParaTopo };
};