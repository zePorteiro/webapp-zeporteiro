import styled from "styled-components";

export const FormularioContato = styled.form`
  bordexport er-radius: 30px;
  background-color: #789461;
  display: flex;
  flex-direction: column;
  padding: 56px;
  max-width: 600px;
  margin: 0 auto; 
  margin-right: 6vw;
`;

export const CamposFormulario = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 123%;
`;

export const CampoFormulario = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Rotulo = styled.label`
  color: #fff;
  font: 500 16px "Open Sans", sans-serif;
`;

export const Entrada = styled.input`
  border-radius: 10px;
  border: 1px solid #b4b4b4;
  background-color: #fff;
  margin-top: 10px;
  color: #909090;
  padding: 12px 15px; 
  font: 400 14px "Open Sans", sans-serif;
`;

export const CamposTelefone = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

export const CampoTelefone = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 0;
`;

export const MensagemErro = styled.span`
  color: #690000;
  font-size: 12px;
  margin-top: 5px;
`;

export const BotaoSubmit = styled.button`
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #294b29;
  background-color: #477240;
  align-self: center;
  margin-top: 24px; 
  color: #fff;
  text-align: center;
  padding: 12px 25px; 
  font: 800 18px/24px "Mulish", sans-serif;
  cursor: pointer;
`;