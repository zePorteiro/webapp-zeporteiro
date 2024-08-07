import { Section, Link, Text } from "./styles";

export default function TextoParaCadastro() {
    return (
        <Section>
            <Text>Ainda não possui uma conta?</Text>
            <Link href="/cadastrar">Crie uma agora</Link>
        </Section>
    );
}