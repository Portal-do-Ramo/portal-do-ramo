import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .area-alert {
    display: flex;
    justify-content: center;
    top: 0;
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .view-strikes {
    padding: 5px;
    height: 100%;
    background: #FFF;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .right-box-blue-gradient {
    h3 {
      color: #FFF;
      font-size: 15pt;
      margin-bottom: 10px;
    }

    label {
      margin-top: 20px;
      color: #FFF;
    }

    .buttons-area {
      display: flex;
      justify-content: center;
      margin-top: 70px;

      button {
        background: transparent;
        margin-left: 5px;
        margin-right: 5px;
        width: 120px;
        padding: 7px;
        border: 2px solid #FFF;
        color: #FFF;
        border-radius: 5px;

        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
      }

      button:hover {
        box-shadow: 0px 0px 5px #e5e5e5;
      }
    }
  }
`

export const Card = styled.div`
  background-color: #E5E5E5;
  width: 100%;
  margin-bottom: 5px;
  padding: 10px;
  padding-bottom: 5px;
  height: auto;
  cursor: pointer;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  h3 {
    font-size: 11pt;
    color: #1D5EA8;
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    min-height: 80px;
    max-height: 80px;
    overflow-y: scroll;
    overflow-x: hidden;
    border: none;
    padding: 5px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  :hover {
    background: #E9EDF5;
    transition: .8s;
  }
`
