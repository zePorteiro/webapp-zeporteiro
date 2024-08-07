import Celular from "../../assets/imgs/Iphone.svg";
import GooglePlay from "../../assets/imgs/google play.svg";
import { MainContainer, ImgCelular, TextosContainer, LojaAplicativo } from "./styles";

export default function Aplicativo() {
  return (
    <MainContainer>
      <ImgCelular>
        <img
          src={Celular}
          alt="Imagem de um celular com o aplicativo Zé Porteiro na tela do dispostivo."
        />
      </ImgCelular>

      <TextosContainer>
        <h1>Baixe o nosso aplicativo</h1>
        <span>
          Simplifique sua rotina e economize tempo baixando o aplicativo Zé
          Porteiro. Receba notificações em tempo real sobre suas entregas e faça
          retiradas sem complicações. Experimente agora e aproveite ao máximo
          seu tempo.
        </span>

        <LojaAplicativo>
          <img
            src={GooglePlay}
            alt="Icone que redireciona para a loja de aplicativos da Google"
          />
        </LojaAplicativo>
      </TextosContainer>
    </MainContainer>
  );
}
