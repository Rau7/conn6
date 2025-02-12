import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Board from "./components/Board";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: black;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <AppContainer>
        <Title>Connect 6</Title>
        <Board />
      </AppContainer>
    </Provider>
  );
}

export default App;
