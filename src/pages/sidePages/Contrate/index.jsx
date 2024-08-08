import FormContato from "./Forms/index";
import TituloDescricao from "./Texts/index";
import BarraNavegacao from "../../../components/Navbar/index";
import Footer from "../../../components/Footer/index";
import { Section, Content } from "./styles";

export default function Contrate() {
  return (
    <main>
      <BarraNavegacao />
      <Section>
        <Content>
          <TituloDescricao />
        </Content>
        <Content>
          <FormContato />
        </Content>
      </Section>
      <Footer />
    </main>
  );
}