import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import axios from 'axios';

function InfosCondominio() {
  const [nomeCondominio, setNomeCondominio] = useState("Nome do Condomínio");
  const [endereco, setEndereco] = useState("Endereço do Condomínio");
  const [cep, setCep] = useState("00000-000");
  const [bairro, setBairro] = useState("Bairro do Condomínio");
  const [cidade, setCidade] = useState("Cidade do Condomínio");

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const updatedData = {
      nomeCondominio,
      endereco,
      cep,
      bairro,
      cidade
    };
    
    try {
      const response = await axios.put('http://localhost:/condominio', updatedData);

      console.log('HTTP Status:', response.status);

      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar os dados do condomínio:', error.message);
    }
  };

  return (
    <>
      <div className="mb-3">
        <h3>Informações do Condomínio</h3>
      </div>
      <ListGroup>
        <ListGroup.Item>
          Nome: {isEditing ? <input value={nomeCondominio} onChange={(e) => setNomeCondominio(e.target.value)} /> : nomeCondominio}
        </ListGroup.Item>
        <ListGroup.Item>
          Endereço: {isEditing ? <input value={endereco} onChange={(e) => setEndereco(e.target.value)} /> : endereco}
        </ListGroup.Item>
        <ListGroup.Item>
          CEP: {isEditing ? <input value={cep} onChange={(e) => setCep(e.target.value)} /> : cep}
        </ListGroup.Item>
        <ListGroup.Item>
          Bairro: {isEditing ? <input value={bairro} onChange={(e) => setBairro(e.target.value)} /> : bairro}
        </ListGroup.Item>
        <ListGroup.Item>
          Cidade: {isEditing ? <input value={cidade} onChange={(e) => setCidade(e.target.value)} /> : cidade}
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

export default InfosCondominio;
