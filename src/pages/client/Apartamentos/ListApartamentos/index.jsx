import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCreate, IoIosTrash, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { ContainerWrapper, ContentWrapper, Container, CabecalhoContainer, TituloContainer, Titulo, ButtonContainer, ImageWrapper, StyledImage, AddButton, DadosContainer, LinhaCabecalho, ColunaCabecalho, Linha, Coluna, PaginacaoContainer, NumeroPagina, BotaoSkip } from "./styles";

export default function TabelaApartamento() {
    const [apartamentos, setApartamentos] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const apartamentosPorPagina = 5;

    useEffect(() => {
        const fetchApartamentos = async () => {
            try {
                const response = await axios.get("http://localhost:8080/apartamentos");
                setApartamentos(response.data);
            } catch (error) {
                console.error("Erro ao buscar os apartamentos:", error);
            }
        };

        fetchApartamentos();
    }, []);

    useEffect(() => {
        const novoApartamento = {
            apartamento: "101",
            morador: "Maria da Silva",
            email: "maria.silva@gmail.com",
            bloco: "A",
            celular: "(11) 92312-1234",
            fixo: "(11) 1234-5678",
        };

        setApartamentos((prevApartamentos) => [
            novoApartamento,
            ...prevApartamentos,
        ]);
    }, []);

    const indiceUltimoApartamento = paginaAtual * apartamentosPorPagina;
    const indicePrimeiroApartamento =
        indiceUltimoApartamento - apartamentosPorPagina;
    const apartamentosPaginaAtual = apartamentos.slice(
        indicePrimeiroApartamento,
        indiceUltimoApartamento
    );

    const mudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
    };

    return (
        <ContainerWrapper>
            <ContentWrapper>
                <Container>
                    <Cabecalho />
                    <TabelaDeApartamentos apartamentos={apartamentosPaginaAtual} />
                    <Paginacao
                        totalPaginas={Math.ceil(
                            apartamentos.length / apartamentosPorPagina
                        )}
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
                <Titulo>Apartamentos</Titulo>
            </TituloContainer>
            <ButtonContainer>
                <ImageWrapper>
                    <StyledImage
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8156a6a6eae06084f8a1efcbad5dddf49aa3c449142c963fe9e5efa1453377c0?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
                    />
                </ImageWrapper>
            </ButtonContainer>
        </CabecalhoContainer>
    );
}

function TabelaDeApartamentos({ apartamentos }) {
    const [linhaSelecionada, setLinhaSelecionada] = useState(null);

    const selecionarLinha = (index) => {
        setLinhaSelecionada(index);
    };

    return (
        <DadosContainer>
            <LinhaCabecalho>
                <ColunaCabecalho>Número</ColunaCabecalho>
                <ColunaCabecalho>Nome do Morador</ColunaCabecalho>
                <ColunaCabecalho>Email</ColunaCabecalho>
                <ColunaCabecalho>Bloco</ColunaCabecalho>
                <ColunaCabecalho>Telefone celular</ColunaCabecalho>
                <ColunaCabecalho>Telefone fixo</ColunaCabecalho>
                <ColunaCabecalho></ColunaCabecalho>
            </LinhaCabecalho>
            {apartamentos.map((apartamento, index) => (
                <Linha
                    key={index}
                    onClick={() => selecionarLinha(index)}
                    selecionada={linhaSelecionada === index}
                >
                    <Coluna>{apartamento.apartamento}</Coluna>
                    <Coluna>{apartamento.morador}</Coluna>
                    <Coluna>{apartamento.email}</Coluna>
                    <Coluna>{apartamento.bloco}</Coluna>
                    <Coluna>{apartamento.celular}</Coluna>
                    <Coluna>
                        {apartamento.fixo}
                        <IoIosCreate /> {/* Ícone de editar */}
                        <IoIosTrash /> {/* Ícone de excluir */}
                    </Coluna>
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