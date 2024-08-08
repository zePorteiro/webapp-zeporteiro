import { Container, Links, LinkText, ListItem } from "./styles";

const textosOpcoes = ["Página inicial", "Sobre nós", "Contrate"];
const links = ["/", "/sobrenos", "/contrate"];

export default function Navbar() {
  return (
    <Container>
      <Links>
        {textosOpcoes.map((texto, index) => (
          <ListItem className={index === 0 ? "verde" : "preto"} key={index}>
            <a href={links[index]} style={{ textDecoration: "none", color: "inherit" }}>
              <LinkText>{texto}</LinkText>
            </a>
          </ListItem>
        ))}
      </Links>
    </Container>
  );
}