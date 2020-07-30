import styled from 'styled-components';

export const Box = styled.div`
  background: #CECECE;
  border-radius: 5px;
  padding: 5px;
  margin-top: 50px;
  height: 240px;
  box-shadow: 0px 0px 7px #888888;

  @media (min-width: 319px) and (max-width: 767.98px) {
    height: auto;
  }
`

export const Titulo = styled.h1`
  border-radius: 5px;
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  box-shadow: 0px 0px 7px #888888;
  padding: 5px 15px 5px 15px;
  margin-left: 50px;
  margin-top: -15px;
  font-size: 20px;
  color: #FFF;
`
