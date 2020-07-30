import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }
`

export const Content = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  padding: 30px;
  color: #FFF;
  text-align: center;
  margin-top: 50px;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  h1 {
    font-size: 20pt;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 15pt;
    margin-bottom: 40px;
  }

  textarea {
    min-height: 120px;
    max-height: 350px;
    margin-bottom: 30px;
  }
`
