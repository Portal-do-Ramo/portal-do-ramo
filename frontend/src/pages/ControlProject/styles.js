import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .loader-area {
    margin-top: 10px;
    height: 620px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .center-alert {
    display: flex;
    justify-content: center;
  }

  .area-alert {
    display: flex;
    justify-content: center;
    top: 0;
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

  h2 {
    font-size: 17pt;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 5px;
  }

  .box-height-fixed {
    height: 300px;
    border-radius: 5px;
    background-color: #E5E5E5;
    padding: 5px;
    margin-top: 30px;
  }

  .box-height-fixed-small {
    height: 150px;
    border-radius: 5px;
    background-color: #E5E5E5;
    padding: 10px 5px 20px 15px;
    margin-top: 20px;
  }

  .btn-circle {
    width: 35px;
    height: 35px;
    border-radius: 22px;
    color: #FFF;
    background: #1D5EA8;
    margin-right: 10px;
    font-size: 17pt;
    font-weight: bold;
    border: none;
  }

  .btn-circle:hover {
    box-shadow: 0px 0px 7px #888;
  }

  .btn-circle-margin {
    margin-top: 5px;
    margin-left: 10px;
  }

  .btn-transparent {
    background: transparent;
    border: none;
    float: right;
    padding: 5px 10px;
    margin-top: -15px;
  }

  .btn-transparent:hover {
    color: #1D5EA8;
  }

  .btn-member {
    width: 44px;
    height: 44px;
    background: transparent;
    margin-right: 5px;
    border: none;
    outline: none;
    border-radius: 22px;

    -webkit-border-radius: 22px;
    -moz-border-radius: 22px;
    -ms-border-radius: 22px;
    -o-border-radius: 22px;
  }

  .member-icon {
    width: 44px;
    border: 2px solid #FFF;
    border-radius: 22px;

    -webkit-border-radius: 22px;
    -moz-border-radius: 22px;
    -ms-border-radius: 22px;
    -o-border-radius: 22px;
  }

  .member-icon:hover {
    box-shadow: 0px 0px 7px #888;
  }

  .btn-remove {
    background: #AA0000;
    color: #FFF;
    width: 100%;
    padding: 6px;
    border: none;
    margin-left: -10px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .btn-remove:hover {
    background: #CC0000;
    transition: .8s;
  }

  .btn-remove-advisor {
    background: #AA0000;
    color: #FFF;
    width: 150px;
    padding: 6px;
    float: right;
    border: none;
    margin-top: 15px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .btn-remove-advisor:hover {
    background: #CC0000;
    transition: .8s;
  }

  .btn-remove-advisor:disabled {
    background: #555;
  }

  .event {
    background-color: #1D5EA8;
    width: 100%;
    height: 70px;
    padding: 5px;
    margin-bottom: 10px;
  }

  @media (max-width: 767.98px) {
    label {
      margin-top: 15px;
    }

    .down {
      margin-top: 0px;
    }

    .btn-card-blue {
      margin-top: 15px;
    }

    .btn-remove {
      margin-top: 10px;
      margin-left: 1px;
    }
  }
`

export const ViewEvents = styled.div`
  width: 100%;
  height: 223px;
  padding: 5px;
  background-color: #FFF;
  margin-top: -10px;
  overflow-y: scroll;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`

export const CardEvent = styled.div`
  width: 100%;
  background-color: #E9EDF5;
  height: auto;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  .event-name-tag {
    font-size: 14pt;
    color: #1D5EA8;
    font-weight: bold;
  }

  .event-description-tag {
    font-size: 10pt;
  }

  .event-datetime {
    font-size: 10pt;
    font-weight: bold;
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

  .close {
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
    margin-top: -25px;
    margin-left: 290px;
  }

  .view {
    height: 100%;
    border: none;
  }

  .inside-area {
    padding: 5px;
  }

  .view-members {
    height: 337px;
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

  .to-up {
    margin-top: -70px;
  }

  .input-area {
    width: 100%;
    padding: 20px;
    margin-left: 0px;
  }

  input[type=checkbox]{
    margin-left: 17px;
  }

  label.label-checkbox {
    margin-top: -4px;
  }

  .right {
    width: 95%;
    margin-top: 75px;
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

  .tutor {
    color: #1D5EA8;
    font-size: 20pt;
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .card-selected-member {
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
      margin-right: 15px;
      border-radius: 30px;

      -webkit-border-radius: 30px;
      -moz-border-radius: 30px;
      -ms-border-radius: 30px;
      -o-border-radius: 30px;
    }

    h1 {
      font-size: 15pt;
    }

    h2 {
      font-size: 12pt;
      color: #888;
    }
  }

  .label-member-area {
    margin-top: 30px;
  }

  .space-left {
    margin-left: 30px;
    margin-top: 15px;
  }

  .mbottom {
    margin-bottom: 85px;
  }

  @media (min-width: 319px) and (max-width: 359.98px) {
    width: 290px;
    margin-top: 100px;
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

export const BTNCircle = styled.button`
  border-radius: 25px;
  color: #FFF;
  background: ${props => props.color};
  border: none;
  width: 35px;
  height: 35px;
  font-size: 17pt;
  float: right;
  margin-left: 5px;
  margin-top: -36px;

  :hover {
    transition: .8s;
    background: ${props => props.hoverColor};
  }
`
