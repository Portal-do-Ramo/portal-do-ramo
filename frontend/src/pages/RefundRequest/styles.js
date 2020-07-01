import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }

  .left-box-blue-gradient, .right-box-gray {
    padding: 5px;
  }

  .title-box {
    font-size: 16pt;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
    letter-spacing: .02cm;
  }

  .white {
    color: #FFF;
  }

  .viewRequests {
    background-color: #FFF;
    padding: 5px;
    height: 88%;
    overflow-y: scroll;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .center {
    display: flex;
    justify-content: center;
    height: 70%;
    width: 100%;
  }

  .center-button {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .table {
    display: table-cell;
    padding: 40px;

    label {
      font-weight: bold;
    }
  }

  .area-alert {
    display: flex;
    justify-content: center;
    top: 0;
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .btn-send-picture {
    background: #1D5EA8;
    width: 100px;
    color: #FFF;
    padding: 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
    float: right;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .btn-send-picture:hover {
    box-shadow: 0px 0px 7px #888;
  }

  .btn-send-picture:disabled {
    background-color: #E5E5E5;
    color: #555;
    cursor: default;

    :hover {
      box-shadow: none;
    }
  }
`

export const CardItem = styled.div`
  background: #E5E5E5;
  padding: 10px 10px 2px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  h4 {
    font-size: 12pt;
  }
`
