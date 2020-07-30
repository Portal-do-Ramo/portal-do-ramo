import styled from 'styled-components'

export const Screen = styled.div`
  padding-bottom: 50px;

  #no-access {
    width: 100%;
    height: 100vh;
    padding: 30px;
  }

  .center-alert {
    display: flex;
    justify-content: center;
  }

  .area-alert {
    display: flex;
    justify-content: center;
    top: 0;
    position: fixed;
    z-index: 5;
  }

  .btn-edit {
    display: none;
  }
`

export const Content = styled.div`
  background-color: #e5e5e5;
  margin-top: 50px;
  padding: 50px;
  padding-bottom: 70px;
  box-shadow: 0px 0px 7px #888888;
  margin-bottom: 30px;
  border-radius: 10px;

  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;

  p {
    margin-bottom: 10px;
  }

  label {
    font-weight: bold;
  }

  .row {
    margin-top: 20px;
  }

  .center{
    margin-top: 30px;
    text-align: center;

    button {
      width: 150px;
      float: right;
      background-color: #2B8DFC;
    }

    button:hover {
      background-color: #1D5EA8;
      transition: 0.8s;
    }
  }

  .box-checkbox {
    margin-top: 20px;
  }

  .checkbox {
    width: 30px;
  }

  .btn-send-picture {
    background: #1D5EA8;
    width: 100px;
    color: #FFF;
    padding: 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-top: -30px;
    float: right;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .btn-send-picture:hover {
    box-shadow: 0px 0px 7px #888888;
  }

  .btn-send-picture:disabled {
    background: #888;
    cursor: default;

    :hover {
      box-shadow: none;
    }
  }
`
