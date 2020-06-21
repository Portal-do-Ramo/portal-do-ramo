import styled from 'styled-components';
import PlanoDeFundo from './images/plano_de_fundo.png';

export const LoginScreen = styled.div`
  justify-content: center;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-image: url(${PlanoDeFundo});
  background-size: cover;

  header {
    height: 320px;

    img {
      width: 450px;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
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

    small a {
      color: #FFF;
      text-decoration: none;
    }

    small a:hover{
      color: #1D5EA8;
      text-decoration: none;
      transition: .2s;
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

  footer {
    position: fixed;
    left: 50%;
    transform:translate(-50%);
    margin-top: 20px;
    color: #FFF;
    text-align: center;
    bottom: 15px;

    ul {
      list-style: none;

      img {
        width: 25px;
        margin: 5px;
      }
    }
  }

  @media (max-width: 359.98px){
    header {
      height: 200px;

      img {
        width: 200px;
      }
    }

    form {
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
        width: 150px;
      }
    }

    form {
      width: 300px;
    }
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    header {
      height: 250px;

      img {
        width: 250px;
      }
    }

    form {
      width: 300px;
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    header {
      height: 250px;

      img {
        width: 250px;
      }
    }

    form {
      width: 350px;
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
`
