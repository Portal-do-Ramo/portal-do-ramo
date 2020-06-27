import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .area-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 620px;
  }

  .btn-edit {
    display: none;
  }
`

export const Card = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);;
  padding: 25px;
  margin-top: 30px;
  height: 250px;
  box-shadow: 0px 0px 7px #888;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  .title {
    color: #FFF;
    font-size: 20pt;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: .02cm;
  }

  .value {
    color: #FFF;
    font-size: 16pt;
  }

  .center {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .btn-extract {
    width: 200px;
    padding: 7px;
    border: 2px solid #FFF;
    background-color: transparent;
    color: #FFF;
    font-size: 12pt;
    font-weight: bold;
    letter-spacing: .02cm;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .btn-extract:disabled {
    background: rgba(255,255,255,.2);
    cursor: default;
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
    padding: 5px;
    height: 355px;

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
  }

  .buttons-area {
    float: right;

    button {
      margin-right: 15px;
      margin-top: 5px;
      background-color: #1D5EA8;
      border: none;
    }

    button:hover {
      box-shadow: 0px 0px 7px #888;
    }
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
