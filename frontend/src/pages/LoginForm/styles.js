import styled from 'styled-components';
import PlanoDeFundo from './images/plano_de_fundo.png';

export const LoginScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-image: url(${PlanoDeFundo});
  background-size: cover;

  .login-area {
    display: table-cell;
  }

  form {
    width: 400px;
    position: relative;
    left: 50%;
    transform:translate(-50%);
    border-radius: 10px;
    padding: 50px;
    background: linear-gradient(177.03deg, rgba(221, 221, 221, 0.8) 0%, rgba(255, 255, 255, 1) 97.23%);

    img {
      margin-bottom: 50px;
    }

    .center {
      display: flex;
      justify-content: center;
    }

    button {
      margin-top: 10px;
      margin-bottom: -10px;
      width: 120px;
      padding: 5px;
      background: #1D5EA8;
      color: #FFF;
      border: none;
      border-radius: 5px;
    }

    button:hover {
      box-shadow: 0px 0px 7px #888;
    }

    input {
      margin-top: -5px;
      border: 1px solid #CECECE;
    }

    small a {
      color: #1D5EA8;
      text-decoration: none;
      font-size: 9pt;
      margin-top: 10px;
    }

    small a:hover{
      color: #2B8DFC;
      text-decoration: none;
      transition: .4s;
    }

    .alert-danger {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }

    .alert-warning {
      color: #856404;
      background-color: #fff3cd;
      border-color: #ffeeba;
    }
  }

  .icons-area {
    margin-top: 25px;

    ul {
      list-style: none;

      img {
        width: 25px;
        margin: 5px;
      }
    }
  }

  footer {
    color: #FFF;
    text-align: center;
    font-size: 10pt;
    position: absolute;
    bottom: 10px;
  }

  @media (max-width: 359.98px){
    form {
      padding: 40px;
      padding-bottom: 60px;
      width: 300px;

      button {
        margin-top: 5px;
      }
    }

    footer {
      display: none;
    }
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    form {
      padding: 40px;
      padding-bottom: 60px;
      width: 300px;

      button {
        margin-top: 5px;
      }
    }

    footer {
      display: none;
    }
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    form {
      padding: 40px;
      padding-bottom: 60px;
      width: 300px;

      button {
        margin-top: 5px;
      }
    }

    footer {
      display: none;
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    form {
      padding: 40px;
      padding-bottom: 60px;
      width: 300px;

      button {
        margin-top: 5px;
      }
    }

    footer {
      display: none;
    }
  }

  @media (min-width: 576px) and (max-width: 1023.98px) {
    footer {
      display: none;
    }
  }

  @media (min-width: 1024px) and (max-width: 1365.98px) {
    form {
      margin-top: -150px;
    }

    footer {
      display: none;
    }
  }
`
