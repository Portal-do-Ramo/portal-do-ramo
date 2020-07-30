import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
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

  .left-box-gray {
    padding: 5px;

    h2 {
      color: #1D5EA8;
      font-size: 17pt;
      padding-top: 9px;
      padding-bottom: 12px;
      text-align: center;
      font-weight: bold;
    }

    @media only screen and (max-width: 768px) {
      h2 {
        font-size: 15pt;
      }
    }

    @media only screen and (max-width: 834px) {
      h2 {
        font-size: 13pt;
      }
    }

    @media only screen and (max-width: 1366px) {
      h2 {
        font-size: 16pt;
      }
    }
  }

  .right-box-blue-gradient {
    h2 {
      color: #FFF;
      font-size: 20pt;
      font-weight: bold;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 12px;
      margin-top: 15px;
    }

    textarea {
      height: 150px;
      min-height: 150px;
      max-height: 150px;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    p {
      font-size: 12pt;
      color: #E5E5E5;
      padding-top: 30px;
      text-align: center;
    }

    .btn-card-blue {
      background: rgba(255, 255, 255, .1);
      width: 100%;
      height: 120px;
      padding: 10px 20px;
      border: none;
      text-align: left;
      margin-top: 5px;
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

    .center {
      display: flex;
      justify-content: center;
    }

    .btn-send {
      margin-top: 10px;
      padding: 7px;
    }

    .btn-send:hover {
      box-shadow: 0px 0px 7px #AAA;
    }

    @media only screen and (max-width: 600px) {
      h2 {
        font-size: 15pt;
      }
    }

    @media only screen and (max-width: 834px) {
      h2 {
        font-size: 13pt;
      }
    }

    @media only screen and (max-width: 1366px) {
      h2 {
        font-size: 16pt;
      }
    }
  }

  @media only screen and (max-width: 767.98px) {
    padding: 5px;
    padding-bottom: 50px;

    .right-box-blue-gradient {
      height: auto;

      .btn-send {
        margin-bottom: 20px;
      }

      .btn-card-blue {
        .title-name {
          font-size: 15pt;
        }

        .hierarchy {
          font-size: 13pt;
        }

        label {
          display: none;
        }
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    .right-box-blue-gradient {
      .btn-card-blue {
        label {
          display: none;
        }
      }
    }
  }
`

export const ViewMembers = styled.div`
  background: #FFF;
  padding: 5px;
  margin-top: 10px;
  height: 81%;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  ul {
    list-style: none;
  }
`

export const Card = styled.button`
  background-color: #F5F5F5;
  width: 100%;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 5px;
  color: #1D5EA8;
  border: none;

  .user-info {
    width: 470px;
  }

  img {
    width: 50px;
    float: left;
    border-radius: 30px;
  }

  @media (min-width: 319px) and (max-width: 359.98px) {
    .user-info {
      width: 210px;
    }
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    .user-info {
      width: 250px;
    }
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    .user-info {
      width: 260px;
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    .user-info {
      width: 300px;
    }
  }

  @media (min-width: 767px) and (max-width: 1023.98px) {
    .user-info {
      width: 300px;
    }
  }

  @media (min-width: 1024px) and (max-width: 1155px) {
    .user-info {
      width: 410px;
    }
  }
`
