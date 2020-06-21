import styled from 'styled-components';

export const Screen = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;

  .center-area {
    display: table-cell;
    margin-top: -400px;
  }

  header {
    height: 250px;

    img {
      width: 200px;
      position: absolute;
      left: 50%;
      transform:translate(-50%);
    }
  }

  form {
    width: 500px;
    background: #044187;
    position: absolute;
    left: 50%;
    transform:translate(-50%);
    box-shadow: 2px 2px 10px rgba(50, 50, 50, 0.88);
    padding: 20px;
    border-radius: 10px;

    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;

    h2, p {
      color: #FFF;
    }

    input {
      margin-top: 15px;
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

    .center {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }

  footer {
    color: white;
    text-align: center;
    bottom: 10px;
    position: absolute;
    left: 50%;
    transform:translate(-50%);
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

      h2 {
        font-size: 20px;
      }

      p {
        font-size: 10px;
      }

      button {
        margin-top: 5px;
      }
    }

    footer {
      visibility: hidden;
    }
  }

  @media (min-width: 319px) and (max-width: 330px) {
    header {
      height: 150px;
      margin-top: 40px;

      img {
        width: 130px;
      }
    }

    form {
      width: 300px;
      padding: 20px;

      p {
        font-size: 12px;
      }
    }

  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    header {
      height: 150px;
      margin-top: -150px;

      img {
        display: none;
      }
    }

    form {
      width: 300px;
      padding: 20px;
    }
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    header {
      height: 150px;
      margin-top: -50px;

      img {
        width: 150px;
      }
    }

    form {
      margin-top: 40px;
      width: 300px;

      p {
        font-size: 13px;
      }
    }

    footer {
      display: none;
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    header {
      height: 200px;
      margin-top: -50px;

      img {
        width: 150px;
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
