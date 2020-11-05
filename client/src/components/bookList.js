import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queris';
import styled from 'styled-components';
//components
import BookDetails from './bookDetails';
import Spinner from './spinner';

const SpinnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const UnList = styled.ul`
  border: 1px solid red;
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  width: 80%;
`;

const ListItem = styled.li`
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  background-color: #43a047;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default function BookList() {
  const { loading, data } = useQuery(getBooksQuery);
  const [id, setId] = useState('');
  return (
    <>
      {loading ? (
        <SpinnerDiv>
          <Spinner />
        </SpinnerDiv>
      ) : (
        <>
          <UnList id='book-list'>
            {data.books.map((i) => {
              return (
                <>
                  <ListItem
                    key={i.id}
                    onClick={() => {
                      setId(i.id);
                    }}
                  >
                    {i.name}
                  </ListItem>
                </>
              );
            })}
          </UnList>
          <BookDetails id={id} />
        </>
      )}
    </>
  );
}
