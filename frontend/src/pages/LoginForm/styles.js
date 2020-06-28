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

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    top: 10px;
    height: 300px;
    position: absolute;

    img {
      width: 450px;
    }
  }

  form {
    width: 400px;
    position: relative;
    left: 50%;
    transform:translate(-50%);
    border-radius: 10px;
    padding: 50px;
    background: linear-gradient(177.03deg, rgba(221, 221, 221, 0.42) 0%, rgba(255, 255, 255, 0.57) 97.23%);

    button {
      float: right;
      margin-top: -10px;
    }

    input {
      margin-top: -5px;
    }

    small a {
      color: #FFF;
      text-decoration: none;
      font-size: 9pt;
      margin-top: 5px;
    }

    small a:hover{
      color: #1D5EA8;
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
    header {
      height: 150px;

      img {
        width: 250px;
      }
    }

    form {
      padding: 40px;
      padding-bottom: 60px;
      width: 300px;

      button {
        margin-top: 5px;
      }
    }
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    header {
      height: 150px;

      img {
        width: 300px;
      }
    }

    form {
      padding: 40px;
      padding-bottom: 60px;
      width: 300px;

      button {
        margin-top: 5px;
      }
    }
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    header {
      height: 250px;

      img {
        width: 350px;
      }
    }

    form {
      padding: 40px;
      padding-bottom: 60px;
      width: 300px;

      button {
        margin-top: 5px;
      }
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    header {
      height: 250px;

      img {
        width: 350px;
      }
    }

    form {
      padding: 40px;
      padding-bottom: 60px;
      width: 300px;

      button {
        margin-top: 5px;
      }
    }
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    header {
      height: 200px;

      img {
        width: 200px;
      }
    }
  }

  @media (min-width: 1024px) and (max-width: 1365.98px) {
    header {
      height: 400px;

      img {
        width: 500px;
      }
    }

    form {
      margin-top: -150px;
    }
  }
`
