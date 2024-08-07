import VoltarIcon from "../../../assets/imgs/icon-back.png";
import { VoltarParaHomeWrapper, VoltarParaHomeTexto, VoltarParaHomeIcon } from "./styles";

export default function VoltarParaHome() {
  return (
    <VoltarParaHomeWrapper href="/">
      <VoltarParaHomeIcon src={VoltarIcon} alt="Ícone de Voltar para o site" />
      <VoltarParaHomeTexto>Voltar para o site</VoltarParaHomeTexto>
    </VoltarParaHomeWrapper>
  );
}