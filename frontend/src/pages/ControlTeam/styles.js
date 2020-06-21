import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-circle {
    width: 35px;
    height: 35px;
    border-radius: 22px;
    color: #FFF;
    background: #1D5EA8;
    margin-right: 10px;
    font-size: 16pt;
    font-weight: bold;
    border: none;
  }

  .btn-circle:hover {
    box-shadow: 0px 0px 7px #888;
  }

  .area-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 600px;
    margin-top: 30px;
  }

  .area-alert {
    display: flex;
    justify-content: center;
    top: 0;
    width: 100%;
    position: fixed;
    z-index: 5;
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

  .down {
    margin-top: 20px;
  }

  label {
    font-weight: bold;
    margin-left: 10px;
  }

  .btn-save {
    background-color: #1D5EA8;
    color: #FFF;
    width: 100%;
    padding: 6px;
    border: none;
    margin-top: 10px;
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
    }
  }

  .btn-card-blue:hover {
    box-shadow: 0px 0px 7px #888;
  }

  @media (min-width: 360px) and (max-width: 767.98px) {
    label {
      margin-top: 10px;
    }

    .btn-card-blue {
      margin-top: 15px;
    }
  }
`

export const EventsArea = styled.div`
  background-color: #CECECE;
  box-shadow: 0px 0px 7px #888888;
  padding: 10px;
  margin-top: 30px;
  height: 250px;
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
    margin-left: 10px;
    margin-top: 5px;
  }

  .view-events {
    background: #FFF;
    height: 75%;
    margin-top: -5px;
    padding: 5px;
    overflow-y: scroll;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .event-card {
    background: #E5E5E5;
    height: 60px;
    padding: 7px;
    cursor: pointer;
    width: 100%;
    border: none;
    margin-bottom: 5px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    h1 {
      font-size: 12pt;
      font-weight: bold;
      text-align: left;
    }

    span {
      font-size: 10pt;
      float: left;
    }
  }

  .event-card:hover {
    transition: .8s;
    background-color: #E9EDF5;
  }
`

export const ArchivesArea = styled.div`
  background-color: #CECECE;
  box-shadow: 0px 0px 7px #888888;
  padding: 10px;
  margin-top: 30px;
  height: 250px;
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
    margin-left: 10px;
    margin-top: 5px;
  }

  .view-archives {
    background: #FFF;
    height: 75%;
    margin-top: -5px;
    padding: 5px;
    overflow-y: scroll;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .archive-card {
    background: #E5E5E5;
    padding: 7px 10px 2px 10px;
    margin-bottom: 5px;
    cursor: pointer;
    width: 100%;
    border: none;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    h1 {
      font-size: 11pt;
      font-weight: bold;
      text-align: left;
      margin-top: 5px;
    }

    h2 {
      float: right;
      font-size: 11pt;
      margin-top: -27px;
      margin-right: 10px;
    }
  }

  .archive-card:hover {
    transition: .8s;
    background-color: #FFC4BC;
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
    height: 355px;
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

  .input-area {
    width: 100%;
    padding: 20px;
    margin-left: 0px;
  }

  .right {
    width: 95%;
    margin-top: 15px;
    margin-left: 13px;
  }

  .btn-delete {
    padding: 5px 10px;
    background: #AA0000;
    color: #FFF;
    border: none;
    border-radius: 5px;

    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
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
    height: auto;
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    width: 330px;
    height: auto;
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    width: 306px;
    height: auto;

    .buttons-area {
      padding-right: 13px;
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    width: 345px;
    height: auto;
  }

  @media (min-width: 767px) and (max-width: 1023.98px) {
    width: 650px;
    height: auto;
  }

  @media (min-width: 1024px) and (max-width: 1155px) {
    width: 890px;
    height: auto;
  }
`

export const ConfirmBoxModalScreen = styled.div`
  background-color: #E9EDF5;
  height: 200px;
  width: 400px;
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
    width: 180px;
    height: 40px;
    font-size: 13pt;
    color: #FFF;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    margin-top: -25px;
    margin-left: 30px;
  }

  .view {
    height: 100%;
    border: none;
  }

  .inside-area {
    padding: 30px;

    .right {
      width: 95%;
      margin-top: 20px;
      margin-left: 10px;
    }
  }

  .text-area {
    padding: 10px 30px;
  }

  .buttons-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    div {
      display: block;
    }

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
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    width: 330px;
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    width: 306px;
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    width: 345px;
  }

  @media (min-width: 767px) and (max-width: 1023.98px) {
    width: 650px;
  }

  @media (min-width: 1024px) and (max-width: 1155px) {
    width: 890px;
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
