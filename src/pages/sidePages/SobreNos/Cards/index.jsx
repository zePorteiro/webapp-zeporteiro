import { Container, Wrapper, ConteudoWrapper, Coluna, Titulo, Imagem, Cartao, TituloCaracteristica, DescricaoCaracteristica, ConteudoCaracteristicas } from "./styles";

const data = [
    {
        title: "Reduzir o tempo gasto em burocracia e comunicação.",
        description:
            "Diga adeus às horas perdidas em tarefas burocráticas e comunicações intermináveis",
    },
    {
        title: "Gerencie tudo facilmente com apenas alguns cliques.",
        description:
            "Nossa plataforma oferece uma interface intuitiva e fácil de usar",
    },
    {
        title: "Receba suas encomendas sem estresse.",
        description:
            "Nosso sistema é projetado para eliminar as preocupações associadas ao recebimento de pacotes",
    },
    {
        title: "Simplificar o rastreamento e gerenciamento de encomendas.",
        description:
            "Priorizamos garantir que os moradores tenham uma experiência de recebimento de encomendas excepcional",
    },
];

export default function Funcionalidades() {
    const firstCard = data[0];

    return (
        <Container>
            <Wrapper>
                <ConteudoWrapper>
                    <Coluna>
                        <Titulo>Nossa solução tem como objetivo</Titulo>
                    </Coluna>
                    <Coluna>
                        <Imagem
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d31f1419a69ef9cb80cdc08a3e342af440567eadbd1bd8c1c05eabf58c9f5ae6?apiKey=47f1cd04243243c1a2a2819ee899bf9a&"
                            alt="Solução"
                        />
                    </Coluna>
                    <Coluna>
                        <Cartao>
                            <TituloCaracteristica>{firstCard.title}</TituloCaracteristica>
                            <DescricaoCaracteristica>{firstCard.description}</DescricaoCaracteristica>
                        </Cartao>
                    </Coluna>
                </ConteudoWrapper>
            </Wrapper>
            <ConteudoCaracteristicas>
                {data.slice(1).map((caracteristica, index) => (
                    <Cartao key={index}>
                        <TituloCaracteristica>{caracteristica.title}</TituloCaracteristica>
                        <DescricaoCaracteristica>{caracteristica.description}</DescricaoCaracteristica>
                    </Cartao>
                ))}
            </ConteudoCaracteristicas>
        </Container>
    );
}