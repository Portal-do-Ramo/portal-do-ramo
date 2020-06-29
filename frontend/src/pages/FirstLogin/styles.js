import styled from 'styled-components';

export const Screen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;

  .area-isActive {
    width: 100%;
    height: 100vh;
    background-color: #FFF;
    position: absolute;
  }

  @media only screen and (max-width: 767.98px) {
    height: 100%;
  }

  img {
    width: 180px;
    margin: 30px 0px 30px 0px;
  }

  .center {
    display: flex;
    justify-content: center;
  }

  form {
    margin-left: 15%;
    margin-right: 15%;
    margin-top: -7px;
    background: #044187;
    box-shadow: 2px 2px 10px rgba(50, 50, 50, 0.88);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 25px;

    input {
      margin-bottom: 20px;
    }

    input:focus {
      border-color: rgba(255, 0, 0, 0.8);
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(255, 0, 0, 1);
      outline: 0 none;
    }

    h4 {
      margin-top: 15px;
      font-size: 18px;
      color: #E9EDF5;
    }

    small, label {
      color: #E5E5E5;
      padding-left: 10px;
    }

    button {
      margin-top: 15px;
      width: 200px;
    }

    @media only screen and (max-width: 1440px) {
      h4 {
        font-size: 11pt;
      }

      small, label {
        font-size: 8pt;
      }

      input::placeholder {
        font-size: 9pt;
      }

      button {
        width: 100px;
      }
    }
  }

  @media (min-width: 319px) and (max-width: 767.98px) {
    form {
      width: 95%;
      margin-left: 7px;

      h4 {
        font-size: 12pt;
      }

      label {
        font-size: 9pt;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1150px) {
    form {
      width: 97%;
      margin-left: 7px;

      h4 {
        font-size: 12pt;
      }

      label {
        font-size: 10pt;
      }
    }
  }
`

export const Header = styled.header`
  margin-left: 15%;
  margin-right: 15%;
  background: #E9EDF5;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 2px 2px 10px rgba(50, 50, 50, 0.88);
  padding: 15px;

  h2, p {
    color: #1D5EA8;
  }

  @media (min-width: 319px) and (max-width: 767px) {
    width: 95%;
    margin-left: 7px;
  }

  @media (min-width: 768px) and (max-width: 1150px) {
    width: 97%;
    margin-left: 7px;
  }
`
