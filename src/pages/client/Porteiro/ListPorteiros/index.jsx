import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function TabelaPorteiro() {
  const [porteiros, setPorteiros] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const porteirosPorPagina = 5;

  useEffect(() => {
    const fetchPorteiros = async () => {
      try {
        const response = await axios.get("http://localhost:8080/porteiros");
        setPorteiros(response.data);
      } catch (error) {
        console.error("Erro ao buscar os porteiros:", error);
      }
    };

    fetchPorteiros();
  }, []);

  useEffect(() => {
    const novoPorteiro = {
      id: "101",
      nome: "Maria da Silva",
      email: "maria.silva@gmail.com",
      turno: "A",
      rg: "12.345.678-9",
      telefone: "(11) 91234-5678",
    };

    setPorteiros((prevPorteiros) => [novoPorteiro, ...prevPorteiros]);
  }, []);

  const indiceUltimoPorteiro = paginaAtual * porteirosPorPagina;
  const indicePrimeiroPorteiro = indiceUltimoPorteiro - porteirosPorPagina;
  const porteirosPaginaAtual = porteiros.slice(
    indicePrimeiroPorteiro,
    indiceUltimoPorteiro
  );

  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  return (
    <ContainerWrapper>
      <ContentWrapper>
        <Container>
          <Cabecalho />
          <TabelaDePorteiros porteiros={porteirosPaginaAtual} />
          <Paginacao
            totalPaginas={Math.ceil(porteiros.length / porteirosPorPagina)}
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
        <Titulo>Porteiros</Titulo>
      </TituloContainer>
      <ButtonContainer>
      <ImageWrapper>
        <StyledImage
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8156a6a6eae06084f8a1efcbad5dddf49aa3c449142c963fe9e5efa1453377c0?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
        />
      </ImageWrapper>
      <AddButton>Adicionar</AddButton>
    </ButtonContainer>
    <ButtonContainer>
      <ImageWrapper>
        <StyledImage
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8156a6a6eae06084f8a1efcbad5dddf49aa3c449142c963fe9e5efa1453377c0?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
        />
      </ImageWrapper>
      <AddCsvButton>Adicionar com CSV</AddCsvButton>
    </ButtonContainer>
    </CabecalhoContainer>
  );
}

function TabelaDePorteiros({ porteiros }) {
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);

  const selecionarLinha = (index) => {
    setLinhaSelecionada(index);
  };
  return (
    <DadosContainer>
  <LinhaCabecalho>
    <ColunaCabecalho>ID</ColunaCabecalho>
    <ColunaCabecalho>Nome do Porteiro</ColunaCabecalho>
    <ColunaCabecalho>Email</ColunaCabecalho>
    <ColunaCabecalho>Turno</ColunaCabecalho>
    <ColunaCabecalho>RG</ColunaCabecalho>
    <ColunaCabecalho>Telefone</ColunaCabecalho>
  </LinhaCabecalho>
  {porteiros.map((porteiros, index) => (
    <Linha
      key={index}
      onClick={() => selecionarLinha(index)}
      selecionada={linhaSelecionada === index}
    >
      <Coluna>{porteiros.id}</Coluna>
      <Coluna>{porteiros.nome}</Coluna>
      <Coluna>{porteiros.email}</Coluna>
      <Coluna>{porteiros.turno}</Coluna>
      <Coluna>{porteiros.rg}</Coluna>
      <Coluna>{porteiros.telefone}</Coluna>
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
      <BotaoSkip onClick={handleSkipEsquerda}><IoIosArrowBack /></BotaoSkip>
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
      <BotaoSkip onClick={handleSkipDireita}><IoIosArrowForward /></BotaoSkip>
    </PaginacaoContainer>
  );
}

export default TabelaPorteiro;