import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .left-box-gray, .right-box-blue-gradient {
    padding: 5px;
  }

  .view-requests {
    width: 100%;
    height: 92%;
    overflow-y: scroll;
    background-color: #FFF;
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }
`

export const Card = styled.div`
  background-color: #E9EDF5;
  width: 100%;
  cursor: pointer;
  padding: 10px;
  color: #1D5EA8;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  h1 {
    font-size: 14pt;
  }

  h2 {
    font-size: 12pt;
  }

  h3 {
    font-size: 11pt;
  }

  :hover {
    background-color: #E5E5E5;
  }
`
