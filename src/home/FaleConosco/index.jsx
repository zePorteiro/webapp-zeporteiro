import imagemFaleConosco from "../../../assets/Homem(2).svg";
import { Container, FormularioContainer, ImagemForms } from "./styles";

function FaleConosco() {
  return (
    <Container>
      <FormularioContainer>
        <h1>Fale conosco</h1>
        <span>
          Para sugestões, dúvidas ou solicitações, entre em contato <br />
          conosco através do formulário abaixo.{" "}
        </span>
        <ImagemForms>
          <img src={imagemFaleConosco} alt="" />
        </ImagemForms>
      </FormularioContainer>
    </Container>
  );
}

export default FaleConosco;
