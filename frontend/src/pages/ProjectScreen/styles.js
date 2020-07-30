import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .area-loader {
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
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

  header {
    background: #E5E5E5;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #1D5EA8;
    }

    h2 {
      font-size: 17pt;
      font-weight: none;
      color: #555;
    }

    .btn-manage {
      float: right;
      background: #1D5EA8;
      padding: 5px 10px;
      border: none;
      color: #FFF;
      margin-top: -30px;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    .btn-manage:disabled {
      background: #E5E5E5;
    }

    .btn-manage:hover {
      box-shadow: 0px 0px 7px #888;
    }
  }

  .icon {
    width: 17px;
    margin-right: 10px;
    margin-bottom: 5px;
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

  .username {
    color: #FFF;
    font-size: 14pt;
  }

  a {
    font-weight: bold;
    color: #1D5EA8;
    cursor: pointer;
  }

  a:hover {
    color: #2B8DFC;
    text-decoration: none;
  }

  .title {
    color: #FFF;
    font-size: 12pt;
    margin-bottom: -5px;
  }

  h2 {
    font-size: 17pt;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 5px;
  }

  .box-members {
    height: auto;
    border-radius: 5px;
    background-color: #E5E5E5;
    padding: 10px 5px 20px 15px;
    margin-top: 20px;
  }

  .box-height-fixed {
    height: 300px;
    border-radius: 5px;
    background-color: #E5E5E5;
    padding: 5px;
    margin-top: 30px;

    .title-box {
      color: #1D5EA8;
      font-weight: bold;
      font-size: 15pt;
      text-align: center;
      padding: 5px 5px 15px 5px;
    }

    .card {
      width: 100%;
      background-color: #E9EDF5;
      padding: 5px;
      margin-bottom: 5px;
      border: none;
      outline: none;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;

      .areas-name {
        font-size: 12pt;
        color: #555;
        margin-bottom: 1px;
      }
    }
  }

  .member-icon {
    width: 44px;
    margin-right: 10px;
    margin-top: 10px;
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
`

export const ViewEvents = styled.div`
  width: 100%;
  height: 83%;
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

  :hover {
    box-shadow: 0px 0px 5px #888;
  }
`

export const CardArchive = styled.div`
  background: #E9EDF5;
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
    color: #1D5EA8;
  }

  img {
    float: right;
    width: 20px;
    margin-top: -27px;
    margin-right: 10px;
  }

  :hover {
    background: #DFE3EB;
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
    width: 100px;
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
    padding: 30px;
  }

  h1 {
    font-size: 20pt;
    font-weight: bold;
    color: #1D5EA8;
    width: 100%;
    margin-left: 10px;
  }

  h2 {
    font-size: 14pt;
    color: #1D5EA8;
    width: 100%;
    margin-left: 10px;
    margin-bottom: 30px;
  }

  textarea {
    width: 550px;
    height: 120px;
    border: none;
    outline: none;
    min-height: 120px;
    max-height: 120px;
    overflow-y: scroll;
  }

  .right {
    width: 95%;
    margin-top: 15px;
    margin-left: 13px;
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

    button {
      display: none;
    }

    textarea {
      width: 230px;
    }
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    width: 330px;

    button {
      display: none;
    }

    textarea {
      width: 270px;
    }
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    width: 306px;

    button {
      display: none;
    }

    textarea {
      width: 245px;
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    width: 345px;

    button {
      display: none;
    }

    textarea {
      width: 280px;
      background: red;
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
