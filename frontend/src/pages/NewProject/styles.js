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

  label {
    font-weight: bold;
    margin-left: 10px;
    margin-top: 20px;
  }

  .btn-card-blue {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    width: 100%;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    label {
      color: #E5E5E5;
      font-weight: normal;
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
    box-shadow: 0px 0px 7px #888888;
  }

  h2 {
    font-size: 17pt;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 5px;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      margin-top: 10px;
    }
  }

  .viewMembers {
    background: #FFF;
    padding: 5px;
    margin-top: 25px;
    height: 425px;
    overflow-y: scroll;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    ul {
      list-style: none;
    }
  }

  .outside-area {
    padding: 10px;
    margin-top: -10px;
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

  .btn-card-blue {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    width: 100%;
    padding: 10px 20px;
    border: none;
    text-align: left;
    margin-top: 25px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    label {
      color: #E5E5E5;
      font-weight: normal;
      margin-left: 0px;
      margin-top: -10px;
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

  @media (min-width: 360px) and (max-width: 767.98px) {
    .btn-card-blue label {
      display: none;
    }

    .btn-card-blue .leader-image {
      width: 70px;
      margin-top: -2px;
    }

    h2 {
      margin-top: 20px;
    }
  }
`

export const Card = styled.button`
  background-color: #F5F5F5;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 5px;
  color: #1D5EA8;
  border: none;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  img {
    width: 50px;
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

export const CardInputArea = styled.div`
  background: #E5E5E5;
  padding: 12px;
  border-radius: 10px;
  margin-top: 10px;
  width: 100%;

  label {
    margin-top: -10px;
  }
`
