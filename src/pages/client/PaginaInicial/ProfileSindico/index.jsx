import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ListGroup } from 'react-bootstrap';

function InfosSindico() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [documentoIdentidade, setDocumentoIdentidade] = useState("");
  const [telefoneCelular, setTelefoneCelular] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar os dados do síndico
  const fetchSindicoData = async () => {
    try {
      const response = await axios.get('http://10.0.0.145:8080/clientes');
      const { nomeCompleto, documentoIdentidade, telefoneCelular } = response.data;

      setNomeCompleto(nomeCompleto);
      setDocumentoIdentidade(documentoIdentidade);
      setTelefoneCelular(telefoneCelular);
    } catch (error) {
      setError('Erro ao carregar os dados do síndico');
      console.error('Erro ao carregar os dados do síndico:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSindicoData();
  }, []);

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

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

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
