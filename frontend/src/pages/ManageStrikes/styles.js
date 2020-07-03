import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }

  .center {
    text-align: center;
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

export const HeaderBox = styled.div`
  background: #CECECE;
  border-radius: 5px;
  padding: 20px;
  margin-top: 40px;
  margin-bottom: 30px;
  height: 300px;
  box-shadow: 0px 0px 7px #888;
  text-align: center;

  section {
    background: #FFF;
    padding: 5px;
    margin-top: 10px;
    overflow-y: scroll;
    border-radius: 5px;

    ul {
      list-style: none;
    }
  }

  .left {
    height: 235px;
  }

  .right {
    height: 190px;
  }

  .center {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  h5 {
    padding-top: 20px;
    font-size: 12pt;
  }
`

export const LeftBox = styled.div`
  background: #CECECE;
  padding: 20px;
  margin-top: 50px;
  height: 550px;
  box-shadow: 0px 0px 7px #888;
  text-align: center;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;

  .btn-add {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    height: 34px;
    width: 34px;
    margin-left: 10px;
    margin-top: -28px;
    font-size: 25px;
    color: #FFF;
    border-radius: 5px;
    border: none;
    display: flex;
    justify-content: center;

    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    img {
      width: 17px;
      margin-top: 7px;
    }
  }
`

export const RightBox = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  padding: 5px;
  margin-top: 50px;
  height: 550px;
  box-shadow: 0px 0px 7px #888;
  display: flex;
  justify-content: center;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;

  .center {
    text-align: center;
  }

  img {
    width: 100px;
    border-radius: 60px;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  h1, h2, h3 {
    color: #FFF;
  }

  h1 {
    margin-top: -15px;
    font-size: 18pt;
  }

  #noSelected {
    margin-top: 30px;
  }

  h3 {
    font-size: 12pt;
    margin-bottom: 30px;
  }

  .qty {
    h2 {
      margin-bottom: 40px;
    }

    span {
      padding: 30px 40px;
      background: #E5E5E5;
      border-radius: 50%;
      font-size: 20pt;
    }

    margin-bottom: 50px;
  }

  .showStrikes {
    width: 420px;
    height: 120px;
    overflow-y: hidden;
    margin-bottom: 5px;
  }

  ul {
    list-style: none;
  }

  a {
    color: #FFF;
  }

  a:hover {
    text-decoration: none;
    color: #CECECE;
    transition: 0.8s;
  }

  @media only screen and (max-width: 767.98px) {
    height: 430px;

    .showStrikes {
      display: none;
    }
  }

  @media (min-width: 768px) and (max-width: 1023.98px) {
    .showStrikes {
      display: none;
    }
  }
`

export const ViewResults = styled.div`
  background: #FFF;
  padding: 5px;
  margin-top: 30px;
  height: 425px;
  overflow-y: scroll;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;

  ul {
    list-style: none;
  }

  @media only screen and (max-width: 1024px) {
    height: 425px;
  }
`

export const TitleBox = styled.h1`
  border-radius: 5px;
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  padding: 5px 15px 5px 15px;
  margin-left: 50px;
  margin-top: -28px;
  font-size: 20px;
  color: #FFF;
  box-shadow: 0px 0px 7px #888;
`

export const CardButton = styled.button`
  background-color: #F5F5F5;
  width: 100%;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 5px;
  color: #1D5EA8;
  border: none;

  img {
    width: 50px;
    float: left;
    border-radius: 30px;
    margin-top: -2px;
  }
`

export const DefaultCard = styled.div`
  background-color: #E5E5E5;
  border-radius: 5px;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 5px;
  color: #1D5EA8;
  border: none;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;

  button {
    background: #1D5EA8;
    margin-top: 20px;
    padding: 5px 10px;
    width: 100px;
    outline: none;
    border: none;
    margin-right: 10px;
    color: #FFF;
    border-radius: 5px;

    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
  }

  button:hover {
    background: #2B8DFC;
    transition: .8s;
  }

  header {
    display: flex;
    justify-content: center;
  }

  .datetime {
    margin-top: 15px;

    input {
      border-radius: 50px;
      padding: 4px 10px;
      border: none;
      margin-right: 5px;
    }
  }

  @media only screen and (max-width: 767.98px) {
    padding: 10px 5px;

    .user-info {
      text-align: center;
    }

    .datetime input {
      margin-top: 10px;
    }
  }
`

export const AudienceCard = styled.div`
  background-color: #E5E5E5;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 5px;
  color: #1D5EA8;
  border: none;
  text-align: left;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;

  a {
    color: #1D5EA8;
  }

  a:hover {
    text-decoration: none;
    color: #2B8DFC;
  }

  button {
    background: #1D5EA8;
    margin-top: 20px;
    padding: 5px 10px;
    width: 100px;
    outline: none;
    border: none;
    margin-right: 10px;
    color: #FFF;
    border-radius: 5px;

    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
  }

  button:hover {
    background: #2B8DFC;
    transition: .8s;
  }

  .center {
    text-align: center;
  }
`

export const Tag = styled.span`
  background: #CECECE;
  color: #1D5EA8;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 50px;

  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  -o-border-radius: 50px;
  -ms-border-radius: 50px;
  font-weight: bold;

  a {
    text-decoration: none;
    color: #1D5EA8;
  }

  a:hover {
    border-radius: 50px;
    padding: 5px 5px;
    transition: .8s;
  }

  @media only screen and (max-width: 767.98px) {
    font-size: 10pt;
  }
`

export const Reason = styled.textarea`
  color: #1D5EA8;
  width: 93%;
  min-height: 100px;
  max-height: auto;
  padding: 5px 10px;
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: -5px;
  border-radius: 5px;
  overflow-y: scroll;
  border: none;

  @media only screen and (max-width: 767.98px) {
    width: 90%;
  }
`

export const Strike = styled.li`
  background-color: transparent;
  border: 1px solid #FFF;
  color: #FFF;
  padding: 5px 10px;
  margin-left: 5px;
  border-radius: 50px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  margin-bottom: 5px;
  text-align: left;
`

export const BTNTAB = styled.button`
  background: ${props => props.bgColor};
  margin-top: 10px;
  padding: 5px 20px;
  width: 120px;
  outline: none;
  border: none;
  margin-right: 10px;
  color: ${props => props.color};
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  :hover {
    background: ${props => props.bgColorHover}
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    padding: 7px 20px;
  }
`

export const FullscreenStrike = styled.div`
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

  .btn-close {
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

  .inside-area {
    width: 100%;
    height: 250px;

    h1 {
      font-size: 14pt;
      margin-top: 10px;
      margin-left: 30px;
    }

    h2 {
      font-size: 12pt;
      margin-left: 30px;
      margin-top: 10px;
    }

    textarea {
      width: 90%;
      height: 120px;
      border: none;
      outline: none;
      min-height: 120px;
      max-height: 120px;
      margin-left: 30px;
      margin-top: 15px;
      margin-bottom: 15px;
      overflow-y: scroll;
    }

    .buttons-area {
      width: 100%;
      height: 80px;
      margin-top: -20px;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        width: 120px;
        padding: 6px;
        background: #1D5EA8;
        margin-left: 5px;
        margin-right: 5px;
        border: none;
        color: #FFF;
        border-radius: 5px;

        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
      }

      button:hover {
        box-shadow: 0px 0px 7px #888;
      }
    }

    @media (max-width: 767.98px) {
      margin-top: 100px;
    }
  }

  span {
    font-size: 11pt;
    font-weight: bold;
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

export const Fullscreen = styled.div`
  background: rgba(0,0,0,0.5);
`

export const FullscreenAudience = styled.div`
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

  .btn-close {
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

  .inside-area {
    width: 100%;
    height: 250px;

    h1 {
      font-size: 14pt;
      margin-top: 10px;
      margin-left: 30px;
    }

    h2 {
      font-size: 12pt;
      margin-left: 30px;
      margin-top: 10px;
    }

    textarea {
      width: 90%;
      height: 120px;
      border: none;
      outline: none;
      min-height: 120px;
      max-height: 120px;
      margin-left: 30px;
      margin-top: 15px;
      margin-bottom: 15px;
      overflow-y: scroll;
    }

    .padding-inside {
      padding: 10px;
      margin-top: 15px;
    }

    .save-area {
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        margin-right: 20px;
      }
    }

    .buttons-area {
      width: 100%;
      height: 80px;
      margin-top: -20px;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        width: 120px;
        padding: 6px;
        background: #1D5EA8;
        margin-left: 5px;
        margin-right: 5px;
        border: none;
        color: #FFF;
        border-radius: 5px;

        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
      }

      button:hover {
        box-shadow: 0px 0px 7px #888;
      }
    }

    @media (max-width: 767.98px) {
      .buttons-area {
        border: 1px solid red;
      }
    }
  }

  span {
    font-size: 11pt;
    font-weight: bold;
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
