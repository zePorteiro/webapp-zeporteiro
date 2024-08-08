import Voltar from "../../../components/Buttons/index";
import CriarConta from "./TextSignUp/index";
import ImagemPagina from "./Img/index";
import Formulario from "./Form/index";
import { Main, VoltarWrapper, Section, HeaderContainer, HeaderDescription, HeaderTitle, ContentWrapper, CriarContaWrapper, ImagemWrapper } from "./styles";

export default function PaginaLogin() {
    return (
        <Main>
            <VoltarWrapper>
                <Voltar />
            </VoltarWrapper>

            <Section>
                <HeaderContainer>
                    <HeaderTitle>Faça o seu login</HeaderTitle>
                    <HeaderDescription>
                        Digite o seu email e sua senha para fazer login na sua conta
                    </HeaderDescription>
                </HeaderContainer>

                <ContentWrapper>
                    <Formulario />
                </ContentWrapper>

                <CriarContaWrapper>
                    <CriarConta />
                </CriarContaWrapper>
            </Section>

            <ImagemWrapper>
                <ImagemPagina />
            </ImagemWrapper>
        </Main>
    );
}