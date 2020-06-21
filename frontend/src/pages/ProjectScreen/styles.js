import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;
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

  .title-project {
    margin-bottom: 40px;
  }

  .btn-manage {
    float: right;
    background: #1D5EA8;
    padding: 5px 10px;
    border: none;
    color: #FFF;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .btn-manage:disabled {
    background: #E5E5E5;
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

  .username {
    color: #FFF;
    font-size: 14pt;
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
    padding: 10px;
    margin-top: 20px;
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
