import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .loader-screen {
    height: 710px;
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
`

export const Content = styled.div`
  background: #CECECE;
  border-radius: 10px;
  box-shadow: 0px 0px 7px #888888;
  padding: 20px;
  margin-top: 50px;

  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;

  .checkbox {
    margin-right: 10px;
  }

  .center {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .area-picture {
    height: 60px;
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

export const Subtitles = styled.h2`
  color: #1D5EA8;
  font-size: 15pt;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #BEBEBE;
  margin-bottom: 15px;
  margin-top: 30px;
`
