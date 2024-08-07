import React from 'react';
import { Botao, SetaParaCima } from './styles';

const BotaoScroll = ({ mostrar, aoClicar }) => {
  return (
    <Botao mostrar={mostrar} onClick={aoClicar}>
      <SetaParaCima xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </SetaParaCima>
    </Botao>
  );
};

export default BotaoScroll;