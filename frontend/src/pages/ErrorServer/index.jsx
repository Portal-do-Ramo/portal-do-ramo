import React from 'react';
import styled from 'styled-components';

import Error from './error.png';

export const Screen = styled.div`
  background-color: #FFF;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    text-align: center;

    img {
      width: 500px;
    }

    h2 {
      margin-top: 50px;
    }

    p {
      font-size: 12pt;
      margin-top: 30px;
    }

    @media only screen and (max-width: 500px) {
      img {
        width: 240px;
      }
    }

    @media only screen and (max-width: 500px) {
    }
  }

`
export default () =>
  <Screen>
    <div>
      <img src={Error} />
      <h2>Ooops! Algo de errado aconteceu!</h2>
      <p>Caso necessite, entre em contato com nosso suporte enviando um e-mail para gp.ramocefetrj@gmail.com.<br /><strong>Portal do Ramo - 2020</strong></p>
    </div>
  </Screen>
