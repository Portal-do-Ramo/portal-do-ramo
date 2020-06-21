import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .content {
    background-color: #CECECE;
    padding: 30px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 7px #888888;
    margin-top: 50px;
  }

  .center {
    display: flex;
    justify-content: center;
  }

  .submit {
    margin-top: 10px;
  }

  h3 {
    font-size: 17pt;
    font-weight: bold;
    margin-bottom: 30px;
  }

  h4 {
    font-size: 13pt;
    padding: 7px 10px;
    color: #FFF;
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    border-radius: 5px;
    width: 145px;
    text-align: right;
    margin-top: 30px;
    display: flex;
    align-items: center;
  }

  label {
    font-weight: bold;
    font-size: 12pt;
  }

  hr {
    margin-bottom: -10px;
  }

  button.btn-send {
    margin-top: 30px;
  }
`

export const CardInput = styled.div`
  background: #E5E5E5;
  padding: 12px;
  border-radius: 10px;
  margin-top: 10px;

  h1 {
    font-size: 13pt;
    font-weight: bold;
  }

  h2 { font-size: 9pt }

  select {
    width: 33%;
  }

  .title-area {
    font-size: 11pt;
    font-weight: bold;
    padding-top: 10px;
  }

  .input-down { margin-top: 2px }

  .management-select {
    width: 100%;
  }
`

export const BTNCircle = styled.button`
  border-radius: 25px;
  color: #FFF;
  background: ${props => props.color};
  border: none;
  width: 40px;
  height: 40px;
  font-size: 17pt;
  float: right;
  margin-left: 5px;

  :hover {
    transition: .8s;
    background: ${props => props.hoverColor};
  }
`

export const BTNNewInput = styled.button`
  border-radius: 25px;
  color: #1D5EA8;
  background: #FFF;
  border: none;
  width: 35px;
  height: 35px;
  font-size: 17pt;
  float: right;
  margin-right: 20px;

  :hover {
    transition: .8s;
    background: #E5E5E5;
  }
`
