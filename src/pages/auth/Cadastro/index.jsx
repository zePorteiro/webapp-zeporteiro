import Formulario from "./Form/index";
import VoltarHome from "../../../components/Buttons/BackHome";
import ImagemCadastro from "./Img/index";
import TextoLogin from "./TextoParaLogin/index";

import { Main, Container, BotaoVoltarHome, Header, Titulo, Subtitulo, ImagemContainer } from "./styles";

export default function PaginaCadastrar() {
    return (
        <Main>
            <Container>
                <BotaoVoltarHome>
                    <VoltarHome />
                </BotaoVoltarHome>
                <Header>
                    <Titulo>Crie sua conta</Titulo>
                    <Subtitulo>
                        Crie sua conta no Zé Porteiro e em seguida, cadastre os dados do{" "}
                        <br /> seu condomínio
                    </Subtitulo>
                </Header>
                <Formulario />
                <TextoLogin />
            </Container>
            <ImagemContainer>
                <ImagemCadastro />
            </ImagemContainer>
        </Main>
    );
}