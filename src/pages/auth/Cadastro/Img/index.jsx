import Imagem from "../../../assets/imgs/ImagemCadastro.svg";
import { Section, Image } from "./styles";

export default function SeçãoPrincipal() {
  return (
    <Section>
      <Image src={Imagem} alt="Fundo" />
    </Section>
  );
}