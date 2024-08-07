import Grow from "../../../assets/imgs/grow.png";
import Check from "../../../assets/imgs/check.png";
import Light from "../../../assets/imgs/lightbulb.png";
import { ListaUl, ListaContent, ListItem, IconWrapper, ContentWrapper } from "./styles";

const listaDasVantagens = [
  "Simplificação da Gestão",
  "Eliminação da Burocracia",
  "Compromisso com a Eficiência e Comodidade",
];

const listaDescricao = [
  "Na Zé Porteiro, simplificamos a gestão de encomendas em condomínios para tornar a experiência fácil e eficiente para todos os envolvidos.",
  "Eliminamos a burocracia condominial, agilizando entregas e simplificando procedimentos através de nosso sistema automatizado.",
  "Garantimos eficiência e comodidade em todas as etapas do processo de entrega, com comunicação ágil e opções flexíveis de retirada.",
];

const icones = [Light, Grow, Check];

function ListaVantagens() {
  return (
    <div>

      <ListaUl>
        {listaDasVantagens.map((vantagem, index) => (
          <ListaContent key={index}>
            <ListItem>
              <IconWrapper>
                <img src={icones[index]} alt="Ícone" />
              </IconWrapper>
              <ContentWrapper>
                <h3>{vantagem}</h3>
                <p>{listaDescricao[index]}</p>
              </ContentWrapper>
            </ListItem>
          </ListaContent>
        ))}
      </ListaUl>

    </div>
  );
}

export default ListaVantagens;
