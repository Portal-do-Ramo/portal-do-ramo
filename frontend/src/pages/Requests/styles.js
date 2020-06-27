import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }
`

export const Content = styled.div`
  margin-top: 30px;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
`

export const BTNCard = styled.button`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  width: 100%;
  height: 150px;
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 15pt;
  color: #FFF;
  margin-top: 30px;

  :hover {
    transition: .4s;
    box-shadow: 0px 0px 10px #888;
  }

  :disabled {
    background: #2B8DFC;
    cursor: default;
  }

  @media (min-width: 319px) and (max-width: 767.98px) {
    margin-bottom: 10px;
    font-size: 14pt;
    padding: 10px;
  }
`
