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

  .btn-edit {
    display: none;
  }
`

export const Content = styled.section`
  background-color: #CECECE;
  box-shadow: 0px 0px 7px #888888;
  padding: 30px;
  margin-top: 50px;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  .title-area {
    font-size: 15pt;
    font-weight: bold;
    color: #1D5EA8;
    margin-bottom: 20px;
  }

  .input {
    margin-bottom: 30px;
  }

  label {
    font-weight: bold;
    margin-left: 10px;
  }

  .center {
    display: flex;
    justify-content: center;
  }

  .btn-save {
    background-color: #1D5EA8;
    color: #FFF;
    width: 150px;
    padding: 6px;
    border: none;
    margin-top: 50px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .btn-save:hover {
    box-shadow: 0px 0px 7px #888;
  }

  .btn-card-blue {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    width: 100%;
    padding: 10px 20px;
    border: none;
    text-align: left;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    label {
      color: #E5E5E5;
      font-weight: normal;
      margin-left: 0px;
    }

    label:hover {
      cursor: pointer;
    }

    .icon {
      width: 17px;
      margin-right: 10px;
      margin-bottom: 5px;
    }

    .title-name {
      color: #FFF;
      font-size: 17pt;
    }

    .hierarchy {
      color: #FFF;
      font-size: 13pt;
    }

    .leader-image {
      width: 80px;
      float: left;
      margin-top: 10px;
      margin-right: 30px;
      border-radius: 40px;

      -webkit-border-radius: 40px;
      -moz-border-radius: 40px;
      -ms-border-radius: 40px;
      -o-border-radius: 40px;
    }
  }

  .btn-card-blue:hover {
    box-shadow: 0px 0px 7px #888;
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

  @media (min-width: 319px) and (max-width: 767.98px) {
    label {
      margin-top: 15px;
    }

    .btn-card-blue {
      margin-bottom: 15px;

      .hierarchy {
        font-size: 10pt;
      }
    }
  }
`

export const ModalScreen = styled.div`
  background: rgba(0,0,0,0.5);
`

export const BoxModalScreen = styled.div`
  background-color: #E9EDF5;
  height: 410px;
  width: 600px;
  border-radius: 10px;
  padding: 15px;
  margin-top: 200px;

  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;

  .title {
    background: #1D5EA8;
    padding-top: 10px;
    width: 250px;
    height: 40px;
    font-size: 13pt;
    color: #FFF;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    margin-top: -25px;
    margin-left: 30px;
  }

  .inside-area {
    padding: 5px;
  }

  .view-members {
    height: 305px;
    overflow-y: scroll;
    background-color: #E5E5E5;
    border-radius: 5px;
    padding: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  ul {
    list-style: none;
    width: 100%;
  }

  .buttons-area {
    float: right;

    button {
      margin-right: 15px;
      margin-top: 5px;
      background-color: #1D5EA8;
      border: none;
    }

    button:hover {
      box-shadow: 0px 0px 7px #888;
    }
  }

  @media (min-width: 319px) and (max-width: 359.98px) {
    width: 290px;
    margin-top: 100px;
    font-size: 10pt;
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    width: 330px;
    font-size: 10pt;
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    width: 306px;
    font-size: 10pt;
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    width: 345px;
    font-size: 10pt;
  }

  @media (min-width: 767px) and (max-width: 1023.98px) {
    width: 650px;
    font-size: 11pt;
  }

  @media (min-width: 1024px) and (max-width: 1155px) {
    width: 890px;
    font-size: 11pt;
  }
`

export const Card = styled.button`
  background-color: #F5F5F5;
  padding: 10px 20px;
  margin-bottom: 5px;
  color: #1D5EA8;
  border: none;
  border-radius: 5px;
  height: 70px;
  width: 100%;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

   img {
    width: 55px;
    float: left;
    margin-top: -2px;
    border-radius: 30px;

    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    -ms-border-radius: 30px;
    -o-border-radius: 30px;
  }

  :focus {
    background-color: #E9EDF5;
    border: none;
    outline: none;
  }

  :hover {
    background-color: #E9EDF5;
  }
`

export const Alert = styled.div`
  position: fixed;
  top: 0;
  background: rgba(255,0,0,.9);
  color: #FFF;
  width: 100vh;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 0px 7px #888;
  padding: 7px 20px;
  display: none;

  h1 {
    font-size: 12pt;
    margin-top: 5px;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .close-alert {
    float: right;
    color: #FFF;
    height: 30px;
    width: 30px;
    background: transparent;
    border: none;
    outline: none;
    margin-top: -30px;
    border-radius: 15px;

    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -ms-border-radius: 15px;
    -o-border-radius: 15px;
  }

  .close-alert:hover {
    background: rgba(0,0,0,.1)
  }
`
