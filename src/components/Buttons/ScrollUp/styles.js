import styled from "styled-components";

export const Botao = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #203c20;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: ${props => (props.mostrar ? 'flex' : 'none')};

  &:hover {
    background-color: #142514;
  }
`;

export const SetaParaCima = styled.svg`
  width: 24px;
  height: 24px;
  stroke: white;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
`;