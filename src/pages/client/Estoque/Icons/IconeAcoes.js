import React, { useState } from "react";
import styled from "styled-components";
import ModalEditarEncomenda from "./ModalEditar";

const IconeAcoes = ({ editar, deletar, encomenda }) => {
  const [modalAberto, setModalAberto] = useState(false);

  const handleEditar = () => {
    setModalAberto(true);
  };

  const handleDeletar = () => {
    deletar(encomenda.id);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  return (
    <>
      <IconeAcoesContainer>
        <Icone onClick={handleEditar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3l6 6L3 21H9a3 3 0 003-3z" />
          </svg>
        </Icone>
        <Icone onClick={handleDeletar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M5.928 6l.372 12.112a2 2 0 002 1.888h6.4a2 2 0 001.992-1.935L17.07 6M10 11v5M14 11v5" />
          </svg>
        </Icone>
      </IconeAcoesContainer>
      {modalAberto && (
        <ModalEditarEncomenda
          encomenda={encomenda}
          salvarEdicao={() => {}}
          fecharModal={fecharModal}
        />
      )}
    </>
  );
};

const IconeAcoesContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Icone = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export default IconeAcoes;
