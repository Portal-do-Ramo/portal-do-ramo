import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }

  .area-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 600px;
    margin-top: 30px;
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

  .left-box-gray {
    padding: 5px;

    .view-requests {
      padding-right: 5px;
      padding-left: 5px;
      padding-top: 5px;
      margin-top: 5px;
      height: 92%;
      overflow-y: scroll;
      overflow-x: hidden;
      background: #FFF;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }
  }

  .right-box-blue-gradient {
    h1 {
      color: #FFF;
      font-size: 20pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 50px;
    }

    h2 {
      color: #E5E5E5;
      font-size: 15pt;
      margin-bottom: 10px;
    }

    textarea {
      width: 100%;
      min-height: 200px;
      max-height: 200px;
      overflow-y: scroll;
      padding: 5px;
      border: none;
      outline: none;
      margin-top: 30px;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    .area-buttons {
      display: flex;
      justify-content: center;

      button {
        background: transparent;
        border: 2px solid #FFF;
        width: 150px;
        padding: 6px;
        margin-top: 30px;
        font-size: 12pt;
        font-weight: bold;
        color: #FFF;
        border-radius: 5px;

        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
      }

      button:hover {
        background: rgba(255,255,255,.1);
      }
    }
  }
`

export const Card = styled.div`
  background-color: #E5E5E5;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  margin-bottom: 5px;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  h1 {
    font-size: 16pt;
    color: #1D5EA8;
    font-weight: bold;
  }

  h2 {
    font-size: 12pt;
    color: #555;
  }

  :hover {
    background-color: #E9EDF5;
  }
`
