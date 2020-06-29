import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .area-loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .center {
    display: flex;
    justify-content: center;

    img {
      margin-top: 20px;
      width: 160px;
    }
  }

  .left-box-gray {
    h1 {
      font-size: 22pt;
      color: #1D5EA8;
      text-align: center;
      font-weight: bold;
      margin-top: 30px;
    }

    h2 {
      font-size: 17pt;
      color: #1D5EA8;
      text-align: center;
      font-weight: bold;
      margin-top: 10px;
    }

    h3 {
      font-size: 13pt;
      color: #666;
      text-align: center;
      font-weight: bold;
      margin-top: 10px;
    }

    .member-icon {
      width: 44px;
      border: 2px solid #FFF;
      margin-right: 5px;
      border-radius: 22px;

      -webkit-border-radius: 22px;
      -moz-border-radius: 22px;
      -ms-border-radius: 22px;
      -o-border-radius: 22px;
    }

    .member-icon:hover {
      box-shadow: 0px 0px 7px #888;
    }
  }

  .right-box-blue-gradient {
    padding: 5px;

    .events-area, .archives-area {
      width: 100%;
      height: 267px;
      margin-bottom: 5px;
      background: rgba(255, 255, 255, .1);
      padding: 10px;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;

      .title-area {
        font-size: 15pt;
        font-weight: bold;
        color: #FFF;
        margin-left: 10px;
      }

      .view-events, .view-archives {
        height: 215px;
        overflow-y: scroll;
        background: #CECECE;
        padding: 5px;
        border-radius: 5px;

        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
      }
    }
  }
`

export const CardEvent = styled.div`
  width: 100%;
  background-color: #E9EDF5;
  height: auto;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 7px 12px;
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
    background: #DFE3EB;
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
