import styled from 'styled-components';

export const Screen = styled.div`

`

export const Title = styled.h1`
  color: #FFF;
  font-size: 30pt;
  text-align: left;
  padding-top: 20px;
  padding-bottom: 10px;
`

export const Content = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  box-shadow: 1px 1px 5px #888888;
  height: 100%;
  padding: 50px;

  p {
    color: #FFF;
  }

  label {
    color: #FFF;
    padding-top: 20px;
  }

  h4 {
    color: #FFF;
    margin-top: 20px;
  }

  .row {
    padding-bottom: 10px;

    input, textarea {
      border-radius: 8px;
    }

    #selectedMembers {
      background: none;
      border: 2px solid #e5e5e5;
      color: #FFF;
    }
  }

  .center {
    text-align: center;
    margin-top: 40px;

    button {
      width: 150px;
      background: #1D5EA8;
      color: #FFF;
      border-radius: 10px;
      border: 2px solid #1D5EA8;
      float: right;
    }

    button:hover {
      transition: 0.8s;
      border: 2px solid #CECECE;
    }
  }

  @media (min-width: 319px) and (max-width: 374.98px) {
    padding: 30px;
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

  h3 {
    color: #1D5EA8;
    font-size: 17pt;
    padding-top: 10px;
    padding-bottom: 12px;
  }

  @media only screen and (max-width: 500px) {
    border-radius: 10px;

    h3 {
      font-size: 14pt;
    }
  }

  @media only screen and (max-width: 768px) {
    border-radius: 10px;

    h3 {
      font-size: 14pt;
    }
  }

  @media only screen and (max-width: 834px) {
    h3 {
      font-size: 13pt;
    }
  }

  @media only screen and (max-width: 1366px) {
    h3 {
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

  ul {
    list-style: none;
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

  h3 {
    color: #1D5EA8;
    font-size: 17pt;
    padding-top: 10px;
  }

  @media only screen and (max-width: 500px) {
    border-radius: 10px;

    h3 {
      font-size: 14pt;
    }
  }

  @media only screen and (max-width: 768px) {
    border-radius: 10px;

    h3 {
      font-size: 14pt;
    }
  }

  @media only screen and (max-width: 834px) {
    h3 {
      font-size: 13pt;
    }
  }

  @media only screen and (max-width: 1366px) {
    h3 {
      font-size: 16pt;
    }
  }
`

export const ViewResults = styled.div`
  background: #FFF;
  padding: 5px;
  margin-top: 20px;
  height: 360px;
  overflow-y: scroll;

  ul {
    list-style: none;
  }
`

export const Search = styled.form`
  background: #FFF;
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;

  #user-search {
    width: 89%;
    background: #FFF;
    border: none;
    border-radius: 5px;
  }

  #btn-user-search {
    border-radius: none;
    border: none;
    outline: none;

    img {
      width: 20px;
    }
  }

  #btn-search:active {
    background: #2B8DFC;
  }

  #btn-search:hover {
    background: #2B8DFC;
  }

  @media only screen and (max-width: 1366px) {
    #user-search {
      width: 87%;
      background: #E5E5E5;
      border: none;
      border-radius: 5px;
    }
  }

  @media only screen and (max-width: 834px) {
    #user-search {
      width: 80%;
      background: #E5E5E5;
      border: none;
      border-radius: 5px;
    }
  }
`

export const Card = styled.button`
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

  span {
    font-size: 10pt;
  }

  :focus {
    background-color: #E9EDF5;
    border: none;
    outline: none;
  }

  :hover {
    background-color: #E9EDF5;
  }

  @media only screen and (max-width: 767.98px) {
    span {
      font-size: 9pt;
    }
  }
`

export const Addressee = styled.button`
  background-color: transparent;
  color: #FFF;
  margin: 2.5px;
  width: 50px;
  height: 50px;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 25px;

  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  -ms-border-radius: 25px;
  -o-border-radius: 25px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 2px solid #FFF;
  }

  /* :hover {
    img {
      border: 2px solid #CC0000;
      transition: .5s;
    }
  } */

  :hover {
    cursor: default;
  }
`

export const ListAddressee = styled.div`
  min-height: 70px;
  max-height: 150px;
  width: 1070px;
  overflow-y: scroll;
  border: 2px solid #E5E5E5;
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  padding: 10px;

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
