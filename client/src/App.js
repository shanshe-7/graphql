import BookList from './components/bookList';
import AddBook from './components/addBook';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import styled from 'styled-components';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <BookList />
        <AddBook />
      </Wrapper>
    </ApolloProvider>
  );
}

export default App;
