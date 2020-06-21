import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

export const Screen = styled.div`
  background: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default class App extends React.Component {
  render() {
    return (
      <Screen>
        <Loader
          type="Oval"
          color="#00BFFF"
          height={70}
          width={70}
        />
      </Screen>
    );
  }
}
