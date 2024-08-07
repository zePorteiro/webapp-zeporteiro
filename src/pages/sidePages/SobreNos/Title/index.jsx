import { Section, TituloPrincipal, Descricao, TextoDescricao } from "./styles";

export default function Titulo() {
    return (
      <Section>
        <TituloPrincipal>Sobre nós</TituloPrincipal>
        <Descricao>
          <TextoDescricao>
            Revitalize a gestão das suas entregas: simplifique, agilize e <br/>
            descomplique com Zé Porteiro
          </TextoDescricao>
        </Descricao>
      </Section>
    );
  }