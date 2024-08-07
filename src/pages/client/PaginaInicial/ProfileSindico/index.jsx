import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import axios from 'axios';

function InfosSindico() {
  const [nomeCompleto, setNomeCompleto] = useState("Fulano de Tal");
  const [documentoIdentidade, setDocumentoIdentidade] = useState("123456789");
  const [telefoneCelular, setTelefoneCelular] = useState("(11) 91234-5678");

  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = async () => {
    const updatedData = {
      nomeCompleto,
      documentoIdentidade,
      telefoneCelular
    };

    try {
      const response = await axios.put('http://sua-api.com/sindico', updatedData);

      console.log('HTTP Status:', response.status);

      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar os dados do síndico:', error.message);
    }
  };

  return (
    <>
      <div className="mb-3">
        <h3>Informações do(a) Síndico(a)</h3>
      </div>
      <ListGroup>
        <ListGroup.Item>
          Nome Completo: {isEditing ? <input value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} /> : nomeCompleto}
        </ListGroup.Item>
        <ListGroup.Item>
          Documento de Identidade: {isEditing ? <input value={documentoIdentidade} onChange={(e) => setDocumentoIdentidade(e.target.value)} /> : documentoIdentidade}
        </ListGroup.Item>
        <ListGroup.Item>
          Telefone Celular: {isEditing ? <input value={telefoneCelular} onChange={(e) => setTelefoneCelular(e.target.value)} /> : telefoneCelular}
        </ListGroup.Item>
      </ListGroup>
      <div className="mt-3">
        {isEditing ? (
          <Button variant="primary" onClick={handleSave}>Salvar</Button>
        ) : (
          <Button variant="primary" onClick={() => setIsEditing(true)}>Editar</Button>
        )}
      </div>
    </>
  );
}

export default InfosSindico;
