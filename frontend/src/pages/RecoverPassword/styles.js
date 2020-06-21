import styled from 'styled-components';

export const Screen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  height: 100vh;

  .recover-area {
    display: table-cell;
  }

  header {
    height: 250px;
    margin-top: -50px;

    img {
      width: 200px;
      position: absolute;
      left: 50%;
      transform:translate(-50%);
    }
  }

  #alert {
    position: absolute;
    top: 10px;
  }

  form {
    background: #044187;
    box-shadow: 2px 2px 10px rgba(50, 50, 50, 0.88);
    border-radius: 10px;
    padding: 25px;
    width: 450px;
    text-align: center;

    input {
      width: 400px;
      margin-top: 30px;
    }

    h3 {
      color: #FFF;
      font-size: 15pt;
    }

    button {
      background-color: #2B8DFC;
      color: #FFF;
      width: 120px;
      padding: 7px;
      border: none;
      outline: none;
      margin-top: 20px;
      border-radius: 5px;

      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      -o-border-radius: 5px;
      -ms-border-radius: 5px;
    }
  }

  footer {
    color: white;
    text-align: center;
    bottom: 10px;
    position: absolute;
    left: 50%;
    transform:translate(-50%);

    ul {
      list-style: none;

      img {
        width: 22px;
        margin: 5px;
      }
    }
  }

  @media (min-width: 319px) and (max-width: 330.98px) {
    header img {
      display: none;
    }

    form {
      width: 300px;
      padding: 15px;
      margin-top: -150px;

      h3 {
        font-size: 12pt;
      }

      input {
        width: 100%;
      }
    }
  }

  @media (max-width: 359.98px){
    header {
      height: 150px;

      img {
        width: 150px;
      }
    }

    form {
      width: 300px;
      padding: 30px;

      h6 { font-size: 20px }

      p { font-size: 10px }

      button { margin-top: 5px }
    }
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    header {
      height: 150px;

      img {
        width: 150px;
        display: none;
      }
    }

    form {
      width: 300px;
      padding: 20px;
      margin-top: -150px;

      h3 {
        font-size: 13pt;
      }

      input {
        width: 100%;
      }
    }
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    header {
      height: 180px;
      margin-top: -60px;

      img {
        width: 150px;
      }
    }

    form {
      width: 300px;

      h3 {
        font-size: 13pt;
      }

      input {
        width: 100%;
      }
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    header {
      height: 200px;
      margin-top: -70px;

      img {
        width: 150px;
      }
    }

    form {
      width: 350px;

      h3 {
        font-size: 13pt;
      }

      input {
        width: 100%;
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
`
