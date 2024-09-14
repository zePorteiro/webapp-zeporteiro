import React from "react";
import styled from "styled-components";

function EncomendaItem({ icones }) {
  return (
    <Container>
      <Icones>
        {icones.map((icone, index) => (
          <Icone
            key={index}
            src={icone.src}
            alt={`Ícone ${index + 1}`}
          />
        ))}
      </Icones>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  max-width: 92px;
  flex-direction: column;
`;

const Icones = styled.div`
  justify-content: center;
  display: flex;
  gap: 12px;
  padding: 12px 0;
`;

const Icone = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 18px;
`;

export default EncomendaItem;
