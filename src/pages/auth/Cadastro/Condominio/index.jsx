import Formulario from "./Form/index";
import VoltarHome from "../../Login/btnBackHome/index";
import ImagemCadastro from "../Img/index";

import { Main, Container, Header, Titulo, Subtitulo, ImagemContainer } from "./styles";

export default function PaginaCadastrar() {
    return (
        <Main>
            <Container>
                    <VoltarHome />
                <Header>
                    <Titulo>Cadastrar condomínio</Titulo>
                    <Subtitulo>
                        Preencha os campos com os dados do seu condomínio para preparar <br /> o
                        seu ambiente.
                    </Subtitulo>
                </Header>
                <Formulario />
            </Container>
            <ImagemContainer>
                <ImagemCadastro />
            </ImagemContainer>
        </Main>
    );
}