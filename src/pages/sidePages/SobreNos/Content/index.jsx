import Funcionalidades from "../Cards/index";
import {
  Pagina,
  Introducao,
  Texto,
  ConteudoSecao,
  ContainerPrincipal,
  Titulo,
  TituloPrincipal,
  BotaoPrincipal,
  Destaque,
  Descricao
} from "./styles";

const redirecionarPagina = () => {
  window.location.href = "/contrate";
};

export default function ConteudoBody() {
  return (
    <Pagina>
      <Introducao>
        Imagine um lugar onde as entregas são tratadas com <br /> eficiência e
        agilidade. Não apenas um serviço, mas uma solução completa que integra
        modernidade e praticidade.
      </Introducao>
      <Funcionalidades />
      <Texto>
        Não apenas facilitamos a vida. Transformamos a maneira como os
        condomínios lidam com o fluxo de entregas. Na Zé Porteiro, estamos{" "}
        <br /> comprometidos em oferecer uma solução moderna e eficaz que
        simplifica, agiliza e eleva a experiência para todos os envolvidos.
      </Texto>
      <ConteudoSecao>
        <Titulo>Junte-se a nós</Titulo>
        <Descricao>
          e descubra como a Zé Porteiro pode revolucionar a maneira como você
          gerencia suas <br /> entregas. Bem-vindo ao futuro da gestão de
          encomendas. <Destaque>Bem-vindo à Zé Porteiro.</Destaque>
        </Descricao>
      </ConteudoSecao>
      <ContainerPrincipal>
        <TituloPrincipal>
          Não perca mais tempo e transforme <br />a organização do seu
          condomínio
        </TituloPrincipal>
        <BotaoPrincipal onClick={redirecionarPagina}>
          Contrate agora
        </BotaoPrincipal>
      </ContainerPrincipal>
    </Pagina>
  );
}
