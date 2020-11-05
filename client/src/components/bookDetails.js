import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queris';
import styled from 'styled-components';

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 250px;
  margin-bottom: 20px;
`;

const H2 = styled.h2`
  color: #212121;
`;
const Paragraph = styled.p`
  color: #3e2723;
`;
export default function BookDetails({ id }) {
  const { data } = useQuery(getBookQuery);

  let detailsIdplay;
  if (id && data) {
    let newData = data.books.find((i) => i.id === id);
    detailsIdplay = (
      <WrapperDiv>
        <H2>Book Details:</H2>
        <Paragraph>Author: {newData.author.name}</Paragraph>
        <Paragraph>Genre: {newData.name}</Paragraph>{' '}
      </WrapperDiv>
    );
  }
  return <>{<div id='book-details'>{detailsIdplay}</div>}</>;
}
