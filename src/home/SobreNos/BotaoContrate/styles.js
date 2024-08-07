import styled from "styled-components";

const ButtonContratar = styled.button`
  display: inline-block;
  padding: 15px 30px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  background-color: #477240;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -5%);

  &:hover {
    background-color: #3a5e33;
  }
`;

export default ButtonContratar;
