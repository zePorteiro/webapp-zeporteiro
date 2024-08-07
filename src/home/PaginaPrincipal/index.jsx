import BotaoSaiba from "./ButtonSaibaMais/Button";
import ImagemUm from "./Imagem";
import { LeftContainer, Container, Titulo, Texto, ImagemContainer } from "./styles";

const redirecionarPagina = () => {
  window.location.href = "/sobrenos";
};

function PaginaPrincipal() {
  return (
    <Container>
      <LeftContainer>
        <Titulo>
          O seu parceiro na <br />
          gestão de encomendas
        </Titulo>
        <Texto>
          Oferecemos uma solução tecnológica inovadora para simplificar a gestão
          de encomendas em condomínios, visando proporcionar eficiência e
          comodidade aos moradores.
        </Texto>
        <BotaoSaiba onClick={redirecionarPagina}>Saiba mais</BotaoSaiba>
      </LeftContainer>

      <ImagemContainer>
        <ImagemUm></ImagemUm>
      </ImagemContainer>

    </Container>
  );
}

export default PaginaPrincipal;
