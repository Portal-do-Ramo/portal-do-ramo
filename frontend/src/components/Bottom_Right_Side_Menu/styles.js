import styled from 'styled-components';

export const Menu = styled.div`
  @media only screen and (min-width: 1281px) {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    width: 60px;
    height: 100vh;
    justify-content: center;
    overflow: hidden;
    right: 0px;
    position: fixed;

    ul {
      display: table-cell;
      justify-content: center;
      list-style: none;
      margin-top: 30px;
      padding: 10px 0px;
    }

    button {
      cursor: pointer;
      width: 48px;
      height: 48px;
      border-radius: 30px;
      background-color: transparent;
      box-shadow: 0 1px 5px rgba(0,0,0,.4);
      margin-top: 10px;
      margin-left: 7px;
      outline: none;
      border: none;
    }

    .main {
      display: none;
    }

    .btn-icon {
      width: 20px;
    }
  }

  @media only screen and (max-width: 1280px) {
    position: fixed;
    bottom:10px;
    right:10px;
    z-index: 2;

    button{
      cursor: pointer;
      width: 48px;
      height: 48px;
      border-radius: 30px;
      background-color: #2B8DFC;
      border: none;
      box-shadow: 0 1px 5px rgba(0,0,0,.4);
      font-size: 24px;
      color: white;
      -webkit-transition: .2s ease-out;
      -moz-transition: .2s ease-out;
      transition: .2s ease-out;
    }

    button:disabled {
      background: red;
    }

    .btn-icon {
      width: 22px;
    }

    button.main{
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background-color: #1D5EA8;
      right: 0;
      bottom: 0;
      z-index: 20;
    }

    button.main:before{
      content: '⏚';
    }

    ul{
      position:absolute;
      bottom: 0;
      right: 0;
      padding:0;
      padding-right:5px;
      margin:0;
      list-style:none;
      z-index:10;
      -webkit-transition: .2s ease-out;
      -moz-transition: .2s ease-out;
      transition: .2s ease-out;
    }

    ul li{
      display: flex;
      justify-content: flex-start;
      position: relative;
      margin-bottom: -10%;
      opacity: 0;
      -webkit-transition: .3s ease-out;
      -moz-transition: .3s ease-out;
      transition: .3s ease-out;
    }

    button.main:active, button.main:focus{
      outline: none;
      background-color: #1D5EA8;
      box-shadow: 0 3px 8px rgba(0,0,0,.5);
    }

    button.main:active:before, button.main:focus:before{
      content: '↑';
    }

    button.main:active + ul, button.main:focus + ul{
      bottom: 70px;
    }

    button.main:active + ul li, button.main:focus + ul li{
      margin-bottom: 10px;
      opacity: 1;
    }

    button.main:active + ul li:hover label, button.main:focus + ul li:hover label{
      opacity: 1;
    }
  }
`
