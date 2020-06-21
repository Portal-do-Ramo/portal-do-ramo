import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .area-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .title-box-blue {
    color: #1D5EA8;
    font-size: 20pt;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .data-finance {
    color: #1D5EA8;
    font-size: 15pt;
    margin-bottom: 20px;
  }

  .btn-option-box {
    padding: 7px 12px;
    background: #1D5EA8;
    border-radius: 5px;
    width: 100%;
    color: #FFF;
    font-size: 12pt;
    border: none;
    outline: none;
  }

  .btn-option-box:disabled {
    cursor: default;
    background-color: rgba(0,0,0,.1);
  }

  .btn-option-box:hover {
    transition: .3s;
    box-shadow: 0px 0px 7px #888;
  }

  .btn-option-box-white {
    padding: 7px 12px;
    background: transparent;
    border-radius: 5px;
    width: 100%;
    color: #FFF;
    font-size: 12pt;
    border: 2px solid #FFF;
  }

  .btn-option-box-white:disabled {
    background: rgba(255, 255, 255, 0.5);
    cursor: default;
  }

  .center {
    display: flex;
    justify-content: center;
  }

  .btn-circle {
    width: 35px;
    height: 35px;
    border-radius: 22px;
    color: #FFF;
    background: #2B8DFC;
    margin-right: 10px;
    font-size: 17pt;
    font-weight: bold;
    border: none;
  }

  .btn-circle:hover {
    box-shadow: 0px 0px 7px #888;
  }

  .title-box-white {
    color: #FFF;
    font-size: 20pt;
    margin-bottom: 5px;
    font-weight: bold;
  }

  span {
    color: #E5E5E5;
    margin-bottom: 10px;
  }

  .subtitle-white {
    color: #FFF;
    font-size: 14pt;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .view-extract {
    background: #E5E5E5;
    width: 100%;
    height: 250px;
    border-radius: 5px;
    padding: 20px;
    overflow-y: scroll;

    ul {
      list-style: none;
    }
  }

  .area-alert {
    display: flex;
    justify-content: center;
    top: 0;
    width: 100%;
    position: fixed;
    z-index: 10;
  }
`

export const Content = styled.section`
  background-color: #CECECE;
  box-shadow: 0px 0px 7px #888888;
  padding: 30px;
  margin-top: 30px;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  .btn-tab {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    margin-left: 5px;
    background: #E9EDF5;
    padding: 10px 15px;
    color: #1D5EA8;
    font-weight: bold;
  }

  .btn-tab:hover {
    background: #DADEE6;
  }

  .view-chart {
    height: 730px;
    background-color: #FFF;
    padding: 0px 20px;
    margin-top: 30px;
    border: 2px solid #E9EDF5;
    border-radius: 5px;
  }

  .area-charts {
    padding: 50px;
  }

  .area-navigation {
    display: flex;
    justify-content: center;
    margin-top: 40px;

    h1 {
      font-size: 15pt;
      font-weight: bold;
      color: #1D5EA8;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn-navigation {
      border: none;
      outline: none;
      background: transparent;
      padding: 0px 30px;

      img {
        width: 70px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #E5E5E5;
      }

      img:hover {
        box-shadow: 0px 0px 5px #888888;
        transition: .8s;
      }
    }
  }

  .area-tabs {
    display: flex;
    justify-content: center;
    margin-top: -25px;
    margin-bottom: 20px;

    .btn-tab {
      width: 100px;
      padding: 7px;
      background: #E9EDF5;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    .btn-tab:hover {
      background: #E5E5E5;
    }
  }
`

export const ModalScreen = styled.div`
  background: rgba(0,0,0,0.5);
`

export const BoxModalScreen = styled.div`
  background-color: #E9EDF5;
  height: 410px;
  width: 600px;
  border-radius: 10px;
  padding: 15px;
  margin-top: 200px;

  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;

  .title {
    background: #1D5EA8;
    padding: 10px;
    width: auto;
    height: 40px;
    font-size: 13pt;
    color: #FFF;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    margin-top: -25px;
    margin-left: 30px;
  }

  .inside-area {
    padding: 10px;
    height: 350px;

    .title-modal-box {
      font-size: 15pt;
    }

    label {
      font-size: 12pt;
      font-weight: bold;
    }

    input {
      margin-bottom: 15px;
    }

    input[type=checkbox] {
      margin-right: 10px;
    }
  }

  .buttons-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    div {
      display: block;
    }

    button {
      margin-right: 15px;
      margin-top: -210px;
      background-color: #1D5EA8;
      border: none;
    }

    button:hover {
      box-shadow: 0px 0px 7px #888;
    }

    .cancel {
      margin-top: -240px;
      border: 1px solid #E9EDF5;
    }

    .back {
      margin-top: -260px;
      border: 1px solid #E9EDF5;
    }
  }

  .view-requests {
    background: transparent;
    height: 320px;
    padding: 5px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .card-request {
    background: #E9EDF5;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    h1 {
      font-size: 12pt;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 10pt;
    }

    a {
      margin-left: 20px;
      margin-top: 5px;
      color: #1D5EA8;
    }

    a:hover {
      text-decoration: none;
      color: #2B8DFC;
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
    }

    .btn-products {
      background: green;
      float: right;
      color: #FFF;
      font-size: 10pt;
      font-weight: bold;
      border: none;
      width: 100px;
      padding: 5px;
      margin-top: 10px;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    .btn-approve {
      background: #1D5EA8;
      color: #FFF;
      font-size: 10pt;
      font-weight: bold;
      border: none;
      width: 100px;
      padding: 5px;
      margin-right: 5px;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    .btn-disapprove {
      background: #AF0000;
      color: #FFF;
      font-size: 10pt;
      font-weight: bold;
      border: none;
      width: 100px;
      padding: 5px;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    .btn-products:hover, .btn-approve:hover, .btn-disapprove:hover {
      transition: .3s;
      box-shadow: 0px 0px 7px #888;
    }
  }

  .view-products {
    width: 100%;
    height: 100%;
    background: transparent;
    overflow-y: scroll;
    padding: 5px;
  }

  .view-registers {
    background: #E5E5E5;
    overflow-y: scroll;
    padding: 5px;
    height: 290px;
    margin-bottom: 7px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  @media (min-width: 319px) and (max-width: 359.98px) {
    width: 290px;
    margin-top: 100px;
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    width: 330px;
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    width: 306px;
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    width: 345px;
  }

  @media (min-width: 767px) and (max-width: 1023.98px) {
    width: 650px;
  }

  @media (min-width: 1024px) and (max-width: 1155px) {
    width: 890px;
  }
`

export const ConfirmBoxModalScreen = styled.div`
  background-color: #E9EDF5;
  height: 250px;
  width: 400px;
  border-radius: 10px;
  padding: 15px;
  margin-top: 200px;

  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;

  .title {
    background: #1D5EA8;
    padding-top: 10px;
    width: 180px;
    height: 40px;
    font-size: 13pt;
    color: #FFF;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    margin-top: -25px;
    margin-left: 30px;
  }

  .inside-area {
    padding: 30px;
    height: 195px;

    label {
      font-size: 15pt;
      font-weight: bold;
    }
  }

  .buttons-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    div {
      display: block;
    }

    button {
      margin-right: 15px;
      margin-top: -20px;
      background-color: #1D5EA8;
      border: none;
    }

    button:hover {
      box-shadow: 0px 0px 7px #888;
    }
  }
`

export const CardCash = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);;
  padding: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 3px #888;
  height: 150px;
  cursor: pointer;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  .title {
    color: #FFF;
    font-size: 15pt;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: .02cm;
  }

  .value {
    color: #FFF;
    font-size: 12pt;
  }

  :hover {
    box-shadow: 0px 0px 7px #888;
  }
`

export const Register = styled.div`
  background: #FFF;
  padding: 0px 10px;
  margin-bottom: 5px;
  color: ${props => props.color};
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
`
