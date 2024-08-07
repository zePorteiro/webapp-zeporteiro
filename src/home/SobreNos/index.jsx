import ButtonContratar from "./BotaoContrate/styles";
import { TextosContainer, Container, TextoPrincipal, TextoEmDestaque, Descricao } from "./styles";

const redirecionarPagina = () => {
  window.location.href = "/contrate";
};

function sobreNos() {
  return (
    <Container>
      <TextosContainer>
        <TextoPrincipal>
          <TextoEmDestaque>Conveniência</TextoEmDestaque> e{" "}
          <TextoEmDestaque>Agilidade</TextoEmDestaque> <br /> para seu
          condomínio
        </TextoPrincipal>
        <Descricao>
          A Zé Porteiro simplifica a gestão de encomendas em condomínios,
          priorizando a comunicação rápida, facilidade na retirada e eliminação
          da burocracia. Nosso objetivo é facilitar a vida de síndicos,
          administradores e moradores, oferecendo uma abordagem moderna e eficaz
          para lidar com o fluxo de encomendas.
        </Descricao>
      </TextosContainer>
      <ButtonContratar onClick={redirecionarPagina}>Contrate Já</ButtonContratar>
    </Container>
  );
}

export default sobreNos;
