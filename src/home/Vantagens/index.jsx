import Lista from "./Lista/index";
import Imagens from "./Imagem/index";
import { TextosContainer, Container, Titulo, Textos, ListaDiv, ImagemContainer } from "./styles";

function Vantagens() {
  return (
    <Container>
      <TextosContainer>
        <Titulo>
          Por que escolher os <br /> nossos serviços?
        </Titulo>
        <Textos>
          Na Zé Porteiro, simplificamos a gestão de encomendas em condomínios,
          eliminando burocracias e priorizando eficiência e comodidade. Com
          processos simplificados e comunicação ágil, redefinimos a forma como
          os condomínios lidam com entregas.
        </Textos>
        <ListaDiv>
          <Lista />
        </ListaDiv>
      </TextosContainer>

      <ImagemContainer>
        <Imagens/>
      </ImagemContainer>
      
    </Container>
  );
}

export default Vantagens;
