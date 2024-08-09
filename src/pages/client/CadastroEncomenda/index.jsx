import Style from "../../../assets/ClientPagesStyles"
import Sidebar from "../../../components/SideNavbar/index";
import FormSignUp from "./Forms/index";
import Image from "../../../assets/imgs/imgCadastroEncomenda.png";

import { ContainerWrapper, ContentWrapper, LogoWrapper, MainContent, Formulario, ImageWrapper } from "./styles"

function CadastrarEncomenda() {
    return (
        <ContainerWrapper>
            <Style />
            <Sidebar />
            <ContentWrapper>
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