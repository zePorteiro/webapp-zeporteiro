import Sidebar from "../../../components/SideNavbar/index";
import Logo from "../../../components/Logo";
import FormSignUp from "./Forms/index";
import Image from "../../../assets/imgs/imgCadastroEncomenda.png";

import { ContainerWrapper, ContentWrapper, LogoWrapper, MainContent, Formulario, ImageWrapper } from "./styles"

function CadastrarEncomenda() {
    return (
        <ContainerWrapper>
            <Style />
            <Sidebar />
            <ContentWrapper>
                <LogoWrapper>
                    <Logo />
                </LogoWrapper>
                <MainContent>
                    <Formulario>
                        <FormSignUp />
                    </Formulario>
                    <ImageWrapper>
                        <img src={Image} alt="Imagem da tela de cadastro" />
                    </ImageWrapper>
                </MainContent>
            </ContentWrapper>
        </ContainerWrapper>
    );
}

export default CadastrarEncomenda;