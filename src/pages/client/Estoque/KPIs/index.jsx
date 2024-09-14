import React, { useState, useEffect } from "react";
import { Container, Item, Imagem, Conteudo, Titulo, Numero } from "./styles";

function Dashboard() {
  const [encomendasNoMes, setEncomendasNoMes] = useState(0);
  const [statusEstoque, setStatusEstoque] = useState("");
  const [encomendasPendentes, setEncomendasPendentes] = useState(0);
  const [capacidadeEstoque, setCapacidadeEstoque] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("URL_DO_SEU_ENDPOINT");
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();

        setEncomendasNoMes(data.encomendasNoMes);
        setCapacidadeEstoque(data.capacidadeEstoque);
        setEncomendasPendentes(data.encomendasPendentes);

        const percentualOcupado = encomendasPendentes / capacidadeEstoque;
        if (percentualOcupado >= 2 / 3) {
          setStatusEstoque("Cheio");
        } else {
          setStatusEstoque("Normal");
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, [encomendasPendentes, capacidadeEstoque]);

  return (
    <Container>
      <Item>
        <Imagem
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/308ee047e6da85562f1142955f4cb1c86ac183e0c4d94dba0be3820a49f8cfad?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
        />
        <Conteudo>
          <Titulo>Encomendas no mês</Titulo>
          <Numero>{encomendasNoMes}</Numero>
        </Conteudo>
      </Item>
      <Item>
        <Imagem
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fbf32dc03072b5fc382fc676d91a3a64bac3d56b08814003295564c48b364688?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
        />
        <Conteudo>
          <Titulo>Status</Titulo>
          <Numero>{statusEstoque}</Numero>
        </Conteudo>
      </Item>
      <Item>
        <Imagem
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/769cbe2ede928cf3ad6ae9d609df74852e46b667f94bde2cf731221ca6ff5524?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
        />
        <Conteudo>
          <Titulo>Pendentes</Titulo>
          <Numero>{encomendasPendentes}</Numero>
        </Conteudo>
      </Item>
    </Container>
  );
}

export default Dashboard;
