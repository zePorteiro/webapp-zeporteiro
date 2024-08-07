import React, { useState } from "react";

const ModalEditarEncomenda = ({ encomenda, salvarEdicao, fecharModal }) => {
  const [destinatario, setDestinatario] = useState(encomenda.destinatario);
  const [apartamento, setApartamento] = useState(encomenda.apartamento);
  const [bloco, setBloco] = useState(encomenda.bloco);
  const [dataRecebido, setDataRecebido] = useState(encomenda.recebido);
  const [dataRetirado, setDataRetirado] = useState(encomenda.retirado);

  const handleSalvarEdicao = () => {
    salvarEdicao({
      ...encomenda,
      destinatario,
      apartamento,
      bloco,
      recebido: dataRecebido,
      retirado: dataRetirado,
    });
    fecharModal();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Editar Encomenda</ModalHeader>
        <ModalBody>
          <label>Destinatário:</label>
          <input
            type="text"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value)}
          />
          <label>Apartamento:</label>
          <input
            type="text"
            value={apartamento}
            onChange={(e) => setApartamento(e.target.value)}
          />
          <label>Bloco:</label>
          <input
            type="text"
            value={bloco}
            onChange={(e) => setBloco(e.target.value)}
          />
          <label>Data Recebido:</label>
          <input
            type="text"
            value={dataRecebido}
            onChange={(e) => setDataRecebido(e.target.value)}
          />
          <label>Data Retirado:</label>
          <input
            type="text"
            value={dataRetirado}
            onChange={(e) => setDataRetirado(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSalvarEdicao}>Salvar</Button>
          <Button onClick={fecharModal}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalEditarEncomenda;