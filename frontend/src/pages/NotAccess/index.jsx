import React from 'react';
import styled from 'styled-components';

export const Screen = styled.div`
  padding: 50px;

  h1 {
    font-size: 25px;
    font-weight: bold;
    color: #1D5EA8
  }

  button {
    background-color: #1D5EA8;
    width: 150px;
    margin-top: 40px;
    padding: 7px;
    color: #FFF;
    font-weight: bold;
    border: none;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  button:hover {
    box-shadow: 0px 0px 7px #888;
  }
`

export default function NotAccess() {
  document.title = "SEM ACESSO"
  function returnToHome() {
    window.location.href = '/home';
  }

  return (
    <Screen>
      <h1>Você não possui acesso a essa área do site!</h1>
      <button onClick={ () => returnToHome() }>Voltar</button>
    </Screen>
  )
}
