import ImagemPage from "../../../../assets/imgs/Casal.svg";
import { Container, Image } from "./styles";

export default function Imagem() {
    return (
        <Container>
            <Image src={ImagemPage} alt="Imagem de um casal sorrindo enquanto olha pra tela de um notebook. A mulher está sentada no sofá com vestes amarelas, e o homem apoiado no sofá com vestes brancas." />
        </Container>
    )
}