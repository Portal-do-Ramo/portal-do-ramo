import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  @media only screen and (max-width: 768px) {
    padding: 20px;
  }
`

export const BoxLeft = styled.div`
  background: #E5E5E5;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 5px 10px 5px 10px;
  margin-top: 50px;
  height: 530px;
  text-align: center;
  box-shadow: 0px 0px 7px #888;

  h2 {
    color: #1D5EA8;
    font-size: 20pt;
    padding-top: 10px;
    padding-bottom: 12px;
  }

  @media only screen and (max-width: 768px) {
    border-radius: 10px;

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
`

export const BoxRight = styled.div`
  background: #CECECE;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 5px 10px 5px 10px;
  margin-top: 50px;
  height: 530px;
  text-align: center;
  box-shadow: 0px 0px 7px #888;

  h2 {
    color: #1D5EA8;
    font-size: 20pt;
    padding-top: 10px;
    padding-bottom: 12px;
    margin-top: 15px;
  }

  textarea {
    height: 150px;
    min-height: 150px;
    max-height: 180px;
  }

  p {
    font-size: 12pt;
    color: #1D5EA8;
    padding-top: 30px;
  }

  .btn-card-blue {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
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
    }
  }

  @media only screen and (max-width: 600px) {
    border-radius: 10px;
    padding: 10px;

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
`

export const ViewMembers = styled.div`
  background: #FFF;
  padding: 5px;
  margin-top: 20px;
  height: 360px;
  overflow-y: scroll;
  width: 100%;

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
