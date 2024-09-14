import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function CadastrarEncomendas() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    nomeDestinatario: "",
    blocoDestinatario: "",
    numeroApartamento: "",
    tipoEntrega: "",
    dataRecebimento: "",
    dataEntrega: "",
  });
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    const today = new Date();
    const brDate = new Date(
      today.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    );
    const formattedDate = `${String(brDate.getDate()).padStart(
      2,
      "0"
    )}/${String(brDate.getMonth() + 1).padStart(
      2,
      "0"
    )}/${brDate.getFullYear()}`;
    const formattedInputDate = `${brDate.getFullYear()}-${String(
      brDate.getMonth() + 1
    ).padStart(2, "0")}-${String(brDate.getDate()).padStart(2, "0")}`;
    setFormData((prevData) => ({
      ...prevData,
      dataRecebimento: formattedDate,
      formattedRecebimento: formattedInputDate,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const dataRecebimento = new Date(formData.formattedRecebimento);
    const dataEntrega = new Date(formData.dataEntrega);

    console.log('Data de Recebimento:', dataRecebimento);
    console.log('Data de Entrega:', dataEntrega);

    if (dataEntrega < dataRecebimento) {
      setDateError(true);
      return;
    } else {
      setDateError(false);
      if (form.checkValidity() === false) {
        setValidated(true);
        return;
      }
    }

    setValidated(true);


    // FAZER REQUISIÇÃO PARA A API
    try {
      console.log('Enviando dados para a API:', formData);
      const response = await axios.post(`http://localhost:8080/entregas`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      console.log("Encomenda cadastrada com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar encomenda:", error.response ? error.response.data : error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Verificar se o valor inserido contém apenas letras
    if (/^[a-zA-Z0-9]+$/.test(value) || value === "") {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <>
      <div className="mb-4">
        <h3>Cadastrar Encomenda</h3>
      </div>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Col className="mb-3">
          <Form.Group
            as={Col}
            md="8"
            controlId="validationCustom01"
            className="mb-2"
          >
            <Form.Label className="form-label-sm">
              Nome do Destinatário
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Digite o nome do destinatário"
              name="nomeDestinatario"
              value={formData.nomeDestinatario}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="8"
            controlId="validationCustom02"
            className="mb-2"
          >
            <Form.Label className="form-label-sm">
              Bloco do Destinatário
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o bloco do destinatário"
              name="blocoDestinatario"
              value={formData.blocoDestinatario}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="8"
            controlId="validationCustom03"
            className="mb-2"
          >
            <Form.Label className="form-label-sm">
              Número do Apartamento
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Digite o número do apartamento"
              name="numeroApartamento"
              value={formData.numeroApartamento}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group
            as={Col}
            md="8"
            controlId="validationCustom04"
            className="mb-2"
          >
            <Form.Label className="form-label-sm">Tipo de Entrega</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o Tipo de Entrega"
              name="tipoEntrega"
              value={formData.tipoEntrega}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Forneça um tipo de entrega válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="8"
            controlId="validationCustom05"
            className="mb-2"
          >
            <Form.Label className="form-label-sm">
              Data de Recebimento
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="dataRecebimento"
              value={formData.dataRecebimento}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="8"
            controlId="validationCustom06"
            className="mb-4"
          >
            <Form.Label className="form-label-sm">
              Data de entrega ao destinatário
            </Form.Label>
            <Form.Control
              type="date"
              name="dataEntrega"
              value={formData.dataEntrega}
              onChange={handleChange}
              isInvalid={dateError}
              className={dateError ? "is-invalid" : ""}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ display: dateError ? "block" : "none" }}
            >
              {formData.dataEntrega < formData.formattedRecebimento
                ? "A data deve ser posterior a data de recebimento"
                : null}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Button type="submit">Cadastrar Encomenda</Button>
      </Form>
    </>
  );
}