import Imagem from "../../../../assets/imgs/ImagemLogin.svg";
import { ImageWrapper, Image } from "./styles";

export default function ImagemLogin() {
    return (
        <ImageWrapper>
            <Image src={Imagem} alt="Imagem de uma cidade em tons de verde" />
        </ImageWrapper>
    )
}