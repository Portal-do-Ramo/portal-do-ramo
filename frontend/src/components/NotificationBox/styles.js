import styled from 'styled-components';

export const Box = styled.div`
  background: #CECECE;
  border-radius: 5px;
  padding: 5px;
  margin-top: 50px;
  height: 530px;
  box-shadow: 0px 0px 7px #888888;
`

export const Title = styled.h1`
  border-radius: 5px;
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  box-shadow: 0px 0px 7px #888888;
  padding: 5px 15px 5px 15px;
  margin-left: 50px;
  margin-top: -15px;
  font-size: 20px;
  color: #FFF;
`

export const Notifications = styled.div`
  background: #CECECE;
  height: 470px;
  overflow-y: scroll;
  padding-right: 5px;
`

export const Notification = styled.button`
  background: #E9EDF5;
  border-radius: 5px;
  border: none;
  text-align: justify;
  padding: 10px 30px 5px 30px;
  margin-bottom: 5px;
  width: 100%;

  :active {
    border: none;
    outline: none;
  }

  .notification-title {
    color: #303030;
    font-size: 15px;
    font-weight: bold;
  }

  .notification-message {
    color: #797B80;
    font-size: 11px;
  }

  span {
    font-size: 11px;
    font-weight: bold;
    color: #303030;
    margin-top: -5px;
  }

  :hover {
    transition: .8s;
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);

    .notification-title {
      color: #FFF;
    }

    .notification-message, span {
      color: #E5E5E5;
    }
  }
`

export const BoxNotification = styled.div`
  background-color: #E9EDF5;
  height: 330px;
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
    width: 120px;
    height: 40px;
    font-size: 12pt;
    color: #FFF;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    margin-top: -30px;
    margin-left: 30px;
  }

  button {
    background: #1D5EA8;
    border-radius: 5px;
    color: #FFF;
    height: 40px;
    width: 70px;
    outline: none;
    border: none;
    font-size: 11pt;
    font-weight: bold;
    text-align: center;
    margin-top: -30px;
    margin-left: 350px;
  }

  .view {
    height: 100%;
    border: none;
  }

  .text-area {
    padding: 30px;
    text-align: center;

    h1 {
      font-size: 14pt;
      font-weight: bold;
      margin-top: -10px;
    }

    .message-area {
      height: 200px;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-right: 10px;
      overflow-y: scroll;

      p {
        font-size: 10pt;
        text-align: justify;
        text-indent: 1.5em;
      }
    }

    span {
      font-size: 11pt;
      font-weight: bold;
    }
  }

  @media (min-width: 319px) and (max-width: 359.98px) {
    width: 290px;
    margin-top: 100px;

    button {
      display: none;
    }
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    width: 330px;

    button {
      display: none;
    }
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    width: 306px;

    button {
      display: none;
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    width: 345px;

    button {
      display: none;
    }
  }

  @media (min-width: 767px) and (max-width: 1023.98px) {
    width: 650px;

    button {
      display: none;
    }
  }

  @media (min-width: 1024px) and (max-width: 1155px) {
    width: 890px;

    button {
      display: none;
    }
  }
`

export const Screen = styled.div`
  background: rgba(0,0,0,0.5);
`
