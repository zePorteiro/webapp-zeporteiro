import { SecaoCriacaoConta, TextoCriacaoConta, LinkFazerLogin } from "./styles";

export default function TextoParaLogin() {
    return (
      <SecaoCriacaoConta>
        <TextoCriacaoConta>Já possui uma conta?</TextoCriacaoConta>
        <LinkFazerLogin href="/login">Faça o Login</LinkFazerLogin>
      </SecaoCriacaoConta>
    );
  }