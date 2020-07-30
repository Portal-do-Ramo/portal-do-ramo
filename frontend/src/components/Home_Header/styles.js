import styled from 'styled-components';
import logo from './logo.png';

export const HeaderBox = styled.header`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  box-shadow: 0px 0px 7px #888888;
  padding: 20px;

  @media only screen and (max-width: 500px) {
    padding: 10px;
    box-shadow: none;
  }
`

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 120px;
    border-radius: 60px;
  }

  @media only screen and (max-width: 500px) {
    img {
      width: 70px;
    }
  }
`

export const Info = styled.div`
  h2 {
    color: #FFF;
  }

  h3 {
    color: #FFF;
  }

  @media only screen and (max-width: 500px) {
    h2 {
      font-size: 20px;
      text-align: center;
    }

    h3 {
      font-size: 15px;
      text-align: center;
    }
  }

  width: 100vh;
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    justify-content: center;
    margin-top: 10px;
  }
`

export const HeaderMenu = styled.div`
  background-color: #E9EDF5;
  border-radius: 5px;
  box-shadow: 0px 0px 7px #AAA;
  padding: 5px;

  #logo {
    background: url(${logo}) no-repeat;
	  background-size: contain;
	  width: 160px;
	  height: 35px;
	  display: block;
    color: transparent;
    justify-content: left;
  }

  .title {
    text-align: right;

    h1 {
      font-size: 25px;
      margin-top: 10px;
    }
  }

  .btn-edit {
    float: right;
    margin-top: 8px;
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    border: none;
    outline: none;
    color: white;
  }

  @media only screen and (max-width: 500px) {
    border-radius: 0px;

    .title {
      margin-top: -110px;
      visibility: hidden;
    }

    .btn-edit {
      visibility: hidden;
    }
  }
`
