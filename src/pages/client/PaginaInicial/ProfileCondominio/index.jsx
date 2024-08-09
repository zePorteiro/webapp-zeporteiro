import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ListGroup } from 'react-bootstrap';

function InfosCondominio() {
  const [nomeCondominio, setNomeCondominio] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar os dados do condomínio
  const fetchCondominioData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/condominios');
      const { nomeCondominio, endereco, cep, bairro, cidade } = response.data;

      setNomeCondominio(nomeCondominio);
      setEndereco(endereco);
      setCep(cep);
      setBairro(bairro);
      setCidade(cidade);
    } catch (error) {
      setError('Erro ao carregar os dados do condomínio');
      console.error('Erro ao carregar os dados do condomínio:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCondominioData();
  }, []);

  const handleSave = async () => {
    const updatedData = {
      nomeCondominio,
      endereco,
      cep,
      bairro,
      cidade
    };
    
    try {
      const response = await axios.put('http://localhost:8080/condominios', updatedData);
      console.log('HTTP Status:', response.status);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar os dados do condomínio:', error.message);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

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
