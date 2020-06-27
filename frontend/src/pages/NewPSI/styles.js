import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .content {
    background-color: #CECECE;
    padding: 30px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 7px #888888;
    margin-top: 50px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .general-data-title {
    margin-top: -10px;
    margin-left: -10px;
    margin-bottom: 30px;
    font-size: 20pt;
    font-weight: bold;
    color: #1D5EA8;
  }

  .area-vagas {
    background-color: #CECECE;
    padding: 10px;
    padding-bottom: 1px;
    box-shadow: 0px 0px 7px #888888;
    margin-top: 20px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    .title-area {
      margin-top: 10px;
      margin-left: 10px;
      padding-bottom: 10px;
      font-size: 18pt;
      font-weight: bold;
      color: #1D5EA8;
    }

    p {
      margin-top: 10px;
      margin-left: 10px;
      font-size: 11pt;
    }

    .button-area {
      width: 100%;
      height: 50px;
    }
  }

  label {
    font-weight: bold;
    font-size: 12pt;
  }

  .btn-send {
    float: right;
  }

  .btn-edit {
    display: none;
  }
`

export const CardInput = styled.div`
  background: #E5E5E5;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 10px;

  h1 {
    font-size: 15pt;
    font-weight: bold;
    color: #1D5EA8;
  }

  h2 {
    margin-bottom: 10px;
    font-size: 9pt
  }

  .down {
    margin-bottom: 7px;
  }
`
