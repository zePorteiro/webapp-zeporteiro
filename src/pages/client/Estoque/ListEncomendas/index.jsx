import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import {
  ContainerWrapper,
  ContentWrapper,
  Container,
  CabecalhoContainer,
  TituloContainer,
  Titulo,
  SelecionarDataButton,
  ImagemContainer,
  Imagem,
  DadosContainer,
  LinhaCabecalho,
  ColunaCabecalho,
  Linha,
  Coluna,
  PaginacaoContainer,
  NumeroPagina,
  BotaoSkip,
} from "./styles";

function TabelaEncomenda() {
  const [encomendas, setEncomendas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const encomendasPorPagina = 5;

  useEffect(() => {
    const fetchEncomendas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/entregas");
        setEncomendas(response.data);
      } catch (error) {
        console.error("Erro ao buscar as encomendas:", error);
      }
    };

    fetchEncomendas();
  }, []);

  useEffect(() => {
    const novaEncomenda = {
      id: "302013",
      destinatario: "Maria da Silva",
      apartamento: "115",
      bloco: "A",
      recebido: "29/04/2024",
      retirado: "30/04/2024",
    };

    setEncomendas((prevEncomendas) => [novaEncomenda, ...prevEncomendas]);
  }, []);

  const indiceUltimaEncomenda = paginaAtual * encomendasPorPagina;
  const indicePrimeiraEncomenda = indiceUltimaEncomenda - encomendasPorPagina;
  const encomendasPaginaAtual = encomendas.slice(
    indicePrimeiraEncomenda,
    indiceUltimaEncomenda
  );

  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  return (
    <ContainerWrapper>
      <ContentWrapper>
        <Container>
          <Cabecalho />
          <TabelaEncomendas encomendas={encomendasPaginaAtual} />
          <Paginacao
            totalPaginas={Math.ceil(encomendas.length / encomendasPorPagina)}
            paginaAtual={paginaAtual}
            mudarPagina={mudarPagina}
          />
        </Container>
      </ContentWrapper>
    </ContainerWrapper>
  );
}

function Cabecalho() {
  return (
    <CabecalhoContainer>
      <TituloContainer>
        <Titulo>Encomendas</Titulo>
      </TituloContainer>
      <SelecionarDataButton>
        <ImagemContainer>
          <Imagem src="https://cdn.builder.io/api/v1/image/assets/TEMP/118eaf4d0c9d7207230ff0f59dd42da874895d559bd5662fab7c4d39114cdd41?apiKey=47f1cd04243243c1a2a2819ee899bf9a&" />
        </ImagemContainer>
        Selecionar Data
      </SelecionarDataButton>
    </CabecalhoContainer>
  );
}

function TabelaEncomendas({ encomendas }) {
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);

  const selecionarLinha = (index) => {
    setLinhaSelecionada(index);
  };

  return (
    <DadosContainer>
      <LinhaCabecalho>
        <ColunaCabecalho>ID</ColunaCabecalho>
        <ColunaCabecalho>Destinatário</ColunaCabecalho>
        <ColunaCabecalho>Apartamento</ColunaCabecalho>
        <ColunaCabecalho>Bloco</ColunaCabecalho>
        <ColunaCabecalho>Data Recebido</ColunaCabecalho>
        <ColunaCabecalho>Data Retirado</ColunaCabecalho>
      </LinhaCabecalho>
      {encomendas.map((encomenda, index) => (
        <Linha
          key={index}
          onClick={() => selecionarLinha(index)}
          selecionada={linhaSelecionada === index}
        >
          <Coluna>{encomenda.id}</Coluna>
          <Coluna>{encomenda.destinatario}</Coluna>
          <Coluna>{encomenda.apartamento}</Coluna>
          <Coluna>{encomenda.bloco}</Coluna>
          <Coluna>{encomenda.recebido}</Coluna>
          <Coluna>{encomenda.retirado}</Coluna>
        </Linha>
      ))}
    </DadosContainer>
  );
}

function Paginacao({ totalPaginas, paginaAtual, mudarPagina }) {
  const handleSkipEsquerda = () => {
    mudarPagina(1);
  };

  const handleSkipDireita = () => {
    mudarPagina(totalPaginas);
  };

  const handleNumeroPagina = (numero) => {
    mudarPagina(numero);
  };

  let inicio = Math.max(1, paginaAtual - 2);
  let fim = Math.min(totalPaginas, inicio + 4);
  inicio = Math.max(1, fim - 4);

  return (
    <PaginacaoContainer>
      <BotaoSkip onClick={handleSkipEsquerda}>
        <IoIosArrowBack />
      </BotaoSkip>
      {[...Array(fim - inicio + 1).keys()].map((offset) => {
        const numeroPagina = inicio + offset;
        return (
          <NumeroPagina
            key={numeroPagina}
            onClick={() => handleNumeroPagina(numeroPagina)}
            ativo={paginaAtual === numeroPagina}
          >
            {numeroPagina}
          </NumeroPagina>
        );
      })}
      <BotaoSkip onClick={handleSkipDireita}>
        <IoIosArrowForward />
      </BotaoSkip>
    </PaginacaoContainer>
  );
}

export default TabelaEncomenda;
